import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { dbDocument } from '@/core/db/dynamoDB';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { v4 } from 'uuid';
import { TransactWriteItemsCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { utcDayjs } from '@/core/utils/date';

export const todoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
export const todoDateFormatter = (date: Date) => utcDayjs(date).format('YYYY-MM-DD');
const TodoDateStringSchema = z.string().regex(todoDateRegex, {
  message: "Invalid date format. Expected 'YYYY-MM-DD'.",
});
export type DateString = z.infer<typeof TodoDateStringSchema>;
// TODO 백엔드와 클라이언트간의 인터페이스 분리가 필요함
export const TodoSchema = z.object({
  id: z.string(),
  date: TodoDateStringSchema,
  description: z.string().max(300),
  isComplete: z.boolean(),
  createdAt: z.number(),
});
export type Todo = z.infer<typeof TodoSchema>;
export const TodoPostParamsSchema = z.object({
  mode: z.literal('create'),
  userId: z.string(),
  date: TodoDateStringSchema,
  data: z.array(TodoSchema.omit({ id: true, date: true })),
});
// TODO 기존 데이터에 추가하는 케이스도 처리 할 수 있어야 함
export const TodoUpdateParamsSchema = z.object({
  mode: z.literal('update'),
  userId: z.string(),
  date: TodoDateStringSchema,
  data: z.array(TodoSchema.omit({ date: true })),
});
export type TodoPostParams = z.infer<typeof TodoPostParamsSchema | typeof TodoUpdateParamsSchema>;

export async function getTodos(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId) {
    // todo invalidation error 정의
    return NextResponse.json({ error: 'Not found user id' }, { status: 400 });
  }

  const { Items } = await dbDocument.send(
    new QueryCommand({
      TableName: 'todo',
      IndexName: 'userId-index',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    }),
  );

  // TODO 함수를 안정하게 정의해야함
  const responseData: Todo[] =
    Items?.map((item) => {
      return {
        id: item.id,
        date: item.date,
        description: item.description,
        isComplete: item.isComplete,
        createdAt: item.createdAt,
      };
    }) || [];

  return NextResponse.json(responseData);
}

export async function saveTodos(req: Request) {
  try {
    const requestBody = await req.json();
    const postParseData = TodoPostParamsSchema.safeParse(requestBody);
    const updateParseData = TodoUpdateParamsSchema.safeParse(requestBody);

    if (!(postParseData.error || updateParseData.error)) {
      // todo invalidation error 정의
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    if (postParseData.success) {
      const { userId, date, data } = postParseData.data;
      const dataset: Todo[] = data.map((todo) => ({ id: v4(), date, ...todo }));
      const transactItems = dataset.map((todo) => ({
        Put: {
          TableName: 'todo',
          Item: marshall({ ...todo, userId }),
        },
      }));

      await dbDocument.send(new TransactWriteItemsCommand({ TransactItems: transactItems }));
      return NextResponse.json(dataset) satisfies NextResponse<Todo[]>;
    }

    if (updateParseData.success) {
      const { date, data } = updateParseData.data;
      const transactItems = data.map((todo) => ({
        Update: {
          TableName: 'todo',
          Key: marshall({ id: todo.id, date }),
          UpdateExpression: 'set #description = :description, #isComplete = :isComplete',
          ExpressionAttributeNames: {
            '#description': 'description',
            '#isComplete': 'isComplete',
          },
          ExpressionAttributeValues: marshall({
            ':description': todo.description,
            ':isComplete': todo.isComplete,
          }),
        },
      }));

      await dbDocument.send(new TransactWriteItemsCommand({ TransactItems: transactItems }));
      return NextResponse.json(data.map((todo) => ({ ...todo, date }))) satisfies NextResponse<Todo[]>;
    }
  } catch (error: unknown) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
