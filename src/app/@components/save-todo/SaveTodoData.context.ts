'use client';

import { createOptionalContext } from '@mantine/core';

interface SaveTodoWrapperContextValue {
  date: Date | null;
  setDate: (value: Date | null) => void;
}

export const [SaveTodoDataProvider, useSaveTodoDataContext] = createOptionalContext<SaveTodoWrapperContextValue>();
