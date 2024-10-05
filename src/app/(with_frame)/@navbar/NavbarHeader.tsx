'use client';

import { SaveTodoModal } from '@/app/@components/SaveTodoModal';
import { ModalControlProvider } from '@/app/@core/providers/ModalControl.context';
import { ActionIcon, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSquareRoundedPlus } from '@tabler/icons-react';
import React from 'react';

export function NavbarHeader() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Text size="lg" fw={700} c="gray.8">
        Todo it
      </Text>
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
