'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Alert,
} from '@mui/material';
import { getAllPermissions } from '@/services/permissionServices';
import { getaRole, updatePermissionsForRole} from '@/services/rolesServices'; // You must implement this

interface Permission {
  id: string;
  name: string;
  description: string | null;
}

export default function RolePermissionsPage() {
  const params = useParams();
  const roleId = params?.id as string;

  const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
  const [assignedPermissions, setAssignedPermissions] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchPermissions = async () => {
    try {
      const data = await getAllPermissions();
      console.log("i have all permission data", data)
      setAllPermissions(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch all permissions');
    }
  };

  const fetchPermissionAgainstRole = async () => {
    try {
      const roleData = await getaRole(roleId);
      console.log("i am all data from role", roleData.permissions)
      const assigned = roleData?.data.permissions || [];
      const assignedIds = new Set<string>(assigned.map((p: Permission) => p.id));
      setAssignedPermissions(assignedIds);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch role permissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
    fetchPermissionAgainstRole();
  }, [roleId]);

  const handlePermissionToggle = (permissionId: string) => {
    setAssignedPermissions((prev) => {
      const updated = new Set(prev);
      if (updated.has(permissionId)) {
        updated.delete(permissionId);
      } else {
        updated.add(permissionId);
      }
      return updated;
    });
  };

  const handleSave = async () => {
   try {
      const updatedPermissions = Array.from(assignedPermissions);

      await updatePermissionsForRole({
        roleId,
        permissions: updatedPermissions,
      });

      setSnackbar({
        open: true,
        message: 'Permissions updated successfully!',
        severity: 'success',
      });
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.message || 'Failed to update permissions',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={2}>
        Manage Permissions for Role
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Permission Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center">Assigned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allPermissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell>{permission.name}</TableCell>
                <TableCell>{permission.description || '-'}</TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={assignedPermissions.has(permission.id)}
                    onChange={() => handlePermissionToggle(permission.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Changes
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity as any} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
