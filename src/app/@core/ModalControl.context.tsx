'use client';

import { createOptionalContext } from '@mantine/core';

interface ModalControlContext {
  opened: boolean;
  open: () => void;
  close: () => void;
}

export const [ModalControlProvider, useModalControlContext] = createOptionalContext<ModalControlContext>();
