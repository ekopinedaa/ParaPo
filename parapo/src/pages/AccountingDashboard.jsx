import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import AccountingSidebar from "../components/AccountingSidebar";
import SearchIcon from "@mui/icons-material/Search";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import axios from "axios"; // Import Axios
import { DataGrid } from "@mui/x-data-grid";
import { SERVER_IP } from "../../config";

const columns = [
  { field: "transactionsid", headerName: "Transaction ID", width: 250 },
  { field: "fromid", headerName: "From ID", width: 130 },
  { field: "toid", headerName: "To ID", width: 150 },
  { field: "fromaccno", headerName: "Booker Account No", width: 200 },
  { field: "toaccno", headerName: "Transferred Account No", width: 230 },
  { field: "amount", headerName: "Amount", width: 230 },
];

const AccountingDashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [newAmount, setNewAmount] = useState("");
  const [extraCharge, setExtraCharge] = useState("");
  const [XtraChargeStorage, setXtraChargeStorage] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchExtraCharge();
    const storedExtraCharge = localStorage.getItem("extraCharge");
    setXtraChargeStorage(storedExtraCharge);
    fetchTransactions();
  }, []);

  const handleModalOpen = () => {
    setOpenModal(true);
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
      } else {
        console.error("Failed to update extra charge:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating extra charge:", error);
    } finally {
      setOpenModal(false);
    }
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
      const response = await axios.get(`http://${SERVER_IP}:3004/api/getAllTransactions`);
      if (response.data.success) {
        setTransactions(response.data.data);
      } else {
        console.error("Failed to fetch transactions:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };


  const users = [
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

  return (
    <div className="flex">
      <AccountingSidebar />
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
          <div className="w-[30rem] ml-auto flex items-center">
            <TextField
              label="Search Transactions"
              variant="outlined"
              fullWidth
            />
            <SearchIcon
              sx={{ fontSize: 45, marginLeft: ".5rem", marginTop: ".25rem" }}
            />
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
      </div>
    </div>
  );
};

export default AccountingDashboard;
