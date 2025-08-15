 'use client';

import { createUser } from '@/services/authServices';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  MenuItem,
} from '@mui/material';
import { useState, useEffect } from 'react';

export default function CreateUserPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cnic: '',
    phoneNumber: '',
    roleId: '',
  });
  const [roles, setRoles] = useState([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch(`http://localhost:3001/roles`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setRoles(data.data);

      } catch (err) {
        console.error(err);
        setError('Failed to fetch roles');
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSuccess(null);
  setError(null);

  try {
    await createUser(form);
    setSuccess('User created successfully!');
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      cnic: '',
      phoneNumber: '',
      roleId: '',
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
          Create New User
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            required
            value={form.firstName}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            required
            value={form.lastName}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            value={form.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            value={form.password}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="CNIC"
            name="cnic"
            fullWidth
            value={form.cnic}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            fullWidth
            value={form.phoneNumber}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            select
            label="Role"
            name="roleId"
            fullWidth
            required
            value={form.roleId}
            onChange={handleChange}
            margin="normal"
          >
            {roles.map((role: any) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Create User
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
