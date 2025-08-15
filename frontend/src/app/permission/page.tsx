'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import { Permission } from '../../types/permission';
import {
  getAllPermissions,
  DeleteaPermission,
} from '@/services/permissionServices';
import Layout from '../../components/Layout';

export default function AllPermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const permissionData = await getAllPermissions();
      setPermissions(permissionData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch permissions');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    // const confirmDelete = window.confirm("Are you sure you want to delete this permission?");
    // if (!confirmDelete) return;
    // try {
    //   await DeleteaPermission(id);
    //   fetchPermissions(); // Refresh list after deletion
    // } catch (err: any) {
    //   alert(err.message || "Failed to delete permission");
    // }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
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
    <Layout>
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          All Permissions
        </Typography>

        <Box display="flex" justifyContent="flex-end" my={2}>
          <Button
            variant="contained"
            color="success"
            href="/permission/create"
            sx={{ fontWeight: 'bold', borderRadius: 2, px: 4, py: 1.5 }}
          >
            Add Permission
          </Button>
        </Box>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell>{permission.name}</TableCell>
                  <TableCell>{permission.description}</TableCell>
                  <TableCell>
                    {new Date(permission.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(permission.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      href={`/permission/edit/${permission.id}`}
                      sx={{
                        fontWeight: 'bold',
                        borderRadius: 2,
                        px: 4,
                        py: 1.5,
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(permission.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Layout>
  );
}
