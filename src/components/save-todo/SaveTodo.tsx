import { Todo } from '@/api/todo';
import { ActionIcon, Group, Input, Stack, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconSquareRoundedPlus, IconSquareRoundedX } from '@tabler/icons-react';
import { ChangeEvent } from 'react';

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
    const onChangeHandler = (index: number, value: ChangeEvent<HTMLInputElement>) => {
      if (!value) {
        return;
      }

      const newTodos = [...todos];
      newTodos[index] = { ...newTodos[index], description: value.target.value };
      setTodos(newTodos);
    };

    const onDeleteHandler = (index: number) => {
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

    const onAddHandler = () => {
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
                  onChange={(value) => onChangeHandler(index, value)}
                  data-autofocus={index === 0 || undefined}
                />
              </Input.Wrapper>
              <ActionIcon size={'sm'} color={'red.5'} variant={'subtle'} onClick={() => onDeleteHandler(index)}>
                <IconSquareRoundedX />
              </ActionIcon>
            </Group>
          );
        })}
        <ActionIcon variant={'subtle'} ml={'auto'} mr={'auto'} color={'gray.5'} onClick={onAddHandler}>
          <IconSquareRoundedPlus />
        </ActionIcon>
      </Stack>
    );
  },
};
