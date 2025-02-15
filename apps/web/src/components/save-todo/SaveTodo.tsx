'use client';

import { ActionIcon, Group, Input, List, Stack, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { Todo } from '@todo-it/api/todo';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { v4 } from 'uuid';

export const SaveTodo = {
  Date: ({ date, setDate }: { date: Date; setDate: (date: Date | null) => void }) => {
    return (
      <DatePickerInput
        label={
          <Input.Label fw={'bold'} mb={'sm'}>
            Date
          </Input.Label>
        }
        highlightToday={true}
        placeholder="Pick date"
        value={date}
        onChange={setDate}
      />
    );
  },
  Todos: ({ date, todos, setTodos }: { date: string; todos: Todo[]; setTodos: (value: Todo[]) => void }) => {
    const [newDescription, setNewDescription] = useState<string>('');
    const [isComposing, setCompose] = useState(false);

    const onEnterHandler = (event: KeyboardEvent) => {
      if (event.code !== 'Enter' || isComposing) return;
      onAddHandler();
    };

    const onChangeHandler = (value: ChangeEvent<HTMLInputElement>) => {
      if (!value) {
        return;
      }

      setNewDescription(value.target.value);
    };

    const onDeleteHandler = (index: number) => {
      if (!todos) {
        return;
      }

      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    };

    const onAddHandler = () => {
      if (!newDescription) return;

      setTodos([...todos, { id: v4(), date, description: newDescription, isComplete: false, createdAt: Date.now() }]);
      setNewDescription('');
    };

    return (
      <Stack gap={'xl'}>
        <Stack gap={'xs'}>
          <Text size={'sm'} fw={'bold'}>
            Add
          </Text>
          <Group>
            <Input.Wrapper flex={1}>
              <Input
                data-autofocus
                value={newDescription}
                onChange={onChangeHandler}
                onCompositionStart={() => setCompose(true)}
                onCompositionEnd={() => setCompose(false)}
                onKeyDown={onEnterHandler}
              />
            </Input.Wrapper>
            <ActionIcon size={'sm'} variant={'subtle'} onClick={onAddHandler}>
              <IconPlus />
            </ActionIcon>
          </Group>
        </Stack>
        <Stack gap={'md'}>
          <Text size={'sm'} fw={'bold'}>
            Todos
          </Text>
          {todos.length === 0 ? (
            <Text size={'sm'} fs={'italic'} m={'auto'}>
              Add your Todo
            </Text>
          ) : (
            <List withPadding size={'sm'}>
              {todos.map((todo, index) => {
                return (
                  <Group key={todo.id} mb={'xs'}>
                    <List.Item key={todo.id} flex={1}>
                      {todo.description}
                    </List.Item>
                    <ActionIcon size={'sm'} variant={'subtle'} ml={'auto'} color={'gray.5'} onClick={() => onDeleteHandler(index)}>
                      <IconTrash />
                    </ActionIcon>
                  </Group>
                );
              })}
            </List>
          )}
        </Stack>
      </Stack>
    );
  },
};
