import { utcDayjs } from '@/core/utils/date';

export interface Todo {
  id: string;
  description: string;
  date: string;
  isComplete: boolean;
}

export const TODOS: Todo[] = [
  {
    id: '1',
    description:
      'Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1zzzz',
    date: utcDayjs('2022-01-01').utc().format('YYYY-MM-DD'),
    isComplete: true,
  },
  {
    id: '2',
    description: 'Description 2',
    date: utcDayjs('2022-01-01').utc().format('YYYY-MM-DD'),
    isComplete: false,
  },
  {
    id: '3',
    description: 'Description 3',
    date: utcDayjs('2022-01-01').utc().format('YYYY-MM-DD'),
    isComplete: false,
  },
  {
    id: '4',
    description: 'Description 4',
    date: utcDayjs('2022-01-01').utc().format('YYYY-MM-DD'),
    isComplete: false,
  },
  {
    id: '5',
    description: 'Description 4',
    date: utcDayjs('2024-07-12').utc().format('YYYY-MM-DD'),
    isComplete: false,
  },
];
export const getTodos = async () => {
  const todoMap = TODOS?.reduce<Record<string, Todo[]>>((acc, todo) => {
    return {
      ...acc,
      [todo.date]: [...(acc[todo.date] || []), todo],
    };
  }, {});
  return Promise.resolve(todoMap);
};
