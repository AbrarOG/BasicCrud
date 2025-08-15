'use client';

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { EditaPermission, getaPermission } from '@/services/permissionServices';
import { Permission } from '@/types/permission';

export default function EditPermissionPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<Omit<Permission, 'id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    description: '',
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch permission details
  useEffect(() => {
    async function fetchPermission() {
      try {
        const permission = await getaPermission(id as string);
        const { name, description } = permission;
        setForm({ name, description });
      } catch (err: any) {
        setError(err.message || 'Failed to load permission details');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPermission();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setSubmitting(true);

    try {
      await EditaPermission(id as string, form);
      setSuccess('Permission updated successfully!');
      router.push('/permission');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#f5f5f5"
      >
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
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 500 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Edit Permission
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            required
            value={form.name}
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={submitting}
            sx={{ mt: 2 }}
          >
            {submitting ? 'Updating...' : 'Update Permission'}
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
