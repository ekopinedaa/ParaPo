import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AdminDashboard = () => {
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

  return (
    <div className="p-8 items-center justify-center w-screen ">
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
    </div>
  );
};

export default AdminDashboard;
