import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export const utcDayjs = dayjs;

export const sortDate = (dates: string[], sort: 'acs' | 'des') => {
  const fn = (a: string, b: string) => (sort === 'acs' ? new Date(a).getTime() - new Date(b).getTime() : new Date(b).getTime() - new Date(a).getTime());

  return dates.sort(fn);
};
