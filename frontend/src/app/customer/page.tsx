'use client';

import { useEffect, useState } from 'react';
import { Box, Grid, CircularProgress, Alert, Typography } from '@mui/material';
import { getAllBooks } from '@/services/bookServices';
import { Book } from '../../types/book';
import BookCard from '../../components/BookCard'; // import reusable card

export default function CustomerPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const bookData = await getAllBooks();
      setBooks(Array.isArray(bookData) ? bookData : []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
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
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
        Available Books
      </Typography>

      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
