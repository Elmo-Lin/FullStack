import dayjs, { Dayjs } from 'dayjs';

export type Book = {
  id: number;
  title: string;
  isAvailable: boolean;
  borrowDate: Dayjs | null;
  returnDate: Dayjs | null;
};