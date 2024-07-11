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
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Close as CloseIcon, LocalSeeTwoTone } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import backgroundImage from "../rsc/Pasaherobgimage.png";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import NearMeIcon from '@mui/icons-material/NearMe';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import PaymentIcon from '@mui/icons-material/Payment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

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
    setUserid(storedUserId)

    fetchRideRequests();
  }, []);

  const fetchRideRequests = async () => {
    try {
      const response = await axios.get("http://192.168.10.37:3004/api/GetRideRequest");
      console.log(response) // Replace with your actual endpoint

      const rideRequestsArray = response.data;

      // Map response data to match the expected structure
      const mappedRequests = rideRequestsArray.map((request, index) => ({
        id: index + 1,
        location: request.origin, // Adjust field names as needed
        destination: request.destination,
        time: request.time,
        total: request.rideprice,
        confirmation: request.rideconfirmation
      }));
  
      setRideRequests(mappedRequests);
    } catch (error) {
      console.error("Error fetching ride requests:", error.message);
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
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'destination', headerName: 'Destination', width: 150 },
    { field: 'time', headerName: 'Time', width: 150 },
    { field: 'total', headerName: 'Total', width: 150 },
    { field: 'confirmation', headerName: 'Confirmation', width: 150 },
  ];
  
  const rows = [
    { id: 1, location: 'Snow', destination: 'Jon', time: "now", total: 200, confirmation: "pending"},
    { id: 2, location: 'Lannister', destination: 'Cersei', time: "now", total: 200, confirmation: "pending"},
    { id: 3, location: 'Lannister', destination: 'Jaime', time: "now", total: 200, confirmation: "pending"},
    { id: 4, location: 'Stark', destination: 'Arya', time: "now", total: 200, confirmation: "pending"},
    { id: 5, location: 'Targaryen', destination: 'Daenerys', time: "now", total: 200, confirmation: "pending"},
    { id: 6, location: 'Melisandre', destination: "jan", time: "now", total: 200, confirmation: "pending"},
    { id: 7, location: 'Clifford', destination: 'Ferrara', time: "now", total: 200, confirmation: "pending"},
    { id: 8, location: 'Frances', destination: 'Rossini', time: "now", total: 200, confirmation: "pending"},
    { id: 9, location: 'Roxie', destination: 'Harvey', time: "now", total: 200, confirmation: "pending"},
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
    if (!location || !destination || !amount) {
      setErrorSnackbarMessage("Please fill out all fields before requesting a ride.");
      setErrorSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post("http://192.168.10.37:3004/api/AddRideRequest", {
        bookerid: userid, // Replace with actual booker ID
        riderid: 0,
        origin: location,
        destination: destination,
        time: new Date().toLocaleTimeString(), // Add actual time
        rideprice: amount,
        rideconfirmation: "pending", // Default status
      });

      // Update ride history state with new ride
      setRideHistory([...rideHistory, response.data.data]);

      setSnackbarMessage("Your request has been made. Please wait for a rider to confirm.");
      setSnackbarOpen(true);

      setLocation("");
      setDestination("");
      setAmount("");
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
                <ExpandCircleDownIcon sx={{ color: 'black', mr: 1, my: 0.5, fontSize: '2.9rem' }} />
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
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <UnfoldMoreIcon sx={{ color: 'black', mr: 1, my: 0.5, fontSize: '2.9rem' }} />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <NearMeIcon sx={{ color: 'black', mr: 1, my: 0.5, fontSize: '2.9rem' }} />
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
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PaymentIcon sx={{ color: 'black', mr: 1, my: 0.5, fontSize: '2.9rem' }} />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AttachMoneyIcon sx={{ color: 'black', mr: 1, my: 0.5, fontSize: '2.9rem' }} />
                <TextField
                  fullWidth
                  label="Amount"
                  variant="filled"
                  className="mb-4 mt-[10rem]"
                  placeholder="eg. 200.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 1,
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: "1.2rem" }}>
                <button onClick={handleRequestRide} variant="contained" className="bg-customLightBlue text-customWhite h-[3rem] w-[8rem] text-2xl" >Request!</button>
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
                ml: ".5rem"
              }}
              className=""
            >
              <div className="flex flex-column align-center">
                <h1 className="text-left font-bold text-5xl mb-[.5rem] text-Black">
                  Requests
                </h1>
                <h1 className="text-left font-bold text-3xl text-Black ml-[3rem] mt-[.4rem]">Your Acc Number is: {accountno}</h1>
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
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorSnackbarOpen}
        autoHideDuration={3000}
        onClose={closeErrorSnackbar}
      >
        <Alert
          onClose={closeErrorSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
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
