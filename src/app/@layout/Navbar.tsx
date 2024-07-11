'use client';

import { ActionIcon, Button, Chip, Group, Input, Modal, ModalTitle, Stack, Text } from '@mantine/core';
import { IconList, IconSquareRoundedPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './Navbar.module.css';
import { ChangeEvent, useMemo, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { DatePickerInput } from '@mantine/dates';

const data = [
  { link: '/', label: 'Todo', icon: IconList },
  // { link: '/search', label: 'Search', icon: IconSearch },
];

export function Navbar() {
  const currentPath = usePathname();
  const [value, setValue] = useState(new Date());
  const [opened, { open, close }] = useDisclosure(false);
  const links = useMemo(() => {
    return data.map((item) => (
      <Link key={item.link} className={classes.link} data-active={item.link === currentPath || undefined} href={item.link}>
        <item.icon className={classes.linkIcon} stroke={2.0} />
        <span>{item.label}</span>
      </Link>
    ));
  }, [data, currentPath]);
  const [todos, setTodos] = useState<string[]>(Array.from({ length: 4 }, () => ''));

  return (
    <nav className={classes.navbar}>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          setTodos(Array.from({ length: 4 }, () => ''));
        }}
        title={<ModalTitle fw={'bold'}>Add todos</ModalTitle>}
      >
        <Stack pl={'sm'} pr={'sm'}>
          <DatePickerInput
            label={
              <Input.Label fw={'bold'} mb={'sm'}>
                Date
              </Input.Label>
            }
            mb={'md'}
            highlightToday={true}
            placeholder="Pick date"
            value={value}
          />
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
                <Input.Wrapper key={index}>
                  <Input value={todo} onChange={changeHandler} />
                </Input.Wrapper>
              );
            })}
          </Stack>
          <ActionIcon
            variant={'subtle'}
            ml={'auto'}
            mr={'auto'}
            onClick={() => {
              setTodos([...todos, '']);
            }}
          >
            <IconSquareRoundedPlus />
          </ActionIcon>
          <Chip.Group multiple>
            <Group justify="start" mt={'xs'} gap={8} mih={42}>
              <Chip size={'xs'} value="study">
                study
              </Chip>
              <Chip size={'xs'} value="simple">
                simple
              </Chip>
            </Group>
          </Chip.Group>
          <Button color="blue.5">Add</Button>
        </Stack>
      </Modal>
      <Stack flex={'1'} gap={64} justify={'space-between'}>
        <Stack>
          <Group className={classes.header} justify="space-between">
            <Text size="lg" fw={700} c="gray.8">
              Todo it
            </Text>
            <ActionIcon size={'sm'} variant={'subtle'} color={'gray.6'} onClick={open}>
              <IconSquareRoundedPlus />
            </ActionIcon>
          </Group>
          {links}
        </Stack>
      </Stack>
    </nav>
  );
}
