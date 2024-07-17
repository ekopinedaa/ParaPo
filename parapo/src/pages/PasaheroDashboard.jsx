import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
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
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import NearMeIcon from "@mui/icons-material/NearMe";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import PaymentIcon from "@mui/icons-material/Payment";
import createAuditLog from "../utils/Auditlogger";
import { SERVER_IP } from "../../config";

const PasaheroDashboard = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userid, setUserid] = useState();
  const [username, setUsername] = useState();
  const [accountno, setAccountno] = useState();
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [usertype,setUsertype] = useState("")
  const [amount, setAmount] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Success Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Success Snackbar message
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false); // State for Error Snackbar
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState(""); // Error Snackbar message
  const [rideRequests, setRideRequests] = useState([]);
  const [rideHistory, setRideHistory] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedAccountno = localStorage.getItem("accountno");
    const storedUserId = localStorage.getItem("userid");
    const storedUsertype = localStorage.getItem("usertype");
    setUsertype(storedUsertype);
    setUsername(storedUsername);
    setAccountno(storedAccountno);
    setUserid(storedUserId);

    fetchRideRequests();
    fetchRideHistory();
  }, []);

  const fetchRideRequests = async () => {
    try {
      const response = await axios.get(
        `http://${SERVER_IP}:3004/api/GetRideRequest`
      );
      console.log("API Response:", response.data);

      let requestsData = response.data;

      if (!Array.isArray(requestsData)) {
        if (requestsData.data && Array.isArray(requestsData.data)) {
          requestsData = requestsData.data;
        } else {
          console.error("Unexpected data format:", requestsData);
          setRideRequests([]);
          return;
        }
      }

      const specificUserId = localStorage.getItem("userid");
      const filteredRequests = requestsData.filter(
        (request) => request.bookerid == specificUserId
      );

      const formattedRequests = filteredRequests.map((request) => ({
        id: request.ridereqid,
        riderid: request.riderid,
        bookerid: request.bookerid,
        origin: request.origin,
        destination: request.destination,
        time: request.time,
        rideprice: request.rideprice,
        confirmation: request.rideconfirmation,
      }));

      setRideRequests(formattedRequests);
    } catch (error) {
      console.error("Error fetching ride requests:", error);
      setRideRequests([]);
    }
  };

  const fetchAndStoreAccountNo = async (riderId) => {
    try {
      const response = await axios.get(
        `http://${SERVER_IP}:3004/api/getUserById/${riderId}`
      );
      const accountNumber = response.data.accountno;

      // Store account number in local storage
      localStorage.setItem(`rider_accountno_${riderId}`, accountNumber);
    } catch (error) {
      console.error(
        `Error fetching account number for rider ${riderId}:`,
        error
      );
    }
  };

  const columns = [
    { field: "id", headerName: "", width: 70 },
    { field: "bookerid", headerName: "User ID", width: 80 },
    { field: "riderid", headerName: "Rider ID", width: 90 },
    { field: "origin", headerName: "Location", width: 150 },
    { field: "destination", headerName: "Destination", width: 150 },
    { field: "time", headerName: "Time", width: 150 },
    { field: "rideprice", headerName: "Total", width: 100 },
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

  const rideHistoryColumns = [
    { field: "rideid", headerName: "Ride Id", width: 150 },
    { field: "riderid", headerName: "Rider", width: 230 },
    { field: "bookerid", headerName: "Booker ID", width: 230 },
    { field: "origin", headerName: "Origin", width: 150 },
    { field: "destination", headerName: "Destination", width: 150 },
    { field: "time", headerName: "Time", width: 150 },
    { field: "ridetotal", headerName: "Total", width: 150 },
  ];

  const fetchRideHistory = async () => {
    try {
      const response = await axios.get(`http://${SERVER_IP}:3004/api/GetAllRides`);
      const bookerUserId = localStorage.getItem("userid");

      let ridesData = response.data;

      if (!Array.isArray(ridesData)) {
        if (ridesData.data && Array.isArray(ridesData.data)) {
          ridesData = ridesData.data;
        } else {
          console.error("Unexpected data format:", ridesData);
          setRideHistory([]);
          return;
        }
      }

      const filteredHistory = ridesData.filter(
        (ride) => ride.bookerid === parseInt(bookerUserId, 10)
      );

      const formattedHistory = filteredHistory.map((ride) => ({
        id: ride.rideid,
        rideid: ride.rideid,
        riderid: ride.riderid,
        bookerid: ride.bookerid,
        origin: ride.origin,
        destination: ride.destination,
        time: ride.time,
        ridetotal: ride.ridetotal
      }));

      setRideHistory(formattedHistory);
    } catch (error) {
      console.error("Error fetching ride history:", error);
      setRideHistory([]);
    }
  };


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
    if (!location || !destination) {
      setErrorSnackbarMessage(
        "Please fill out all fields before requesting a ride."
      );
      setErrorSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post(
        `http://${SERVER_IP}:3004/api/AddRideRequest`,
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

      setSnackbarMessage(
        "Your request has been made. Please wait for a rider to confirm."
      );
      setSnackbarOpen(true);

      setLocation("");
      setDestination("");
      setAmount("");
      fetchRideRequests();

      await createAuditLog({
        userid: userid,
        username: username,
        userrole: usertype,
        action: "Requested A Ride"
      })
    } catch (error) {
      console.error("Error creating ride request:", error.message);
    }
  };

  const handlePayRide = async (ride) => {
    try {
      const UserResponse = await axios.get(
        `http://${SERVER_IP}:3004/api/getUserById/${ride.riderid}`
      );
      const riderAccountNo = UserResponse.data.accountno;
      localStorage.setItem("rider accountno", riderAccountNo);

      // Add Ride logic here
      const RideResponse = await axios.post(
        `http://${SERVER_IP}:3004/api/AddRide`,
        {
          bookerid: ride.bookerid,
          riderid: ride.riderid,
          origin: ride.origin,
          destination: ride.destination,
          time: ride.time,
          ridetotal: ride.rideprice,
        }
      );

      console.log("Ride added:", RideResponse.data);

      // Delete the ride request from the table
      console.log(ride.id)
      const deleteResponse = await axios.delete(
        `http://${SERVER_IP}:3004/api/DeleteRideRequest/${ride.id}`
      );
      console.log("Ride request deleted:", deleteResponse.data);

      setSnackbarMessage("Your payment has been Charged and Recorded. Thank you for choosing ParaPo");
      setSnackbarOpen(true);

      // Proceed with the payment logic


      fetchRideRequests();
    } catch (error) {
      console.error("Error fetching rider account number:", error);
      setErrorSnackbarMessage("Failed to fetch rider account number.");
      setErrorSnackbarOpen(true);
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
          <h3 className="text-xl font-bold mb-4 flex justify-center mb-[3rem]">Ride History</h3>
          <div className="w-full flex align-center items-center justify-center">
            <Paper elevation={3}>
              <DataGrid
                rows={rideHistory}
                columns={rideHistoryColumns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                getRowId={(row) => row.rideid}
              />
            </Paper>
          </div>
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
