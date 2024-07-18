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
import createAuditLog from "../utils/Auditlogger";
import { DataGrid } from "@mui/x-data-grid";
import { SERVER_IP } from "../../config";

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
      const response = await axios.get(
        `http://${SERVER_IP}:3004/api/getAllUsers`
      );
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
      const response = await axios.get(
        `http://${SERVER_IP}:3004/api/getUserById/${searchInput}`
      );
      console.log(response)

      await createAuditLog({
        userid: localStorage.getItem("userid"),
        username: localStorage.getItem("username"),
        userrole: localStorage.getItem("usertype"),
        action: `User Searched ID: ${searchInput}`,
      });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        `http://${SERVER_IP}:3004/api/UpdateUser/${searchedUser.userid}`,
        searchedUser
      );
      console.log(response.data);

      await createAuditLog({
        userid: localStorage.getItem("userid"),
        username: localStorage.getItem("username"),
        userrole: localStorage.getItem("usertype"),
        action: `User Updated ID: ${searchedUser.userid}`,
      });

      setSnackbarOpen(true);
      setOpenSearchModal(false);
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error("Error updating user:", error);
    }
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
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f5f5f5",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",
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
          <DialogTitle
            id="user-dialog-title"
            sx={{ height: "7rem", width: "30rem" }}
          >
            <p className="text-3xl font-bold">User Details</p>
          </DialogTitle>
          <DialogContent>
            {searchedUser ? (
              <div className="text-[1.3rem]">
                <TextField
                  label="User ID"
                  name="userid"
                  value={searchedUser.userid}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Username"
                  name="username"
                  value={searchedUser.username}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Password"
                  name="password"
                  value={searchedUser.password}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="First Name"
                  name="firstname"
                  value={searchedUser.firstname}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Last Name"
                  name="lastname"
                  value={searchedUser.lastname}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Contact No"
                  name="contactno"
                  value={searchedUser.contactno}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Account No"
                  name="accountno"
                  value={searchedUser.accountno}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="User Type"
                  name="usertype"
                  value={searchedUser.usertype}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </div>
            ) : (
              <p>No user details available.</p>
            )}
          </DialogContent>
          <DialogActions>
          <Button onClick={handleSaveClick} color="primary" variant="contained">
              Save
            </Button>
            <Button onClick={() => setOpenSearchModal(false)} color="secondary">
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
