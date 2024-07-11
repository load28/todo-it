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
    date: '2022-01-01',
    isComplete: true,
  },
  {
    id: '2',
    description: 'Description 2',
    date: '2022-01-01',
    isComplete: false,
  },
  {
    id: '3',
    description: 'Description 3',
    date: '2022-01-01',
    isComplete: false,
  },
  {
    id: '4',
    description: 'Description 4',
    date: '2022-01-01',
    isComplete: false,
  },
  {
    id: '5',
    description: 'Description 4',
    date: '2022-01-02',
    isComplete: false,
  },
];
export const getTodos = async () => {
  return Promise.resolve(TODOS);
};
