import { Todo } from '@/api/todo';
import { Badge, Checkbox, Group, Stack, Text } from '@mantine/core';

export function SearchResult({ todos }: { todos: Todo[] }) {
  return (
    <Stack gap={16}>
      {todos.map((todo) => {
        return (
          <Group key={todo.id} justify="space-between">
            <Group gap={48}>
              <Checkbox
                id={todo.id}
                checked={todo.isComplete}
                readOnly={true}
                label={todo.description}
              />
              <Group gap={12}>
                {todo.hashtag.map((tag, index) => {
                  return (
                    <Badge key={index} size={'xs'}>
                      {tag}
                    </Badge>
                  );
                })}
              </Group>
            </Group>
            <Text size="xs">{todo.date}</Text>
          </Group>
        );
      })}
    </Stack>
  );
}
