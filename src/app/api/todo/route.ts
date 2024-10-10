import { NextRequest, NextResponse } from 'next/server';
import { dbDocument } from '@/app/@core/db/dynamoDB';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { z } from 'zod';
import { BatchWriteItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { v4 } from 'uuid';

export const TodoSchema = z.object({
  id: z.string(), // todo pk가 아닌 id로 변경
  date: z.string().date(), // todo sk가 아닌 date로 변경
  description: z.string().max(300),
  isComplete: z.boolean(),
});
export type Todo = z.infer<typeof TodoSchema>;

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId) {
    // todo invalidation error 정의
    return NextResponse.json({ error: 'Not found user id' }, { status: 400 });
  }

  const { Items } = await dbDocument.send(
    new QueryCommand({
      TableName: 'todo',
      IndexName: 'pk-index',
      KeyConditionExpression: 'pk = :pkValue',
      ExpressionAttributeValues: {
        ':pkValue': `USER#${userId}`,
      },
    }),
  );

  // TODO 함수를 안정하게 정의해야함
  const responseData: Todo[] =
    Items?.map((item) => {
      return {
        id: item.id,
        date: item.sk.split('#')[1],
        description: item.description,
        isComplete: item.isComplete,
      };
    }) || [];

  return NextResponse.json(responseData);
}

const TodoPostParamsSchema = z.object({ userId: z.string(), date: z.string().date(), data: z.array(TodoSchema.omit({ id: true, date: true })) });
export type TodoPostParams = z.infer<typeof TodoPostParamsSchema>;

export async function POST(req: Request) {
  try {
    const requestBody = await req.json();
    const { error, data } = TodoPostParamsSchema.safeParse(requestBody);
    if (error) {
      // todo invalidation error 정의
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // TODO 타입을 추론하는게 명확지 않음 -> 하나의 함수를 통해 핸들링하여 타입을 명확히 알수있도록 변경필요
    await dbDocument.send(
      new BatchWriteItemCommand({
        RequestItems: {
          todo: data.data.map((todo) => ({
            PutRequest: {
              Item: marshall({ pk: `USER#${data.userId}`, sk: `DATE#${data.date}`, id: v4(), ...todo }),
            },
          })),
        },
      }),
    );
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
