import { NextResponse } from 'next/server';

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

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return NextResponse.json(TODOS);
}
