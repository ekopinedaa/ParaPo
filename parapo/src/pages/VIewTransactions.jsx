import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";
import AdminSidebar from "../components/AdminSidebar";
import SearchIcon from '@mui/icons-material/Search';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { SERVER_IP } from '../../config';


const VIewTransactions = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const usersData = [
    {
      userId: 1,
      firstName: "John",
      lastName: "Doe",
      accountNo: "123456789",
      amount: "200",
      TransactionType: "withdraw",
    },
    {
      userId: 2,
      firstName: "Jake",
      lastName: "Dawson",
      accountNo: "987654321",
      amount: "100",
      TransactionType: "transfer",
    },
    // Add more user data as needed
  ];

  const itemsPerPage = 5; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination logic
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = usersData.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex">
      <AdminSidebar />
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
          <div className="w-[15rem] ml-auto flex">
            <TextField
              label="Search Transactions"
              variant="outlined"
              fullWidth
            />
            <SearchIcon sx={{ fontSize: 45, marginLeft: '.5rem', marginTop: '.25rem' }} />
          </div>
        </div>
        <Paper elevation={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>User ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>First Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Last Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Account No</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Transaction Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersData.map((user) => (
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
        {/* Pagination controls */}
        <div className="mt-4 flex justify-center">
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outlined"
            color="primary"
          >
            Previous
          </Button>
          <span className="ml-4 mr-4">
            Page {currentPage} of {Math.ceil(usersData.length / itemsPerPage)}
          </span>
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastUser >= usersData.length}
            variant="outlined"
            color="primary"
            className="ml-4"
          >
            Next
          </Button>
        </div>

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

export default VIewTransactions;
