'use client';

import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getaBook } from '@/services/bookServices';

export default function BookDetailPage() {
  const { id } = useParams();

  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const fetchedBook = await getaBook(id as string);
        setBook(fetchedBook);
      } catch (err: any) {
        setError(err.message || 'Failed to load book details');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchBook();
    }
  }, [id]);

  if (loading) {
    return (
      <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!book) return null;

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f5f5f5"
      px={2}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 600 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Book Details
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="body1"><strong>Title:</strong> {book.title}</Typography>
        <Typography variant="body1"><strong>Author:</strong> {book.author}</Typography>
        <Typography variant="body1"><strong>Publisher:</strong> {book.publisher}</Typography>
        <Typography variant="body1"><strong>ISBN:</strong> {book.isbn}</Typography>
        <Typography variant="body1"><strong>Total Copies:</strong> {book.totalCopies}</Typography>
        <Typography variant="body1"><strong>Available Copies:</strong> {book.availableCopies}</Typography>
        <Typography variant="body1"><strong>Status:</strong> {book.isActive ? 'Active' : 'Inactive'}</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Description:</strong> {book.description || 'No description provided'}
        </Typography>
      </Paper>
    </Box>
  );
}
