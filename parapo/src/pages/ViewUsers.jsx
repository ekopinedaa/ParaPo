import React, { useState, useEffect } from "react";
import {
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import AdminSidebar from "../components/AdminSidebar";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios"; // Import Axios
import { DataGrid } from "@mui/x-data-grid";
import { SERVER_IP } from '../../config';


const columns = [
  { field: "userid", headerName: "User ID", width: 130 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "password", headerName: "Password", width: 150 },
  { field: "firstname", headerName: "First Name", width: 150 },
  { field: "lastname", headerName: "Last Name", width: 150 },
  { field: "contactno", headerName: "Contact No", width: 150 },
  { field: "accountno", headerName: "Account No", width: 150 },
  { field: "usertype", headerName: "User Type", width: 130 },
  { field: "vehicletype", headerName: "User Type", width: 130 },
];

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://${SERVER_IP}:3004/api/getAllUsers`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const response = await axios.get(`http://${SERVER_IP}:3004/api/getUserById/${searchInput}`);
      setSearchedUser(response.data);
      setOpenSearchModal(true);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="items-center justify-center w-[105rem] p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">USERS</h2>
          <div className="w-[21.5rem] ml-auto flex items-center">
            <TextField
              label="Search Users"
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
              rows={users}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 15]}
              getRowId={(row) => row.userid}
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
        <Dialog
          open={openSearchModal}
          onClose={() => setOpenSearchModal(false)}
          aria-labelledby="user-dialog-title"
        >
          <DialogTitle id="user-dialog-title" sx={{height: "7rem", width: "30rem"}}><p className="text-3xl font-bold">User Details</p></DialogTitle>
          <DialogContent>
            {searchedUser ? (
              <div className="text-[1.3rem]">
                <p><strong>User ID:</strong> {searchedUser.userid}</p>
                <p><strong>Username:</strong> {searchedUser.username}</p>
                <p><strong>Password:</strong> {searchedUser.password}</p>
                <p><strong>First Name:</strong> {searchedUser.firstname}</p>
                <p><strong>Last Name:</strong> {searchedUser.lastname}</p>
                <p><strong>Contact No:</strong> {searchedUser.contactno}</p>
                <p><strong>Account No:</strong> {searchedUser.accountno}</p>
                <p><strong>User Type:</strong> {searchedUser.usertype}</p>
              </div>
            ) : (
              <p>No user details available.</p>
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
            User details fetched successfully!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default ViewUsers;
