import { ActionIcon, Group, Input, Stack, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { ChangeEvent } from 'react';
import { IconSquareRoundedPlus, IconSquareRoundedX } from '@tabler/icons-react';
import { Todo } from '@/api/todo';

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
    const changeHandler = (index: number, value: ChangeEvent<HTMLInputElement>) => {
      if (!value) {
        return;
      }

      const newTodos = [...todos];
      newTodos[index] = { ...newTodos[index], description: value.target.value };
      setTodos(newTodos);
    };

    const deleteHandler = (index: number) => {
      if (!todos) {
        return;
      }

      if (todos.length === 1) {
        return;
      }

      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    };

    const addHandler = () => {
      setTodos([...todos, { id: '', date, description: '', isComplete: false, createdAt: Date.now() }]);
    };

    return (
      <Stack gap={'sm'}>
        <Text size={'sm'} fw={'bold'}>
          Todos
        </Text>
        {todos.map((todo, index) => {
          return (
            <Group gap={'sm'} key={index}>
              <Input.Wrapper flex={1}>
                <Input
                  value={todo.description}
                  onChange={(value) => changeHandler(index, value)}
                  data-autofocus={index === 0 || undefined}
                />
              </Input.Wrapper>
              <ActionIcon size={'sm'} color={'red.5'} variant={'subtle'} onClick={() => deleteHandler(index)}>
                <IconSquareRoundedX />
              </ActionIcon>
            </Group>
          );
        })}
        <ActionIcon variant={'subtle'} ml={'auto'} mr={'auto'} color={'gray.5'} onClick={addHandler}>
          <IconSquareRoundedPlus />
        </ActionIcon>
      </Stack>
    );
  },
};
