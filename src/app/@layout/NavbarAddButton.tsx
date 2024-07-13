'use client';

import { IconSquareRoundedPlus } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SaveTodoModal } from '@/app/@components/SaveTodoModal';

export function NavbarAddButton() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      {opened && <SaveTodoModal close={close} opened={opened} date={new Date().toDateString()} />}
      <ActionIcon size={'sm'} variant={'subtle'} color={'gray.6'} onClick={open}>
        <IconSquareRoundedPlus />
      </ActionIcon>
    </>
  );
}
