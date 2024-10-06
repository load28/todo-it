import { NextRequest, NextResponse } from 'next/server';
import { dbDocument } from '@/app/@core/db/dynamoDB';

export interface Todo {
  id: string;
  description: string;
  date: string;
  isComplete: boolean;
}

const TODOS: Todo[] = [
  {
    id: '1',
    description:
      'Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1zzzz',
    date: '2024-07-07',
    isComplete: true,
  },
  {
    id: '2',
    description: 'Description 2',
    date: '2024-07-07',
    isComplete: false,
  },
  {
    id: '3',
    description: 'Description 3',
    date: '2024-07-07',
    isComplete: false,
  },
  {
    id: '4',
    description: 'Description 4',
    date: '2024-07-07',
    isComplete: false,
  },
  {
    id: '5',
    description: 'Description 4',
    date: '2024-07-13',
    isComplete: false,
  },
];

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  const result = await dbDocument.query({
    TableName: 'todo',
    KeyConditionExpression: 'sk = :sk',
    ExpressionAttributeValues: {
      ':sk': `USER#${userId}`,
    },
  });
  
  return NextResponse.json(result.Items);
}
