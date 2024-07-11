import { ActionIcon, Group, Input, Stack, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { ChangeEvent, PropsWithChildren, PropsWithoutRef } from 'react';
import { IconSquareRoundedPlus, IconSquareRoundedX } from '@tabler/icons-react';

export const SaveTodo = {
  Date: ({ setDate, value }: PropsWithoutRef<{ value: Date; setDate: (value: Date) => void }>) => {
    return (
      <DatePickerInput
        label={
          <Input.Label fw={'bold'} mb={'sm'}>
            Date
          </Input.Label>
        }
        highlightToday={true}
        placeholder="Pick date"
        value={value}
      />
    );
  },
  Todos: ({ todos, setTodos }: PropsWithChildren<{ todos: string[]; setTodos: (todos: string[]) => void }>) => {
    return (
      <Stack gap={'sm'}>
        <Text size={'sm'} fw={'bold'}>
          Todos
        </Text>
        {todos.map((todo, index) => {
          const changeHandler = (value: ChangeEvent<HTMLInputElement>) => {
            if (!value) {
              return;
            }

            const newTodos = [...todos];
            newTodos[index] = `${value.target.value}`;
            setTodos(newTodos);
          };
          return (
            <Group gap={'sm'} key={index}>
              <Input.Wrapper flex={1}>
                <Input value={todo} onChange={changeHandler} data-autofocus={index === 0 || undefined} />
              </Input.Wrapper>
              <ActionIcon
                size={'sm'}
                color={'red.5'}
                variant={'subtle'}
                onClick={() => {
                  if (todos.length === 1) {
                    return;
                  }

                  const newTodos = [...todos];
                  newTodos.splice(index, 1);
                  setTodos(newTodos);
                }}
              >
                <IconSquareRoundedX />
              </ActionIcon>
            </Group>
          );
        })}
        <ActionIcon
          variant={'subtle'}
          ml={'auto'}
          mr={'auto'}
          color={'gray.5'}
          onClick={() => {
            setTodos([...todos, '']);
          }}
        >
          <IconSquareRoundedPlus />
        </ActionIcon>
      </Stack>
    );
  },
};
