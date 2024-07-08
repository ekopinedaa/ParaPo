import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AccountingSidebar from '../components/AccountingSidebar';
import SearchIcon from '@mui/icons-material/Search';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

const AccountingDashboard = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const users = [
    {
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      accountNo: '123456789',
      amount: '200',
      TransactionType: 'withdraw',
    },
    {
      userId: 2,
      firstName: 'Jake',
      lastName: 'Dawson',
      accountNo: '987654321',
      amount: '100',
      TransactionType: 'transfer',
    },
    // Add more user data as needed
  ];

  return (
    <div className="flex">
      <AccountingSidebar />
      <div className="items-center justify-center w-[105rem] p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">TRANSACTIONS</h2>
          <h2 className="text-2xl font-bold ml-[20rem]">Amount for charges: P20</h2>
          <button
              onClick={handleModalOpen}
              className={`w-[5rem] h-[2.35rem] p-[.5rem] ml-8 rounded-md flex items-center gap-[.5rem] duration-300 ease hover:bg-customYellow hover:text-customLightBlue border-black justify-center`}
            >
              <ModeEditOutlineIcon />
            </button>
          <div className="w-[30rem] ml-auto flex items-center">
            <TextField
              label="Search Transactions"
              variant="outlined"
              fullWidth
            />
            <SearchIcon
              sx={{ fontSize: 45, marginLeft: '.5rem', marginTop: '.25rem' }}
            />

          </div>
        </div>
        <Paper elevation={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>User ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>First Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Last Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Account No</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    Transaction Type
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.accountNo}</TableCell>
                    <TableCell>{user.amount}</TableCell>
                    <TableCell>{user.TransactionType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Dialog open={openModal} onClose={handleModalClose}>
          <DialogTitle>Edit Charges</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="New Amount"
              variant="outlined"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default AccountingDashboard;
