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
import { getAllRoles } from '@/services/rolesServices';
import { getAllPermissions } from '@/services/permissionServices';
import { assignPermissionToRole } from '@/services/rolesServices';
import Layout from '@/components/Layout';

export default function AssignPermissiontoRolePage() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [form, setForm] = useState({
    roleId: '',
    permissionId: '',
  });

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesData = await getAllRoles();
        const permissionsData = await getAllPermissions();
        setRoles(rolesData.data);
        setPermissions(permissionsData);
      } catch (err: any) {
        setError('Failed to load roles or permissions');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    try {
      await assignPermissionToRole(form);
      setSuccess('Permission successfully assigned to role!');
      setForm({ roleId: '', permissionId: '' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <Layout>
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
            Assign Permission to Role
          </Typography>

          {loading ? (
            <Box display="flex" justifyContent="center" py={3}>
              <CircularProgress />
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                select
                label="Select Role"
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

              <TextField
                select
                label="Select Permission"
                name="permissionId"
                fullWidth
                required
                value={form.permissionId}
                onChange={handleChange}
                margin="normal"
              >
                {permissions.map((permission: any) => (
                  <MenuItem key={permission.id} value={permission.id}>
                    {permission.name}
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
                Assign
              </Button>
            </form>
          )}

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
    </Layout>
  );
}
