'use client';

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getaBook, EditaBook } from '@/services/bookServices';

export default function EditBookPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    totalCopies: 0,
    availableCopies: 0,
    isActive: true,
    description: '',
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch book details
  useEffect(() => {
    async function fetchBook() {
      try {
        const book = await getaBook(id as string);
        console.log("getting deatils for book", book)
        setForm({
          title: book.title,
          author: book.author,
          publisher: book.publisher,
          isbn: book.isbn,
          totalCopies: book.totalCopies,
          availableCopies: book.availableCopies,
          isActive: book.isActive,
          description: book.description,
        });
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'isActive'
          ? value === 'true'
          : name === 'totalCopies' || name === 'availableCopies'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      await EditaBook(id as string, form);
      setSuccess('Book updated successfully!');
      router.push('/books');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

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
          Edit Book
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            required
            value={form.title}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            label="Author"
            name="author"
            fullWidth
            required
            value={form.author}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            label="Publisher"
            name="publisher"
            fullWidth
            required
            value={form.publisher}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            label="ISBN"
            name="isbn"
            fullWidth
            required
            value={form.isbn}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            type="number"
            label="Total Copies"
            name="totalCopies"
            fullWidth
            required
            value={form.totalCopies}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            type="number"
            label="Available Copies"
            name="availableCopies"
            fullWidth
            required
            value={form.availableCopies}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={form.description}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            select
            label="Active Status"
            name="isActive"
            fullWidth
            required
            value={String(form.isActive)}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="true">Active</MenuItem>
            <MenuItem value="false">Inactive</MenuItem>
          </TextField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={submitting}
            sx={{ mt: 2 }}
          >
            {submitting ? 'Updating...' : 'Update Book'}
          </Button>
        </form>

        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>
    </Box>
  );
}
