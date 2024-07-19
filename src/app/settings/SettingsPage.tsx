'use client';

import { useTzContext } from '@/app/@core/providers/Timezone.context';
import { Input, Select, Stack, Text } from '@mantine/core';

export function SettingsPage() {
  const tzCtx = useTzContext();
  const timezones = [ 'Asia/Seoul', 'Asia/Tokyo', 'America/New_York' ];
  return (
    <Stack>
      <Text size={ 'lg' } c={ 'gray.8' } fw={ 'bold' }>
        Settings
      </Text>
      <Select
        label={
          <Input.Label fw={ 'bold' } mb={ 'xs' }>
            Timezone
          </Input.Label>
        }
        placeholder="Pick timezone"
        data={ timezones }
        defaultValue={ tzCtx?.tz || timezones[0] }
        allowDeselect={ false }
      />
    </Stack>
  );
}
