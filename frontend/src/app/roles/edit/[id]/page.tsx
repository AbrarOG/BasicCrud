'use client';

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { EditaRole, getaRole } from '@/services/rolesServices';

export default function EditRolePage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    isActive: true,
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch role details
  useEffect(() => {
    async function fetchRole() {
      try {
        const role = await getaRole(id as string);
        setForm({
          name: role.data.name,
          isActive: role.data.isActive,
        });
      } catch (err: any) {
        setError(err.message || 'Failed to load role details');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchRole();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'isActive' ? value === 'true' : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setSubmitting(true);

    try {
      await EditaRole(id as string, form);
      setSuccess('Role updated successfully!');
      router.push('/roles');
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
          Edit Role
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
            {submitting ? 'Updating...' : 'Update Role'}
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
