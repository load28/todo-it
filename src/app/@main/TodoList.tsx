import { Todo } from '@/api/todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { ChangeEvent } from 'react';
import { ActionIcon, Checkbox, Group, Menu, Stack, Text } from '@mantine/core';
import classes from '@/app/@main/TodoList.module.css';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';

export function TodoList({ todos, date }: { todos: Todo[]; date: string }) {
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

  const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    todoMutation.mutate(e.target.id);
  };

  const editHandler = () => {
    // open modal
  };

  return (
    <div>
      <Group className={classes.todoSettingMenu} justify={'space-between'}>
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
            <Menu.Item leftSection={<IconEdit size={14} />} onClick={editHandler}>
              Edit
            </Menu.Item>
            <Menu.Item leftSection={<IconTrash size={14} />} styles={{ item: { color: 'red' } }}>
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Stack gap={16} pt={16} pb={16} pl={8} pr={8}>
        {todos.map((todo) => {
          return (
            <label key={todo.id} className={classes.todoLabel} htmlFor={todo.id}>
              <Group align={'flex-start'} wrap={'nowrap'} gap={8} className={classes.todoContainer}>
                <Checkbox id={todo.id} color={'gray.5'} size={'xs'} pt={2} checked={todo.isComplete} onChange={checkboxHandler} />
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
