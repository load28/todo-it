import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export const sortDate = (dates: string[], sort: 'acs' | 'des') => {
  const fn = (a: string, b: string) => (sort === 'acs' ? new Date(a).getTime() - new Date(b).getTime() : new Date(b).getTime() - new Date(a).getTime());

  return dates.sort(fn);
};

dayjs.extend(utc);

export const utcDayjs = dayjs;