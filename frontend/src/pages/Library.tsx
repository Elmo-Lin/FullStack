import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import { Book } from '../types/books';
import { mockBooks } from '../mocks/books';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

const useMockData = true;

export default function Library() {
  const [books, setBooks] = useState<Book[]>(useMockData ? mockBooks : []);

  const [borrowDates, setBorrowDates] = useState<{ [key: number]: Dayjs | null }>({});
  const [returnDates, setReturnDates] = useState<{ [key: number]: Dayjs | null }>({});

  const itemsPerPage = 5; // 每頁顯示 7 本書
  const [currentPage, setCurrentPage] = useState(1); // 預設在第 1 頁

  const [searchTerm, setSearchTerm] = useState('');
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleBorrow = (id: number) => {
    const book = books.find((b) => b.id === id);
    if (!book) return;
  
    const updatedBook = {
      ...book,
      isAvailable: false,
      borrowDate: borrowDates[id],
      returnDate: returnDates[id],
    };
  
    if (useMockData) {
      setBooks((prev) =>
        prev.map((b) => (b.id === id ? updatedBook : b))
      );
    } else {
      axios.put(`/books/${id}`, {
        ...updatedBook,
        borrowDate: updatedBook.borrowDate?.format('YYYY-MM-DD'),
        returnDate: updatedBook.returnDate?.format('YYYY-MM-DD'),
      }).then(() => {
        setBooks((prev) =>
          prev.map((b) => (b.id === id ? updatedBook : b))
        );
      });
    }
  };
  
  const handleReturn = (id: number) => {
    const book = books.find((b) => b.id === id);
    if (!book) return;
  
    const updatedBook = {
      ...book,
      isAvailable: true,
      borrowDate: null,
      returnDate: null,
    };
  
    if (useMockData) {
      setBooks((prev) =>
        prev.map((b) => (b.id === id ? updatedBook : b))
      );
    } else {
      axios.put(`/books/${id}`, updatedBook).then(() => {
        setBooks((prev) =>
          prev.map((b) => (b.id === id ? updatedBook : b))
        );
      });
    }
  };
  
  useEffect(() => {
    if (!useMockData) {
      axios.get('/books')
        .then((res) => {
          const parsed = res.data.map((b: Book) => ({
            ...b,
            borrowDate: b.borrowDate ? dayjs(b.borrowDate) : null,
            returnDate: b.returnDate ? dayjs(b.returnDate) : null,
          }));
          setBooks(parsed);
        });
    }
  }, []);
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ padding: '1rem' }}>
        <h2>📚 Library Management</h2>

        <TextField
          label="Search by title"
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          style={{ marginBottom: '1rem' }}
        />

        <Table style={{ marginTop: '1rem' }}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Borrow Date</TableCell>
              <TableCell>Return Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {paginatedBooks.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>

              <TableCell>
                {book.isAvailable ? (
                  <DatePicker<Dayjs>
                    label="Borrow Date"
                    value={borrowDates[book.id] || null}
                    onChange={(newDate) =>
                      setBorrowDates((prev) => ({
                        ...prev,
                        [book.id]: newDate as Dayjs | null,
                      }))
                    }
                    renderInput={(params) => <TextField {...params} size="small" />}
                  />
                ) : (
                  book.borrowDate?.format('YYYY-MM-DD')
                )}
              </TableCell>

              <TableCell>
                {book.isAvailable ? (
                  <DatePicker<Dayjs>
                    label="Return Date"
                    value={returnDates[book.id] || null}
                    onChange={(newDate) =>
                      setReturnDates((prev) => ({
                        ...prev,
                        [book.id]: newDate as Dayjs | null,
                      }))
                    }
                    renderInput={(params) => <TextField {...params} size="small" />}
                  />
                ) : (
                  book.returnDate?.format('YYYY-MM-DD')
                )}
              </TableCell>

              <TableCell>
                {book.isAvailable ? '✅ Available' : '❌ Borrowed'}
              </TableCell>

              <TableCell>
                {book.isAvailable ? (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleBorrow(book.id)}
                    disabled={!borrowDates[book.id] || !returnDates[book.id]}
                  >
                    Borrow
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleReturn(book.id)}
                  >
                    Return
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        </Table>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Button
            size="small"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀ Previous
          </Button>

          <span style={{ margin: '0 1rem' }}>
            Page {currentPage} of {totalPages}
          </span>

          <Button
            size="small"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next ▶
          </Button>
        </div>
      </div>
    </LocalizationProvider>
  );
}
