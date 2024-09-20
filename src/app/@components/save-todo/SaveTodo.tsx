import { ActionIcon, Group, Input, Stack, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { ChangeEvent } from 'react';
import { IconSquareRoundedPlus, IconSquareRoundedX } from '@tabler/icons-react';

export const SaveTodo = {
  Date: ({ date, setDate }: { date: Date | null; setDate: (date: Date | null) => void }) => {
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
  Todos: ({ todos, setTodos }: { todos: string[]; setTodos: (value: string[]) => void }) => {
    const changeHandler = (index: number, value: ChangeEvent<HTMLInputElement>) => {
      if (!value) {
        return;
      }

      const newTodos = [...todos];
      newTodos[index] = `${value.target.value}`;
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
      setTodos([...todos, '']);
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
                <Input value={todo} onChange={(value) => changeHandler(index, value)} data-autofocus={index === 0 || undefined} />
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
