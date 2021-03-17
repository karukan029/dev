import { format } from 'date-fns';

const formatDate = (date) => {
  return format(new Date(date), 'yyyy/MM/dd');
};

export { formatDate };
