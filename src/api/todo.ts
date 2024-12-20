import { TransactWriteItemsCommand } from '@aws-sdk/client-dynamodb';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { NextRequest, NextResponse } from 'next/server';
import { v4 } from 'uuid';
import { z } from 'zod';
import { ApiResponse } from './types';
import { utcDayjs } from '@todo-it/core/utils/date';
import { dbDocument } from '@todo-it/core/db/dynamoDB';

export const todoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
export const todoDateFormatter = (date: Date) => utcDayjs(date).format('YYYY-MM-DD');
const TodoDateStringSchema = z.string().regex(todoDateRegex, {
  message: "Invalid date format. Expected 'YYYY-MM-DD'.",
});

export const TodoSchema = z.object({
  id: z.string(),
  date: TodoDateStringSchema,
  description: z.string().trim().max(300),
  isComplete: z.boolean(),
  createdAt: z.number(),
});
export type Todo = z.infer<typeof TodoSchema>;

export const TodoSaveParamsSchema = z.object({
  userId: z.string(),
  date: TodoDateStringSchema,
  data: z.object({
    create: z.array(TodoSchema.omit({ id: true, date: true })).optional(),
    update: z.array(TodoSchema.omit({ date: true })).optional(),
    delete: z.array(z.string()).optional(),
  }),
});
export type TodoSaveParams = z.infer<typeof TodoSaveParamsSchema>;

export async function getTodos(req: NextRequest): Promise<ApiResponse<Todo[]>> {
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId) {
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

  return NextResponse.json({ data: responseData });
}

export async function saveTodos(req: Request): Promise<ApiResponse<Todo[]>> {
  try {
    const requestBody = await req.json();
    const saveParseData = TodoSaveParamsSchema.safeParse(requestBody);

    if (saveParseData.error) {
      return NextResponse.json({ error: saveParseData.error.message }, { status: 400 });
    }

    const { userId, date, data } = saveParseData.data;
    const createData: Todo[] = data.create?.map((todo) => ({ ...todo, date, id: v4() })) || [];
    const createTransactItems = createData.map((todo) => ({
      Put: {
        TableName: 'todo',
        Item: marshall({ ...todo, userId }),
      },
    }));
    const updateData = data.update || [];
    const updateTransactItems = updateData.map((todo) => ({
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
    const deleteTransactItems =
      data.delete?.map((id) => ({
        Delete: {
          TableName: 'todo',
          Key: marshall({ id, date }),
        },
      })) || [];

    const transactItems = [...createTransactItems, ...updateTransactItems, ...deleteTransactItems];
    await dbDocument.send(new TransactWriteItemsCommand({ TransactItems: transactItems }));

    return NextResponse.json({ data: [...createData, ...updateData.map((todo) => ({ ...todo, date }))] });
  } catch (error: unknown) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
