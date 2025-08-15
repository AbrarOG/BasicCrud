'use client';

import { createBook } from '@/services/bookServices';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';

export default function CreateBookPage() {
  const [form, setForm] = useState({
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    totalCopies: 0,
    availableCopies: 0,
    description: '',
    isActive: true,
  });

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    setSuccess(null);
    setError(null);

    try {
      await createBook(form);
      setSuccess('Book created successfully!');
      setForm({
        title: '',
        author: '',
        publisher: '',
        isbn: '',
        totalCopies: 0,
        availableCopies: 0,
        description: '',
        isActive: true,
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

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
          Create New Book
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
            label="Total Copies"
            name="totalCopies"
            type="number"
            fullWidth
            required
            value={form.totalCopies}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            label="Available Copies"
            name="availableCopies"
            type="number"
            fullWidth
            required
            value={form.availableCopies}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            label="Description"
            name="description"
            multiline
            rows={4}
            fullWidth
            required
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
            sx={{ mt: 2 }}
          >
            Create Book
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
