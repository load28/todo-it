import { NextRequest, NextResponse } from 'next/server';
import { dbDocument } from '@/app/@core/db/dynamoDB';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { z } from 'zod';
import { BatchWriteItemCommand } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { marshall } from '@aws-sdk/util-dynamodb';

export const TodoSchema = z.object({
  id: z.string().uuid(),
  description: z.string().max(300).trim(),
  date: z.string().date(),
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
      IndexName: 'sk-index',
      KeyConditionExpression: 'sk = :skValue',
      ExpressionAttributeValues: {
        ':skValue': `USER#${userId}`,
      },
    }),
  );
  return NextResponse.json(Items || []);
}

const TodoPostParamsSchema = z.object({ userId: z.string(), data: z.array(TodoSchema.omit({ id: true })) });
export type TodoPostParams = z.infer<typeof TodoPostParamsSchema>;

export async function POST(req: Request) {
  try {
    const requestBody = req.json();
    const { error, data } = TodoPostParamsSchema.safeParse(requestBody);
    if (error) {
      // todo invalidation error 정의
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    await dbDocument.send(
      new BatchWriteItemCommand({
        RequestItems: {
          todo: data.data.map((todo) => ({
            PutRequest: {
              Item: marshall({ pk: `TODO#${uuidv4()}`, sk: `USER#${data.userId}`, ...todo }),
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
