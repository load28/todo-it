'use client';

import { createOptionalContext } from '@mantine/core';

interface SaveTodoWrapperContextValue {
  date: Date | null;
  setDate: (value: Date | null) => void;
  todos: string[];
  setTodos: (todos: string[]) => void;
}

export const [SaveTodoWrapperProvider, useSaveTodoWrapperContext] = createOptionalContext<SaveTodoWrapperContextValue>();
