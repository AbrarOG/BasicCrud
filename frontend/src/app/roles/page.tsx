// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   Typography,
//   Box,
//   CircularProgress,
//   Alert,
//   Link,
//   Button,
// } from '@mui/material';
// import { Role } from '../../types/role';
// import { getAllRoles, DeleteaRole } from '@/services/rolesServices';
// import Layout from '../../components/Layout';

// export default function AllRolesPage() {
//   const [roles, setRoles] = useState<Role[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchRoles();
//   }, []);
//   const fetchRoles = async () => {
//     try {
//       const roleData = await getAllRoles();
//       setRoles(roleData.data);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch roles');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     //     const confirmDelete = window.confirm("Are you sure you want to delete this role?");
//     //     if (!confirmDelete) return;
//     //     try {
//     //       await DeleteaRole(id);
//     //       fetchRoles(); // Refresh list after deletion
//     //     } catch (err: any) {
//     //       alert(err.message || "Failed to delete role");
//     //     }
//     //   };
//     //   if (loading) {
//     //     return (
//     //       <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
//     //         <CircularProgress />
//     //       </Box>
//     //     );
//   };

//   if (error) {
//     return (
//       <Alert severity="error" sx={{ mt: 5 }}>
//         {error}
//       </Alert>
//     );
//   }

//   return (
//     <Layout>
//       <Box p={4}>
//         <Typography variant="h4" gutterBottom>
//           All Roles
//         </Typography>

//         <Box display="flex" justifyContent="flex-end" my={2}>
//           <Button
//             variant="contained"
//             color="success"
//             href="/roles/create"
//             sx={{ fontWeight: 'bold', borderRadius: 2, px: 4, py: 1.5 }}
//           >
//             Add Role
//           </Button>
//         </Box>

//         <Paper>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Active</TableCell>
//                 <TableCell>Edit</TableCell>
//                 <TableCell>Permissions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {roles.map((role) => (
//                 <TableRow key={role.id}>
//                   <TableCell>{role.name}</TableCell>
//                   <TableCell>{role.isActive ? 'Yes' : 'No'}</TableCell>

//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="success"
//                       href={`/roles/edit/${role.id}`}
//                       sx={{
//                         fontWeight: 'bold',
//                         borderRadius: 2,
//                         px: 4,
//                         py: 1.5,
//                       }}
//                     >
//                       Edit
//                     </Button>
//                   </TableCell>

//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="error"
//                       href={`/roles/permissions/${role.id}`}
//                       sx={{
//                         fontWeight: 'bold',
//                         borderRadius: 2,
//                         px: 4,
//                         py: 1.5,
//                       }}
//                     >
//                       Permissions
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Paper>
//       </Box>
//     </Layout>
//   );
// }

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
import { Role } from '../../types/role';
import { getAllRoles, DeleteaRole } from '@/services/rolesServices';
import Layout from '../../components/Layout';

export default function AllRolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const roleData = await getAllRoles();
      setRoles(roleData.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch roles');
    } finally {
      setLoading(false);
    }
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
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
          All Roles
        </Typography>

        <Box display="flex" justifyContent="flex-end" my={2}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#1565c0' },
              fontWeight: 'bold',
              borderRadius: 2,
              px: 4,
              py: 1.5,
              boxShadow: 2,
            }}
            href="/roles/create"
          >
            + Add Role
          </Button>
        </Box>

        <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Active</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Edit</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Permissions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => (
                <TableRow
                  key={role.id}
                  sx={{
                    '&:hover': { backgroundColor: '#f9f9f9' },
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <TableCell>{role.name}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        backgroundColor: role.isActive ? '#e8f5e9' : '#ffebee',
                        color: role.isActive ? '#388e3c' : '#d32f2f',
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        display: 'inline-block',
                        fontSize: '0.85rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {role.isActive ? 'Active' : 'Inactive'}
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: '#1976d2',
                        color: '#1976d2',
                        fontWeight: 'bold',
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        '&:hover': { backgroundColor: '#e3f2fd' },
                      }}
                      href={`/roles/edit/${role.id}`}
                    >
                      Edit
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: '#9c27b0',
                        color: '#9c27b0',
                        fontWeight: 'bold',
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        '&:hover': { backgroundColor: '#f3e5f5' },
                      }}
                      href={`/roles/permissions/${role.id}`}
                    >
                      Permissions
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
