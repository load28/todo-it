'use client';

import { SaveTodo } from '@/app/@components/save-todo/SaveTodo';
import { useModalControlContext } from '@/app/@core/providers/ModalControl.context';
import { Button, Modal, Stack } from '@mantine/core';
import { useState } from 'react';
import { useSaveTodoDataContext } from '@/app/@components/save-todo/SaveTodoData.context';
import { TodoPostParams } from '@/app/api/todo/route';
import { useSessionQuery } from '@/app/@core/query/session-query';
import dayjs from 'dayjs';

export const CreateTodoModal = () => {
  const session = useSessionQuery();
  const ctx = useSaveTodoDataContext();
  const modalCtx = useModalControlContext();
  const [descriptions, setDescriptions] = useState<string[]>(Array.from({ length: 4 }, () => ''));

  const submitHandler = async () => {
    const date = ctx?.date;
    if (!date || !modalCtx) {
      return;
    }

    const todoParam: TodoPostParams = {
      userId: session.data.id,
      date: dayjs(date).format('YYYY-MM-DD'),
      data: descriptions.filter((description) => !!description).map((description) => ({ description: description.trim(), isComplete: false })),
    };

    // TODO 로딩 처리 필요 form action을 넣어서 로딩 추가
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoParam),
    });

    // TODO 에러케이스 인 경우 에러 팝업을 띄우도록 유도
    if (response.status !== 200) {
    }
    modalCtx.close();
  };

  return (
    <>
      {ctx && (
        <Modal
          opened={modalCtx?.opened || false}
          onClose={() => {
            modalCtx?.close();
          }}
          title="Create todo"
          styles={{
            title: {
              fontWeight: 700,
            },
          }}
        >
          <Stack pt={'md'} pb={'md'} pl={'sm'} pr={'sm'} gap={'xl'}>
            <Stack gap={'xl'}>
              <SaveTodo.Date date={ctx.date} setDate={ctx.setDate} />
              <SaveTodo.Todos todos={descriptions} setTodos={setDescriptions} />
            </Stack>
            <Button mt={'md'} color="blue.5" onClick={submitHandler}>
              Add
            </Button>
          </Stack>
        </Modal>
      )}
    </>
  );
};
