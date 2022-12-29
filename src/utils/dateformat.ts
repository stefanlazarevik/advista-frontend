import { format, subDays } from 'date-fns';

export const getDateFormat = (date: any) => {
  return format(new Date(date), 'yyyy-MM-dd');
};
export const get7Days = () => {
  return subDays(new Date(), 7);
};
export const getDateMonthFormat = (date: any) => {
  return format(new Date(date), 'dd MMM');
};
