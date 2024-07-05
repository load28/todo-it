'use client';

import { sortDate } from '@/utils/date';
import { Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import classes from './TodoList.module.css';
import { getTodos, Todo } from '@/api/todo';
import React from 'react';
import { TodoListByDate } from '@/app/@main/TodoListByDate';

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
