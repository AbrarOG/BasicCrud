'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';

import { Book } from '../../types/book';
import { getAllBooks, DeleteaBook } from '@/services/bookServices';
import Layout from '../../components/Layout';
import { redirect } from 'next/dist/server/api-utils';

export default function AllBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const bookData = await getAllBooks(); // returns Book[]
      console.log('Fetched books:', bookData);
      setBooks(Array.isArray(bookData) ? bookData : []);
    } catch (err: any) {
      setError(JSON.stringify(err));

      // setError(err.message || 'Failed to fetch books');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this book?'
    );
    if (!confirmDelete) return;
    try {
      await DeleteaBook(id);
      fetchBooks(); // Refresh list after deletion
    } catch (err: any) {
      alert(err.message || 'Failed to delete book');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 5 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Layout>
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          All Books
        </Typography>

        <Box display="flex" justifyContent="flex-end" my={2}>
          <Button
            variant="contained"
            color="success"
            href="/books/create"
            sx={{ fontWeight: 'bold', borderRadius: 2, px: 4, py: 1.5 }}
          >
            Add Book
          </Button>
        </Box>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Publisher</TableCell>
                <TableCell>ISBN</TableCell>
                <TableCell>Total Copies</TableCell>
                <TableCell>Available Copies</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow
                  key={book.id}
                  onClick={() => router.push(`/books/${book.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  {' '}
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.publisher}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.totalCopies}</TableCell>
                  <TableCell>{book.availableCopies}</TableCell>
                  <TableCell>{book.isActive ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      href={`/books/edit/${book.id}`}
                      sx={{ fontWeight: 'bold', borderRadius: 2, px: 3, py: 1 }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(book.id)}
                      sx={{ fontWeight: 'bold', borderRadius: 2, px: 2, py: 1 }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="warning"
                      href={`/books/qrcode/${book.id}`}
                      sx={{ fontWeight: 'bold', borderRadius: 2, px: 2, py: 1 }}
                    >
                      generate QRCode
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Layout>
  );
}
