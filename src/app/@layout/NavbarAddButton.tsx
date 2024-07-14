'use client';

import { IconSquareRoundedPlus } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SaveTodoModal } from '@/app/@components/SaveTodoModal';
import { ModalControlProvider } from '@/app/@core/ModalControl.context';

export function NavbarAddButton() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      {opened && (
        <ModalControlProvider value={{ opened, close, open }}>
          <SaveTodoModal date={new Date().toISOString()} />
        </ModalControlProvider>
      )}
      <ActionIcon size={'sm'} variant={'subtle'} color={'gray.6'} onClick={open}>
        <IconSquareRoundedPlus />
      </ActionIcon>
    </>
  );
}
