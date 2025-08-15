'use client';

import { createRole } from '@/services/rolesServices';
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

export default function CreateRolePage() {
  const [form, setForm] = useState({
    name: '',
    isActive: true,
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: name === 'isActive' ? value === 'true' : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    try {
      await createRole(form);
      setSuccess('Role created successfully!');
      setForm({
        name: '',
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
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 500 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Create New Role
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
            sx={{ mt: 2 }}
          >
            Create Role
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
