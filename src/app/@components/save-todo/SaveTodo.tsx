import { ActionIcon, Group, Input, Stack, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { ChangeEvent } from 'react';
import { IconSquareRoundedPlus, IconSquareRoundedX } from '@tabler/icons-react';
import { useSaveTodoDataContext } from '@/app/@components/save-todo/SaveTodoData.context';

export const SaveTodo = {
  Date: () => {
    const ctx = useSaveTodoDataContext();

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
  // todo ui 요소만 가지고 있어야 하며 비즈니스 로직은 위에서 내려온 것을 기반으로 실행해야 한다
  Todos: () => {
    const ctx = useSaveTodoDataContext();

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
