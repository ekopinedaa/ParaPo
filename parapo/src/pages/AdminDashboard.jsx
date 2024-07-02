import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Drawer,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);

  // Sample user data (replace with actual data from API or state)
  const users = [
    {
      userId: 1,
      username: 'user1',
      password: 'password1',
      firstName: 'John',
      lastName: 'Doe',
      contactNo: '123-456-7890',
      accountNo: '123456789',
      userType: 'rider'
    },
    {
      userId: 2,
      username: 'user2',
      password: 'password2',
      firstName: 'Jane',
      lastName: 'Smith',
      contactNo: '987-654-3210',
      accountNo: '987654321',
      userType: 'pasahero'
    }
    // Add more user data as needed
  ];

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };


  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <ListItemText primary="Update Profile" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => navigate("/")}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );


  return (
    <div className="items-center justify-center w-screen ">
      <div className="bg-customBlue fixed top-0 w-full h-[7rem] flex items-center text-customWhite">
        <div className="p-8 justify-start">
          <h1 className="text-roboto text-2xl font-bold flex">
           Welcome! Care to Book a Ride?
          </h1>
        </div>
        <div className="p-8 absolute right-0 items-center">
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon className="text-customWhite" />
          </IconButton>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Contact No</TableCell>
                <TableCell>Account No</TableCell>
                <TableCell>User Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.contactNo}</TableCell>
                  <TableCell>{user.accountNo}</TableCell>
                  <TableCell>{user.userType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </div>
  );
};

export default AdminDashboard;
