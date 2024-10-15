'use client';

import { Todo } from '@/api/todo';
import classes from '@/app/(with_frame)/main/TodoList.module.css';
import { SaveTodoModal } from '@/components/save-todo/SaveTodoModal';
import { ModalControlProvider } from '@/core/providers/ModalControl.context';
import { useSessionQuery } from '@/core/query/session-query';
import { ActionIcon, Checkbox, Group, Menu, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import { ChangeEvent, PropsWithChildren } from 'react';
import { TodoSaveParamsWithRequiredDelete, useRemoveTodoQuery, useToggleTodoQuery } from '@/core/query/todo-client-query';

export function TodoList({ todos, date }: PropsWithChildren<{ todos: Todo[]; date: string }>) {
  const session = useSessionQuery();
  const [opened, { open, close }] = useDisclosure(false);
  const todoMutation = useToggleTodoQuery();
  const todoRemoveMutation = useRemoveTodoQuery();

  const onCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedTodo = todos.find((todo) => todo.id === e.target.id);
    if (!updatedTodo) {
      return;
    }

    todoMutation.mutate({
      date,
      userId: session.data.id,
      data: { update: [{ ...updatedTodo, isComplete: !updatedTodo.isComplete }] },
    });
  };
  const onEditHandler = () => open();
  const onDeletehander = () => {
    const todoSaveParams: TodoSaveParamsWithRequiredDelete = {
      date,
      userId: session.data.id,
      data: { delete: todos.map((todo) => todo.id) },
    };
    todoRemoveMutation.mutate(todoSaveParams);
  };

  return (
    <div>
      {opened && (
        <ModalControlProvider value={{ opened, close, open }}>
          <SaveTodoModal date={date} />
        </ModalControlProvider>
      )}
      <Group justify={'space-between'}>
        <Text size="md" fw={700} c="gray.8">
          {date}
        </Text>
        <Menu width={180} styles={{ itemLabel: { fontSize: '12px' } }} position={'bottom-end'}>
          <Menu.Target>
            <ActionIcon size={'sm'} color={'gray.6'} variant={'subtle'}>
              <IconDotsVertical size={16} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconEdit size={14} />} onClick={onEditHandler}>
              Edit
            </Menu.Item>
            <Menu.Item leftSection={<IconTrash size={14} />} style={{ color: 'red' }} onClick={onDeletehander}>
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Stack gap={8} pt={16} pb={16} pl={8} pr={8}>
        {todos.map((todo) => {
          return (
            <label key={todo.id} className={classes.todoLabel} htmlFor={todo.id}>
              <Group align={'flex-start'} wrap={'nowrap'} gap={8} className={classes.todoContainer}>
                <Checkbox id={todo.id} color={'gray.5'} size={'xs'} pt={2} checked={todo.isComplete} onChange={onCheckboxHandler} />
                <Stack gap={12} flex={1}>
                  <Group justify={'space-between'} align={'flex-start'} wrap={'nowrap'}>
                    <Text
                      size={'sm'}
                      fw={todo.isComplete ? 400 : 500}
                      c={todo.isComplete ? 'gray.5' : 'gray.8'}
                      td={todo.isComplete ? 'line-through' : undefined}
                      fs={todo.isComplete ? 'italic' : undefined}
                    >
                      {todo.description}
                    </Text>
                  </Group>
                </Stack>
              </Group>
            </label>
          );
        })}
      </Stack>
    </div>
  );
}
