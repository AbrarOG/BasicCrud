// 'use client';

// import ProtectedRoute from "@/components/ProtectedRoutes";
// import Link from "next/link";
// import {
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   Divider,
// } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

// export default function HomePage() {
//   return (
//     <ProtectedRoute>
//       <Box sx={{ display: 'flex' }}>
//         {/* Sidebar */}
//         <Drawer
//           variant="permanent"
//           sx={{
//             width: 250,
//             flexShrink: 0,
//             [`& .MuiDrawer-paper`]: {
//               width: 250,
//               boxSizing: 'border-box',
//               backgroundColor: '#f5f5f5',
//             },
//           }}
//         >
//           <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
//             <AdminPanelSettingsIcon color="primary" />
//             <Typography variant="h6">Admin Panel</Typography>
//           </Box>

//           <Divider />

//           {/* Users Section */}
//           <List>
//             <Typography sx={{ pl: 2, pt: 1 }} variant="subtitle2">
//               Users
//             </Typography>
//             <ListItem component={Link} href="/users">
//               <ListItemIcon><VisibilityIcon /></ListItemIcon>
//               <ListItemText primary="View All Users" />
//             </ListItem>
//           </List>

//           <Divider />

//           {/* Roles Section */}
//           <List>
//             <Typography sx={{ pl: 2, pt: 1 }} variant="subtitle2">
//               Roles
//             </Typography>
//             <ListItem component={Link} href="/roles">
//               <ListItemIcon><VisibilityIcon /></ListItemIcon>
//               <ListItemText primary="View All Roles" />
//             </ListItem>
//           </List>




//           <Divider />


//           <List>
//             <Typography sx={{ pl: 2, pt: 1 }} variant="subtitle2">
//               books
//             </Typography>
//             <ListItem component={Link} href="/books">
//               <ListItemIcon><VisibilityIcon /></ListItemIcon>
//               <ListItemText primary="View All Books" />
//             </ListItem>
//           </List>

//           <Divider />

//           <List>
//             <Typography sx={{ pl: 2, pt: 1 }} variant="subtitle2">
//               Permissions
//             </Typography>
//             <ListItem component={Link} href="/permission">
//               <ListItemIcon><VisibilityIcon /></ListItemIcon>
//               <ListItemText primary="View All Permission" />
//             </ListItem>
//           </List>



//           <Divider />

//           <List>
//             <Typography sx={{ pl: 2, pt: 1 }} variant="subtitle2">
//               Assign Permissions
//             </Typography>
//             <ListItem component={Link} href=" /roles/assign-permission">
//               <ListItemIcon><VisibilityIcon /></ListItemIcon>
//               <ListItemText primary="Assign Permission to Role" />
//             </ListItem>
//           </List>

//         </Drawer>





//         {/* Main Content */}
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Typography variant="h4" gutterBottom>
//             Welcome to the Home Page
//           </Typography>
//           <Typography>
//             You have successfully logged in. Use the sidebar to manage users and roles.
//           </Typography>
//         </Box>
//       </Box>
//     </ProtectedRoute>
//   );
// }






'use client';

import Layout from '@/components/Layout';
import { Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Welcome to Home Page
      </Typography>
      <Typography>
        You have successfully logged in. Use the sidebar to manage users, roles, books, and permissions.
      </Typography>
    </Layout>
  );
}

