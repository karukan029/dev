import { format } from 'date-fns';

const formatDate = (date) => format(new Date(date), 'yyyy/MM/dd');

export default formatDate;
