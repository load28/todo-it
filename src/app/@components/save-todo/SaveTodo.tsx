import { ActionIcon, Group, Input, Stack, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { ChangeEvent } from 'react';
import { IconSquareRoundedPlus, IconSquareRoundedX } from '@tabler/icons-react';
import { useSaveTodoWrapperContext } from '@/app/@components/save-todo/SaveTodoWrapper.context';

export const SaveTodo = {
  Date: () => {
    const ctx = useSaveTodoWrapperContext();

    return (
      <DatePickerInput
        label={
          <Input.Label fw={'bold'} mb={'sm'}>
            Date
          </Input.Label>
        }
        highlightToday={true}
        placeholder="Pick date"
        value={ctx?.date}
        onChange={ctx?.setDate}
      />
    );
  },
  Todos: () => {
    const ctx = useSaveTodoWrapperContext();

    return (
      <Stack gap={'sm'}>
        <Text size={'sm'} fw={'bold'}>
          Todos
        </Text>
        {ctx?.todos &&
          ctx.todos.map((todo, index) => {
            const changeHandler = (value: ChangeEvent<HTMLInputElement>) => {
              if (!value) {
                return;
              }

              const newTodos = [...ctx.todos];
              newTodos[index] = `${value.target.value}`;
              ctx.setTodos(newTodos);
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
                    if (ctx.todos.length === 1) {
                      return;
                    }

                    const newTodos = [...ctx.todos];
                    newTodos.splice(index, 1);
                    ctx.setTodos(newTodos);
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
            ctx && ctx.setTodos([...ctx.todos, '']);
          }}
        >
          <IconSquareRoundedPlus />
        </ActionIcon>
      </Stack>
    );
  },
};
