import { NextRequest, NextResponse } from 'next/server';
import { dbDocument } from '@/app/@core/db/dynamoDB';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { z } from 'zod';
import { BatchWriteItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { v4 } from 'uuid';

export const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const DateStringSchema = z.string().regex(dateRegex, {
  message: "Invalid date format. Expected 'YYYY-MM-DD'.",
});

export const TodoSchema = z.object({
  id: z.string(),
  date: DateStringSchema,
  description: z.string().max(300),
  isComplete: z.boolean(),
  createdAt: z.number(),
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

const TodoPostParamsSchema = z.object({ userId: z.string(), date: DateStringSchema, data: z.array(TodoSchema.omit({ id: true, date: true })) });
export type TodoPostParams = z.infer<typeof TodoPostParamsSchema>;

export async function POST(req: Request) {
  try {
    const requestBody = await req.json();
    const parsedData = TodoPostParamsSchema.safeParse(requestBody);
    if (parsedData.error) {
      // todo invalidation error 정의
      return NextResponse.json({ error: parsedData.error.message }, { status: 400 });
    }

    const { userId, date, data } = parsedData.data;
    const dataset: Todo[] = data.map((todo) => ({ id: v4(), date, ...todo }));
    await dbDocument.send(
      new BatchWriteItemCommand({
        RequestItems: {
          todo: dataset.map((row) => ({
            PutRequest: {
              Item: marshall({ ...row, userId }),
            },
          })),
        },
      }),
    );
    return NextResponse.json(dataset);
  } catch (error: unknown) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
