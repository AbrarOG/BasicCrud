// 'use client';

// import { useEffect, useState, useRef } from 'react';
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
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Pagination,
// } from '@mui/material';
// import { getAllUsers, DeleteaUser } from '../../services/authServices';
// import { User } from '../../types/user';
// import Layout from '../../components/Layout';
// import { useSearchParams, useRouter } from 'next/navigation';

// export default function AllUsersPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [search, setSearch] = useState(searchParams.get('search') || '');
//   const [type, setType] = useState(searchParams.get('type') || '');
//   const [page, setPage] = useState(Number(searchParams.get('page') || 1));
//   const [limit] = useState(5);
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [totalPages, setTotalPages] = useState(1);
//   const searchInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     fetchUsers();
//   }, [search, type, page]);
//   useEffect(() => {
//     // This will keep the focus after re-renders
//     if (searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//   }, [search, type, page]);

//   function debounce<T extends (...args: any[]) => void>(
//     func: T,
//     delay: number
//   ) {
//     let timer: NodeJS.Timeout;

//     const debounced = (...args: Parameters<T>) => {
//       clearTimeout(timer);
//       timer = setTimeout(() => func(...args), delay);
//     };

//     debounced.cancel = () => clearTimeout(timer);

//     return debounced as T & { cancel: () => void };
//   }

//   useEffect(() => {
//     const debouncedUpdate = debounce(() => {
//       updateURL(search, type, page);
//     }, 500);

//     debouncedUpdate();

//     // Cleanup if component unmounts before debounce runs
//     return () => {
//       debouncedUpdate.cancel?.();
//     };
//   }, [search, type, page]);

//   const updateURL = (newSearch: string, newType: string, newPage: number) => {
//     const params = new URLSearchParams();
//     if (newSearch) params.set('search', newSearch);
//     if (newType) params.set('type', newType);
//     if (newPage > 1) params.set('page', newPage.toString());

//     router.push(`/users?${params.toString()}`);
//   };

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const userData = await getAllUsers({ type, search, page, limit });
//       setUsers(userData.data);
//       console.log('i am a dummy datat', userData);
//       setTotalPages(userData.totalPages || 1);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!window.confirm('Are you sure you want to delete this user?')) return;
//     try {
//       await DeleteaUser(id);
//       fetchUsers();
//     } catch (err: any) {
//       alert(err.message || 'Failed to delete user');
//     }
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
//         <CircularProgress />
//       </Box>
//     );
//   }

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
//         <Typography variant="h4" gutterBottom fontWeight="bold">
//           All Users
//         </Typography>

//         <Box display="flex" justifyContent="flex-end" mb={3}>
//           <Button
//             variant="contained"
//             color="success"
//             href="/users/create"
//             sx={{ fontWeight: 'bold', borderRadius: 2 }}
//           >
//             Add User
//           </Button>
//         </Box>

//         {/* Filter Section */}
//         <Box display="flex" gap={2} mb={3} alignItems="center">
//           <TextField
//             label="Search"
//             variant="outlined"
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(1);
//               // updateURL(e.target.value, type, 1);
//             }}
//             inputRef={searchInputRef} // This attaches the ref
//           />

//           <FormControl variant="outlined" sx={{ minWidth: 150 }}>
//             <InputLabel>Type</InputLabel>
//             <Select
//               value={type}
//               onChange={(e) => {
//                 setType(e.target.value);
//                 setPage(1);
//                 updateURL(search, e.target.value, 1);
//               }}
//               label="Type"
//             >
//               <MenuItem value="">All Types</MenuItem>
//               <MenuItem value="email">Email</MenuItem>
//               <MenuItem value="name">Name</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>

//         {/* Users Table */}
//         <Paper elevation={3}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>
//                   <b>Full Name</b>
//                 </TableCell>
//                 <TableCell>
//                   <b>Email</b>
//                 </TableCell>
//                 <TableCell>
//                   <b>Phone</b>
//                 </TableCell>
//                 <TableCell>
//                   <b>CNIC</b>
//                 </TableCell>
//                 <TableCell>
//                   <b>Role</b>
//                 </TableCell>
//                 <TableCell>
//                   <b>Active</b>
//                 </TableCell>
//                 <TableCell>
//                   <b>Email Verified</b>
//                 </TableCell>
//                 <TableCell>
//                   <b>Last Login</b>
//                 </TableCell>
//                 <TableCell>
//                   <b>Password Changed</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>Edit</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>Delete</b>
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {users.map((user) => (
//                 <TableRow key={user.id} hover>
//                   <TableCell>
//                     {user.firstName} {user.lastName}
//                   </TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.phoneNumber || 'N/A'}</TableCell>
//                   <TableCell>{user.cnic || 'N/A'}</TableCell>
//                   <TableCell>{user.role?.name || 'N/A'}</TableCell>
//                   <TableCell>{user.isActive ? 'Yes' : 'No'}</TableCell>
//                   <TableCell>{user.isEmailVerified ? 'Yes' : 'No'}</TableCell>
//                   <TableCell>
//                     {user.lastLoginAt
//                       ? new Date(user.lastLoginAt).toLocaleString()
//                       : 'N/A'}
//                   </TableCell>
//                   <TableCell>
//                     {user.passwordChangedAt
//                       ? new Date(user.passwordChangedAt).toLocaleString()
//                       : 'N/A'}
//                   </TableCell>
//                   <TableCell align="center">
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       size="small"
//                       href={`/users/edit/${user.id}`}
//                     >
//                       Edit
//                     </Button>
//                   </TableCell>
//                   <TableCell align="center">
//                     <Button
//                       variant="outlined"
//                       color="error"
//                       size="small"
//                       onClick={() => handleDelete(user.id)}
//                     >
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Paper>

//         {/* Pagination */}
//         <Box display="flex" justifyContent="center" mt={4}>
//           <Pagination
//             count={totalPages}
//             page={page}
//             onChange={(_, newPage) => {
//               setPage(newPage);
//               updateURL(search, type, newPage);
//             }}
//             color="primary"
//             shape="rounded"
//           />
//         </Box>
//       </Box>
//     </Layout>
//   );
// }

'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
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
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Pagination,
} from '@mui/material';
import { getAllUsers, DeleteaUser } from '../../services/authServices';
import { User } from '../../types/user';
import Layout from '../../components/Layout';
import { useSearchParams, useRouter } from 'next/navigation';

export default function AllUsersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // State management
  const [localSearch, setLocalSearch] = useState(searchParams.get('search') || '');
  const [search, setSearch] = useState(localSearch);
  const [type, setType] = useState(searchParams.get('type') || '');
  const [page, setPage] = useState(Number(searchParams.get('page') || 1));
  const [limit] = useState(5);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false); // New loading state for search
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  // Focus management on initial render
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Debounce search updates with loading state
  useEffect(() => {
    setSearchLoading(true); // Show loading when search starts changing
    
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        setSearch(localSearch);
        setPage(1);
      }
      setSearchLoading(false); // Hide loading after debounce
    }, 500);

    return () => {
      clearTimeout(timer);
      setSearchLoading(false); // Cleanup
    };
  }, [localSearch]);

  // Update URL and fetch users when filters change
  const updateURL = useCallback((newSearch: string, newType: string, newPage: number) => {
    const params = new URLSearchParams();
    if (newSearch) params.set('search', newSearch);
    if (newType) params.set('type', newType);
    if (newPage > 1) params.set('page', newPage.toString());
    router.push(`/users?${params.toString()}`);
  }, [router]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const userData = await getAllUsers({ type, search, page, limit });
      setUsers(userData.data);
      setTotalPages(userData.totalPages || 1);
      updateURL(search, type, page);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, type, page]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      setLoading(true);
      await DeleteaUser(id);
      await fetchUsers();
    } catch (err: any) {
      alert(err.message || 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !searchLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
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
      <Box p={4} position="relative">
        {/* Loading overlay for search */}
        {searchLoading && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="rgba(255,255,255,0.7)"
            zIndex={1}
          >
            <CircularProgress />
          </Box>
        )}

        <Typography variant="h4" gutterBottom fontWeight="bold">
          All Users
        </Typography>

        <Box display="flex" justifyContent="flex-end" mb={3}>
          <Button
            variant="contained"
            color="success"
            href="/users/create"
            sx={{ fontWeight: 'bold', borderRadius: 2 }}
            disabled={loading || searchLoading}
          >
            Add User
          </Button>
        </Box>

        {/* Filter Section */}
        <Box display="flex" gap={2} mb={3} alignItems="center" position="relative">
          <TextField
            label="Search"
            variant="outlined"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            inputRef={searchInputRef}
            fullWidth
            disabled={loading}
            InputProps={{
              endAdornment: searchLoading ? (
                <CircularProgress size={20} />
              ) : null,
            }}
          />

          <FormControl variant="outlined" sx={{ minWidth: 150 }} disabled={loading}>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setPage(1);
              }}
              label="Type"
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="name">Name</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Users Table */}
        <Paper elevation={3} sx={{ position: 'relative', minHeight: 300 }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
              <CircularProgress size={60} />
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Full Name</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>Phone</b></TableCell>
                  <TableCell><b>CNIC</b></TableCell>
                  <TableCell><b>Role</b></TableCell>
                  <TableCell><b>Active</b></TableCell>
                  <TableCell><b>Email Verified</b></TableCell>
                  <TableCell><b>Last Login</b></TableCell>
                  <TableCell><b>Password Changed</b></TableCell>
                  <TableCell align="center"><b>Edit</b></TableCell>
                  <TableCell align="center"><b>Delete</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phoneNumber || 'N/A'}</TableCell>
                    <TableCell>{user.cnic || 'N/A'}</TableCell>
                    <TableCell>{user.role?.name || 'N/A'}</TableCell>
                    <TableCell>{user.isActive ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{user.isEmailVerified ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {user.passwordChangedAt ? new Date(user.passwordChangedAt).toLocaleString() : 'N/A'}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        href={`/users/edit/${user.id}`}
                        disabled={loading || searchLoading}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(user.id)}
                        disabled={loading || searchLoading}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>

        {/* Pagination */}
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, newPage) => setPage(newPage)}
            color="primary"
            shape="rounded"
            disabled={loading || searchLoading}
          />
        </Box>
      </Box>
    </Layout>
  );
}