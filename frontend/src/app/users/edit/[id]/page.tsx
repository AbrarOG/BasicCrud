'use client';

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
import { useParams, useRouter } from 'next/navigation';
import { EditaUser, getaUser } from '@/services/authServices';

export default function EditUserPage() {
  const { id } = useParams(); // get user ID from URL
  const router = useRouter();

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRolesAndUser = async () => {
      try {
        const [rolesRes, userData] = await Promise.all([
          fetch(`http://localhost:3001/roles`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }).then(res => res.json()),
          getaUser(id as string),
        ]);
        setRoles(rolesRes.data);
        setForm({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          password: userData.password || '',
          cnic: userData.cnic || '',
          phoneNumber: userData.phoneNumber || '',
          roleId: String(userData.role?.id || ''),
        });
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user or roles');
      } finally {
        setLoading(false);
      }
    };
    fetchRolesAndUser();
  }, [id]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    try {
      await EditaUser(id as string, form);
      setSuccess('User updated successfully!');
      router.push('/users');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };


  if (loading) {
    return <Typography>Loading...</Typography>;
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
          Edit User
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
            Update User
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
