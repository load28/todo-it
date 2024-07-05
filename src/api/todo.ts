export interface Todo {
  id: string;
  description: string;
  date: string;
  isComplete: boolean;
  hashtag: string[];
}

export const TODOS: Todo[] = [
  {
    id: '1',
    description:
      'Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1zzzz',
    date: '2022-01-01',
    isComplete: true,
    hashtag: ['tag1', 'tag2'],
  },
  {
    id: '2',
    description: 'Description 2',
    date: '2022-01-01',
    isComplete: false,
    hashtag: ['tag1', 'tag2'],
  },
  {
    id: '3',
    description: 'Description 3',
    date: '2022-01-01',
    isComplete: false,
    hashtag: ['tag1', 'tag2'],
  },
  {
    id: '4',
    description: 'Description 4',
    date: '2022-01-01',
    isComplete: false,
    hashtag: ['tag1', 'tag2'],
  },
  {
    id: '5',
    description: 'Description 4',
    date: '2022-01-02',
    isComplete: false,
    hashtag: ['tag1', 'tag2'],
  },
];
export const getTodos = async () => {
  return Promise.resolve(TODOS);
};
