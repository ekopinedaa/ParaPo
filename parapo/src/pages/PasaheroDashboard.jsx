import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Close as CloseIcon, LocalSeeTwoTone } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import backgroundImage from "../rsc/Pasaherobgimage.png";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import NearMeIcon from "@mui/icons-material/NearMe";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import PaymentIcon from "@mui/icons-material/Payment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const PasaheroDashboard = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userid, setUserid] = useState();
  const [username, setUsername] = useState();
  const [accountno, setAccountno] = useState();
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Success Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Success Snackbar message
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false); // State for Error Snackbar
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState(""); // Error Snackbar message
  const [rideRequests, setRideRequests] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedAccountno = localStorage.getItem("accountno");
    const storedUserId = localStorage.getItem("userid");
    setUsername(storedUsername);
    setAccountno(storedAccountno);
    setUserid(storedUserId);

    fetchRideRequests();
  }, []);

  const fetchRideRequests = async () => {
    try {
      const response = await axios.get("http://localhost:3004/api/GetRideRequest");
      console.log("API Response:", response.data);
  
      let requestsData = response.data;
  
      // Check if the data is not an array
      if (!Array.isArray(requestsData)) {
        // If it's an object with a data property that's an array, use that
        if (requestsData.data && Array.isArray(requestsData.data)) {
          requestsData = requestsData.data;
        } else {
          // If it's neither an array nor an object with a data array, log an error and set an empty array
          console.error("Unexpected data format:", requestsData);
          setRideRequests([]);
          return;
        }
      }
  
      // Map the data to ensure it matches the DataGrid requirements
      const formattedRequests = requestsData.map(request => ({
        id: request.ridereqid, // DataGrid requires a unique 'id' field
        riderid: request.riderid,
        bookerid: request.bookerid,
        origin: request.origin,
        destination: request.destination,
        time: request.time,
        rideprice: request.rideprice,
        confirmation: request.rideconfirmation // Note: changed from 'rideconfirmation' to match your columns
      }));
  
      setRideRequests(formattedRequests);
    } catch (error) {
      console.error("Error fetching ride requests:", error);
      setRideRequests([]);
    }
  };

  const [rideHistory, setRideHistory] = useState([
    {
      id: 1,
      time: "08:00 AM",
      destination: "Airport",
      rider: "John Doe",
      total: "$20",
      vehicle: "Car",
    },
    {
      id: 2,
      time: "10:30 AM",
      destination: "Shopping Mall",
      rider: "Jane Smith",
      total: "$15",
      vehicle: "Motorcycle",
    },
    // Add more ride history data as needed
  ]);

  const columns = [
    { field: "ridereqid", headerName: "ID", width: 90 },
    { field: "bookerid", headerName: "User ID", width: 90},
    { field: "riderid", headerName: "Rider ID", width: 90},
    { field: "origin", headerName: "Location", width: 150 },
    { field: "destination", headerName: "Destination", width: 150 },
    { field: "time", headerName: "Time", width: 150 },
    { field: "rideprice", headerName: "Total", width: 150 },
    { field: "confirmation", headerName: "Confirmation", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePayRide(params.row)}
          disabled={params.row.confirmation !== "accepted"}
        >
          Pay
        </Button>
      ),
    },
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
        <ListItem button onClick={() => navigate("/UpdateAccount")}>
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

  const handleRequestRide = async () => {
    // Check if any of the required fields are empty
    if (!location || !destination ) {
      setErrorSnackbarMessage(
        "Please fill out all fields before requesting a ride."
      );
      setErrorSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3004/api/AddRideRequest",
        {
          bookerid: userid, // Replace with actual booker ID
          riderid: 0,
          origin: location,
          destination: destination,
          time: new Date().toLocaleTimeString(), // Add actual time
          rideprice: "",
          rideconfirmation: "pending", // Default status
        }
      );

      // Update ride history state with new ride
      setRideHistory([...rideHistory, response.data.data]);

      setSnackbarMessage(
        "Your request has been made. Please wait for a rider to confirm."
      );
      setSnackbarOpen(true);

      setLocation("");
      setDestination("");
      setAmount("");
      fetchRideRequests()
    } catch (error) {
      console.error("Error creating ride request:", error.message);
    }
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const closeErrorSnackbar = () => {
    setErrorSnackbarOpen(false);
  };

  return (
    <div className="w-screen">
      <div className="bg-customBlue top-0 w-full h-[7rem] flex items-center text-customWhite">
        <div className="p-8 justify-start">
          <h1 className="text-roboto text-2xl font-bold flex">
            Welcome {username}! Care to Book a Ride?
          </h1>
        </div>
        <div className="p-8 absolute right-0 items-center">
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon className="text-customWhite" />
          </IconButton>
        </div>
      </div>

      <div
      // className="flex items-center bg-[#FF0CE] w-screen font-roboto"
      // style={{
      //   backgroundImage: `url(${backgroundImage})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
      >
        <div className=" h-full w-full flex flex-row justify-center">
          <div className="h-[50rem] flex items-center">
            <Box
              sx={{
                height: "35rem",
                width: "30rem",
                bgcolor: "rgba(255, 255, 255, 0.5)",
                p: 4,
                borderRadius: 2,
                boxShadow: 3,
                mt: "1.5rem",
                mr: ".5rem",
              }}
            >
              <h1 className="text-left font-bold text-5xl mb-[.5rem] text-Black">
                Request a Ride
              </h1>
              <p className="text-left mt-[1 rem] text-xl mb-[2rem]">
                Request a ride, hop in, and Go!
              </p>

              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <ExpandCircleDownIcon
                  sx={{ color: "black", mr: 1, my: 0.5, fontSize: "2.9rem" }}
                />
                <TextField
                  fullWidth
                  label="Location"
                  variant="filled"
                  placeholder="Where you at?"
                  className="mb-4 mt-[10rem]"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 1,
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <UnfoldMoreIcon
                  sx={{ color: "black", mr: 1, my: 0.5, fontSize: "2.9rem" }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <NearMeIcon
                  sx={{ color: "black", mr: 1, my: 0.5, fontSize: "2.9rem" }}
                />
                <TextField
                  fullWidth
                  label="Destination"
                  variant="filled"
                  className="mb-4 mt-[10rem]"
                  placeholder="Where you goin?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 1,
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PaymentIcon
                  sx={{ color: "black", mr: 1, my: 0.5, fontSize: "2.9rem" }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: "1.2rem",
                }}
              >
                <button
                  onClick={handleRequestRide}
                  variant="contained"
                  className="bg-customLightBlue text-customWhite h-[3rem] w-[8rem] text-2xl"
                >
                  Request!
                </button>
              </Box>
            </Box>

            <Box
              sx={{
                height: "35rem",
                width: "80rem",
                bgcolor: "rgba(255, 255, 255, 0.5)",
                p: 4,
                borderRadius: 2,
                boxShadow: 3,
                mt: "1.5rem",
                ml: ".5rem",
              }}
              className=""
            >
              <div className="flex flex-column align-center">
                <h1 className="text-left font-bold text-5xl mb-[.5rem] text-Black">
                  Requests
                </h1>
                <h1 className="text-left font-bold text-3xl text-Black ml-[3rem] mt-[.4rem]">
                  Your Acc Number is: {accountno}
                </h1>
              </div>
              <p className="text-left mt-[.5rem] text-xl">
                Your Ride Requests are listed here
              </p>
              <div className="h-[23.2rem] w-full mt-[1rem]">
                <DataGrid
                  rows={rideRequests}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                />
              </div>
            </Box>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Ride History</h3>
          <Paper elevation={3}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Destination</TableCell>
                    <TableCell>Rider</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Vehicle</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rideHistory.map((ride) => (
                    <TableRow key={ride.id}>
                      <TableCell>{ride.time}</TableCell>
                      <TableCell>{ride.destination}</TableCell>
                      <TableCell>{ride.rider}</TableCell>
                      <TableCell>{ride.total}</TableCell>
                      <TableCell>{ride.vehicle}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>

      {/* Success Snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorSnackbarOpen}
        autoHideDuration={3000}
        onClose={closeErrorSnackbar}
      >
        <Alert
          onClose={closeErrorSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorSnackbarMessage}
        </Alert>
      </Snackbar>

      {/* Drawer */}
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </div>
  );
};

export default PasaheroDashboard;
