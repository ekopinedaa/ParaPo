import React, { useState, useEffect } from "react";
import {
  TextField,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
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
  { field: "rideid", headerName: "Ride ID", width: 150 },
  { field: "bookerid", headerName: "Booker ID", width: 130 },
  { field: "riderid", headerName: "Rider ID", width: 180 },
  { field: "origin", headerName: "Origin", width: 200 },
  { field: "destination", headerName: "Destination", width: 230 },
  { field: "time", headerName: "Time", width: 130 },
  { field: "ridetotal", headerName: "Ride Total", width: 130 },
];

const ViewRides = () => {
  const [rides, setRides] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedRide, setSearchedRide] = useState({
    rideid: '',
    bookerid: '',
    riderid: '',
    origin: '',
    destination: '',
    time: '',
    ridetotal: ''
  });
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchRides();
  }, []);

  useEffect(() => {
    console.log("searchedRide state updated:", searchedRide);
  }, [searchedRide]);

  const fetchRides = async () => {
    try {
      const response = await axios.get(
        `http://${SERVER_IP}:3004/api/GetAllRides`
      );
      console.log(response);
      if (response.data.success) {
        setRides(response.data.data);
      } else {
        console.error("Failed to fetch Ride Requests: ", response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = async () => {
    try {
      console.log("Searching for ride with ID:", searchQuery);
      const response = await axios.get(
        `http://${SERVER_IP}:3004/api/getRidebyID/${searchQuery}`
      );
      console.log("API Response:", response.data);

      await createAuditLog({
        userid: localStorage.getItem("userid"),
        username: localStorage.getItem("username"),
        userrole: localStorage.getItem("usertype"),
        action: `Ride Searched ID: ${searchQuery}`,
      });

      // Ensure we're setting the state with the correct data structure
      const rideData = response.data.data || response.data;
      setSearchedRide(rideData);
      console.log("Updated searchedRide state:", rideData);
      setOpenSearchModal(true);
    } catch (error) {
      console.error("Error fetching ride:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchedRide((prevRide) => ({
      ...prevRide,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        `http://${SERVER_IP}:3004/api/UpdateRide/${searchQuery}`,
        searchedRide
      );
      console.log(response.data);

      await createAuditLog({
        userid: localStorage.getItem("userid"),
        username: localStorage.getItem("username"),
        userrole: localStorage.getItem("usertype"),
        action: `Ride Updated ID: ${searchedRide.rideid}`,
      });

      setSnackbarOpen(true);
      setOpenSearchModal(false);
      fetchRides(); // Refresh ride list
    } catch (error) {
      console.error("Error updating ride:", error);
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
          <h2 className="text-2xl font-bold">RIDES</h2>
          <div className="w-[15rem] ml-auto flex">
            <TextField
              label="Search Rides"
              variant="outlined"
              fullWidth
              value={searchQuery}
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
              rows={rides}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 15]}
              getRowId={(row) => row.rideid}
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
            key={searchedRide ? searchedRide.rideid : 'empty'}
            open={openSearchModal}
            onClose={() => setOpenSearchModal(false)}
            aria-labelledby="ride-dialog-title"
        >
          <DialogTitle
            id="ride-dialog-title"
            sx={{ height: "7rem", width: "30rem" }}
          >
            <p className="text-3xl font-bold">Ride Details</p>
          </DialogTitle>
          <DialogContent>
            {console.log("Rendering DialogContent, searchedRide:", searchedRide)}
            {searchedRide ? (
              <div className="text-[1.3rem]">
                {console.log("Rendering TextFields")}
                <TextField
                  label="Ride ID"
                  name="rideid"
                  value={searchedRide.rideid ?? ''}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Booker ID"
                  name="bookerid"
                  value={searchedRide.bookerid ?? ''}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Rider ID"
                  name="riderid"
                  value={searchedRide.riderid ?? ''}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Origin"
                  name="origin"
                  value={searchedRide.origin ?? ''}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Destination"
                  name="destination"
                  value={searchedRide.destination ?? ''}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Time"
                  name="time"
                  value={searchedRide.time ?? ''}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Ride Total"
                  name="ridetotal"
                  value={searchedRide.ridetotal ?? ''}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
            ) : (
              <p>No ride details available.</p>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSaveClick}
              color="primary"
              variant="contained"
            >
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
            Ride details updated successfully!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default ViewRides;
