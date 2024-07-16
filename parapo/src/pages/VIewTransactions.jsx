import React, { useState, useEffect } from "react";
import {
  TextField,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import AdminSidebar from "../components/AdminSidebar";
import SearchIcon from "@mui/icons-material/Search";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import axios from "axios"; // Import Axios
import { DataGrid } from "@mui/x-data-grid";
import { SERVER_IP } from "../../config";

const columns = [
  { field: "transactionsid", headerName: "Transaction ID", width: 250 },
  { field: "fromid", headerName: "From ID", width: 130 },
  { field: "toid", headerName: "To ID", width: 300 },
  { field: "fromaccno", headerName: "Booker Account No", width: 200 },
  { field: "toaccno", headerName: "Transferred Account No", width: 450 },
  { field: "amount", headerName: "Amount", width: 130 },
];

const VIewTransactions = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [newAmount, setNewAmount] = useState("");
  const [XtraChargeStorage, setXtraChargeStorage] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // New state for search input
  const [searchedTransaction, setSearchedTransaction] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchExtraCharge();
    const storedExtraCharge = localStorage.getItem("extraCharge");
    setXtraChargeStorage(storedExtraCharge);
    fetchTransactions();
  }, []);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalSearchOpen = () => {
    setOpenSearchModal(true);
  };

  const handleModalClose = async () => {
    try {
      const response = await axios.put(
        `http://${SERVER_IP}:3004/api/updateExtraCharge/1`,
        { ECID: 1, amount: newAmount }
      );

      if (response.data.success) {
        console.log("Extra charge updated successfully:", response.data.data);
        localStorage.setItem("extraCharge", newAmount);
        setXtraChargeStorage(newAmount);
        setSnackbarOpen(true);
      } else {
        console.error("Failed to update extra charge:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating extra charge:", error);
    } finally {
      setOpenModal(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const fetchExtraCharge = async () => {
    try {
      const response = await fetch(`http://${SERVER_IP}:3004/api/getECID/1`);
      const result = await response.json();

      if (result.success) {
        const extraCharge = result.data.amount;
        localStorage.setItem("extraCharge", extraCharge);
        console.log("Extra charge stored in local storage:", extraCharge);
      } else {
        console.error("Failed to fetch extra charge:", result.message);
      }
    } catch (error) {
      console.error("Error fetching extra charge:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://${SERVER_IP}:3004/api/getAllTransactions`
      );
      if (response.data.success) {
        setTransactions(response.data.data);
      } else {
        console.error("Failed to fetch transactions:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const response = await axios.get(
        `http://${SERVER_IP}:3004/api/getTransactionById/${searchInput}`
      );
      if (response.data.success) {
        setSearchedTransaction(response.data.data);
        setOpenSearchModal(true);
      } else {
        console.error("Failed to fetch transaction:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
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
          <h2 className="text-2xl font-bold ml-[20rem]">
            Amount for charges: P{XtraChargeStorage}
          </h2>
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
              value={searchInput}
              onChange={handleSearchChange}
            />
            <button
              onClick={handleSearchClick}
              className="ml-[.5rem] rounded-md flex items-center gap-[.5rem] hover:bg-customYellow hover:text-customLightBlue border-gray-400 justify-center"
            >
              <SearchIcon sx={{ fontSize: 45 }} />
            </button>
          </div>
        </div>
        <Paper elevation={3}>
        <div className="h-631 w-full">
            <DataGrid
              rows={transactions}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 15]}
              getRowId={(row) => row.transactionsid}
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f5f5f5',
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontWeight: 'bold',
                },
              }}
            />
          </div>
        </Paper>
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle>Edit Charges</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="New Amount"
              variant="outlined"
              fullWidth
              value={newAmount} // Link value to the newAmount state
              onChange={(e) => setNewAmount(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openSearchModal}
          onClose={() => setOpenSearchModal(false)}
          aria-labelledby="transaction-dialog-title"
        >
          <DialogTitle id="transaction-dialog-title">Transaction Details</DialogTitle>
          <DialogContent>
            {searchedTransaction ? (
              <div>
                <p><strong>Transaction ID:</strong> {searchedTransaction.transactionsid}</p>
                <p><strong>From ID:</strong> {searchedTransaction.fromid}</p>
                <p><strong>To ID:</strong> {searchedTransaction.toid}</p>
                <p><strong>Booker Account No:</strong> {searchedTransaction.fromaccno}</p>
                <p><strong>Transferred Account No:</strong> {searchedTransaction.toaccno}</p>
                <p><strong>Amount:</strong> {searchedTransaction.amount}</p>
              </div>
            ) : (
              <p>No transaction details available.</p>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenSearchModal(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Extra charge updated successfully!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default VIewTransactions;
