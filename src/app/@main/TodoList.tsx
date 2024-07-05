'use client';

import { sortDate } from '@/utils/date';
import { Badge, Checkbox, Group, Stack, Text } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import classes from './TodoList.module.css';
import { getTodos, Todo } from '@/api/todo';
import { ChangeEvent } from 'react';

const TodoListByDate = ({ todos, date }: { todos: Todo[]; date: string }) => {
  const queryClient = useQueryClient();
  const todoMutation = useMutation({
    mutationKey: ['todos'],
    mutationFn: async (id: string) => {
      const allTodos = queryClient.getQueryData<Todo[]>(['todos']) || [];
      return allTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isComplete: !todo.isComplete,
          };
        }
        return todo;
      });
    },
    onSuccess: (todos) => {
      queryClient.setQueryData(['todos'], todos);
    },
  });

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    todoMutation.mutate(e.target.id);
  };

  return (
    <div>
      <Text size="md" fw={700} c="gray.8">
        {date}
      </Text>
      <Stack gap={32} pt={16} pb={16}>
        {todos.map((todo) => {
          return (
            <Group align={'flex-start'} gap={8}>
              <Checkbox
                key={todo.id}
                id={todo.id}
                checked={todo.isComplete}
                onChange={handler}
                color={'gray.5'}
                size={'xs'}
                pt={2}
              />
              <Stack gap={12}>
                <label className={classes.todoLabel} htmlFor={todo.id}>
                  <Text
                    size={'sm'}
                    fw={todo.isComplete ? 400 : 500}
                    c={todo.isComplete ? 'gray.5' : 'gray.8'}
                    td={todo.isComplete ? 'line-through' : undefined}
                    fs={todo.isComplete ? 'italic' : undefined}
                  >
                    {todo.description}
                  </Text>
                </label>
                <Group gap={8}>
                  {todo.hashtag.map((tag, index) => {
                    return (
                      <Badge
                        key={index}
                        size={'xs'}
                        color={'gray.5'}
                        variant={'outline'}
                      >
                        {tag}
                      </Badge>
                    );
                  })}
                </Group>
              </Stack>
            </Group>
          );
        })}
        {/*<Group gap={24}>*/}
        {/*<Group gap={4}>*/}
        {/*  <ActionIcon*/}
        {/*    size={24}*/}
        {/*    color={'green.6'}*/}
        {/*    variant={'filled'}*/}
        {/*    aria-label={'todoEdit'}*/}
        {/*  >*/}
        {/*    <IconEdit stroke={1.5} />*/}
        {/*  </ActionIcon>*/}
        {/*  <ActionIcon*/}
        {/*    size={24}*/}
        {/*    color={'red.6'}*/}
        {/*    variant={'filled'}*/}
        {/*    aria-label={'todoDelete'}*/}
        {/*  >*/}
        {/*    <IconTrash stroke={1.5} />*/}
        {/*  </ActionIcon>*/}
        {/*</Group>*/}
        {/*</Group>*/}
      </Stack>
    </div>
  );
};

export function TodoList() {
  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!todos) {
    return <></>;
  }

  const todoMap = todos.reduce<Record<string, Todo[]>>((acc, todo) => {
    return {
      ...acc,
      [todo.date]: [...(acc[todo.date] || []), todo],
    };
  }, {});
  const dates = Object.keys(todoMap);
  const sortedDates = sortDate(dates, 'des');

  return (
    <Stack gap={32}>
      {sortedDates.map((date) => {
        return (
          <Stack key={date} gap={18}>
            <TodoListByDate key={date} todos={todoMap[date]} date={date} />
            <div className={classes.todoDivider} />
          </Stack>
        );
      })}
    </Stack>
  );
}
