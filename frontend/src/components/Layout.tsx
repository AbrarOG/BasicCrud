'use client';

import Link from 'next/link';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ProtectedRoute from '@/components/ProtectedRoutes';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token'); // remove your token key
    router.push('/users/login'); // redirect to login page or home
  };

  return (
    <ProtectedRoute>
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 240,
              boxSizing: 'border-box',
              backgroundColor: '#f9f9f9',
              borderRight: '1px solid #ddd',
              paddingTop: 2,
            },
          }}
        >
          {/* Header */}
          <Box
            sx={{ px: 2, pb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <AdminPanelSettingsIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>
              Admin Panel
            </Typography>
          </Box>

          <Divider />

          {/* Users Section */}
          <List>
            <Typography
              sx={{ pl: 2, pt: 2, pb: 1 }}
              variant="subtitle2"
              color="text.secondary"
            >
              Users
            </Typography>
            <ListItemButton component={Link} href="/users">
              <ListItemText primary="All Users" />
            </ListItemButton>
          </List>

          <Divider />

          {/* Roles Section */}
          <List>
            <Typography
              sx={{ pl: 2, pt: 2, pb: 1 }}
              variant="subtitle2"
              color="text.secondary"
            >
              Roles
            </Typography>
            <ListItemButton component={Link} href="/roles">
              <ListItemText primary="All Roles" />
            </ListItemButton>
            <ListItemButton component={Link} href="/roles/assign-permission">
              <ListItemText primary="Assign Permissions" />
            </ListItemButton>
          </List>

          <Divider />

          {/* Books Section */}
          <List>
            <Typography
              sx={{ pl: 2, pt: 2, pb: 1 }}
              variant="subtitle2"
              color="text.secondary"
            >
              Books
            </Typography>
            <ListItemButton component={Link} href="/books">
              <ListItemText primary="All Books" />
            </ListItemButton>
          </List>

          <Divider />

          {/* Permissions Section */}
          <List>
            <Typography
              sx={{ pl: 2, pt: 2, pb: 1 }}
              variant="subtitle2"
              color="text.secondary"
            >
              Permissions
            </Typography>
            <ListItemButton component={Link} href="/permission">
              <ListItemText primary="All Permissions" />
            </ListItemButton>
          </List>
          <List>
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary="Log Out" />
            </ListItemButton>
          </List>
        </Drawer>

        {/* Main Page Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
