import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TablePagination,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Close as CloseIcon } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import backgroundImage from "../rsc/riderdashbgimage.png";
import { SERVER_IP } from '../../config';

const RiderDashboard = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [price, setPrice] = useState("");
  const [username, setUsername] = useState("");
  const [total, setTotal] = useState("");
  const [rideRequests, setRideRequests] = useState([]);
  const [extraCharge, setExtraCharge] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedExtraCharge = localStorage.getItem("extraCharge");
    setUsername(storedUsername);
    setExtraCharge(storedExtraCharge)

    fetchRideRequests();
    fetchExtraCharge();
  }, []);

  const columns = [
    { field: "ridereqid", headerName: "ID", width: 150 },
    { field: "bookerid", headerName: "User ID", width: 230 },
    { field: "origin", headerName: "Location", width: 230 },
    { field: "destination", headerName: "Destination", width: 230 },
    {
      field: "rideprice",
      headerName: "Total",
      width: 230,
      editable: true,
      renderCell: (params) => (
        <TextField
          value={params.value}
          onChange={(e) => handleTotalChange(params.id, e.target.value)}
          variant="standard"
          fullWidth
        />
      ),
    },
    { field: "confirmation", headerName: "Confirmation", width: 230 },
    {
      field: "actions",
      headerName: "Actions",
      width: 230,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAcceptRide(params.row)}
          disabled={params.row.confirmation !== "pending"}
        >
          Accept
        </Button>
      ),
    },
  ];

  const handleTotalChange = (id, newValue) => {
    setRideRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, rideprice: newValue } : request
      )
    );
    setPrice(newValue);
  };

  const handleAcceptRide = async (ride) => {
    const XtraChargePrice = parseInt(localStorage.getItem("extraCharge"), 10);

    const riderUserId = localStorage.getItem("userid");
    const RideReqAcceptID = ride.ridereqid;
    const SetPriceRide = parseInt(ride.rideprice, 10) + XtraChargePrice;

    console.log(SetPriceRide);
    console.log(RideReqAcceptID);

    try {
      await axios.put(
        `http://${SERVER_IP}:3004/api/UpdateRideRequest/${RideReqAcceptID}`,
        {
          riderid: riderUserId,
          rideconfirmation: "accepted",
          rideprice: SetPriceRide,
        }
      );
      // Refresh the ride requests after updating

      fetchRideRequests();
    } catch (error) {
      console.error("Error accepting ride:", error);
    }
  };

  const fetchExtraCharge = async () => {
    try {
      const response = await fetch(`http://${SERVER_IP}:3004/api/getECID/1`); // Replace with your actual API endpoint
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

  const fetchRideRequests = async () => {
    try {
      const response = await axios.get(
        `http://${SERVER_IP}:3004/api/GetRideRequest`
      );
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
      const formattedRequests = requestsData.map((request) => ({
        id: request.ridereqid, // DataGrid requires a unique 'id' field
        ridereqid: request.ridereqid,
        bookerid: request.bookerid,
        origin: request.origin,
        destination: request.destination,
        time: request.time,
        rideprice: request.rideprice,
        confirmation: request.rideconfirmation, // Note: changed from 'rideconfirmation' to match your columns
        actions: request.ridereqid,
      }));

      setRideRequests(formattedRequests);
    } catch (error) {
      console.error("Error fetching ride requests:", error);
      setRideRequests([]);
    }
  };

  const rows = [
    {
      id: 1,
      name: "John Doe",
      location: "Downtown",
      destination: "Airport",
      price: "$20",
    },
    {
      id: 2,
      name: "Jane Smith",
      location: "Uptown",
      destination: "Mall",
      price: "$15",
    },
    {
      id: 3,
      name: "Alice Johnson",
      location: "Suburb",
      destination: "Library",
      price: "$12",
    },
    {
      id: 4,
      name: "Robert Brown",
      location: "City Center",
      destination: "Hotel",
      price: "$18",
    },
    {
      id: 5,
      name: "Emily Davis",
      location: "Park",
      destination: "Museum",
      price: "$10",
    },
    {
      id: 6,
      name: "Michael Wilson",
      location: "Beachside",
      destination: "Restaurant",
      price: "$25",
    },
    {
      id: 7,
      name: "Sarah Taylor",
      location: "Countryside",
      destination: "Hospital",
      price: "$30",
    },
    {
      id: 8,
      name: "David Moore",
      location: "Industrial Area",
      destination: "Office",
      price: "$22",
    },
    {
      id: 9,
      name: "Laura Miller",
      location: "Downtown",
      destination: "University",
      price: "$17",
    },
    {
      id: 10,
      name: "James Anderson",
      location: "Suburb",
      destination: "Stadium",
      price: "$19",
    },
    {
      id: 11,
      name: "Megan Thomas",
      location: "City Center",
      destination: "Gym",
      price: "$14",
    },
    {
      id: 12,
      name: "Christopher Jackson",
      location: "Park",
      destination: "Cinema",
      price: "$16",
    },
    {
      id: 13,
      name: "Amanda White",
      location: "Beachside",
      destination: "Shopping Center",
      price: "$23",
    },
    {
      id: 14,
      name: "Joshua Harris",
      location: "Countryside",
      destination: "Train Station",
      price: "$28",
    },
    {
      id: 15,
      name: "Jessica Martin",
      location: "Industrial Area",
      destination: "Bus Stop",
      price: "$11",
    },
    {
      id: 16,
      name: "Brian Lee",
      location: "Downtown",
      destination: "Bank",
      price: "$24",
    },
    {
      id: 17,
      name: "Angela Walker",
      location: "Suburb",
      destination: "Post Office",
      price: "$13",
    },
    {
      id: 18,
      name: "Ryan King",
      location: "City Center",
      destination: "Coffee Shop",
      price: "$9",
    },
    {
      id: 19,
      name: "Elizabeth Wright",
      location: "Park",
      destination: "Zoo",
      price: "$21",
    },
    {
      id: 20,
      name: "Kevin Hall",
      location: "Beachside",
      destination: "Hotel",
      price: "$27",
    },
  ];

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

  return (
    <div className="w-screen">
      <div className="bg-customBlue top-0 w-full h-[7rem] flex items-center text-customWhite">
        <div className="p-8 justify-start">
          <h1 className="text-roboto text-2xl font-bold flex">
            Welcome {username}! Ready to Start your day?
          </h1>
        </div>
        <div className="p-8 absolute right-0 items-center">
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon className="text-customWhite" />
          </IconButton>
        </div>
      </div>

      <div
        className="flex items-center bg-[#FF0CE] w-screen font-roboto"
        // style={{
        //   backgroundImage: `url(${backgroundImage})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
      >
        <div className="h-full w-full flex flex-row justify-center">
          <div className="h-[50rem] flex items-center">
            <Box
              sx={{
                height: "45rem",
                width: "115rem",
                bgcolor: "rgba(255, 255, 255, 0.5)",
                p: 4,
                borderRadius: 2,
                boxShadow: 3,
                mt: "1.5rem",
                mr: ".5rem",
              }}
            >
              <div className="flex flex-column">
                <div>
                  <h1 className="text-left font-bold text-5xl mb-[.5rem] text-Black">
                    Accept a ride
                  </h1>
                  <p className="text-left mt-[1 rem] text-xl mb-[2rem]">
                    Accept a ride from a customer!
                  </p>
                </div>
                <div className="ml-[20rem] text-2xl font-bold mt-[1.9rem]">
                  The Extra Charge is: P{extraCharge}
                </div>
              </div>
              <div className="h-[30rem] w-full">
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
        {/* Ride History */}
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

      {/* Drawer */}
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </div>
  );
};

export default RiderDashboard;
