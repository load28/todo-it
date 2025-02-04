import { QueryClient, queryOptions } from '@tanstack/react-query';
import { ApiResponseData, isErrorResponse } from '@todo-it/api/types';
import { Todo, TodoSaveParams } from '@todo-it/api/todo';

export const TODOS_QUERY_KEY = 'todos';
export type TodoMap = Record<string, Todo[] | undefined>;

export async function getTodoFetch(userId: string): Promise<ApiResponseData<Todo[]>> {
  const responseBody = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/todo?userId=${userId}`);
  return await responseBody.json();
}

export async function saveTodoFetch(todoSaveParams: TodoSaveParams): Promise<ApiResponseData<Todo[]>> {
  const responseBody = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/todo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todoSaveParams),
  });
  return await responseBody.json();
}

export const todoMapQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: [TODOS_QUERY_KEY],
    queryFn: async (): Promise<TodoMap> => {
      const responseData: ApiResponseData<Todo[]> = await getTodoFetch(userId);
      if (isErrorResponse(responseData)) {
        // TODO 서버 에러 발생시 useQuery 훅에서는 직접 핸들링을 해야함
        return {};
      }

      return todoToMap(responseData.data);
    },
  });

export const todoMapQueryPrefetch = async (queryClient: QueryClient, userId: string) =>
  await queryClient.prefetchQuery(todoMapQueryOptions(userId));

export const todoToMap = (todos: Todo[]): Record<string, Todo[] | undefined> => {
  return todos.reduce<Record<string, Todo[]>>((acc, todo) => {
    const date = todo.date;
    return {
      ...acc,
      [date]: [...(acc[date] || []), todo],
    };
  }, {});
};
