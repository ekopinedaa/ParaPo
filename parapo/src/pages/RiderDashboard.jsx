import React, { useState, useEffect } from "react";
import {
  TextField,
  Paper,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Close as CloseIcon } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import createAuditLog from "../utils/Auditlogger";
import { SERVER_IP } from "../../config";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const RiderDashboard = () => {
  const navigate = useNavigate();
  const [price, setPrice] = useState("");
  const [username, setUsername] = useState("");
  const [total, setTotal] = useState("");
  const [rideRequests, setRideRequests] = useState([]);
  const [rideHistory, setRideHistory] = useState([]);
  const [extraCharge, setExtraCharge] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedExtraCharge = localStorage.getItem("extraCharge");
    setUsername(storedUsername);
    setExtraCharge(storedExtraCharge);

    fetchRideRequests();
    fetchExtraCharge();
    fetchRideHistory();
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
          disabled={params.row.confirmation === "accepted"}
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
          color="primary"
          onClick={() => handleAcceptRide(params.row)}
          disabled={params.row.confirmation !== "pending"}
        >
          Accept
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

    if (!ride.rideprice) {
      alert("Please enter a price for the ride.");
      return;
    }

    if (isNaN(ride.rideprice)) {
      alert("Please enter a valid number for the ride price.");
      return;
    }

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

      await createAuditLog({
        userid: null,
        username: username,
        userrole: "rider",
        action: "Accept Ride",
      });

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

  const fetchRideHistory = async () => {
    try {
      const response = await axios.get(
        `http://${SERVER_IP}:3004/api/GetAllRides`
      );
      const riderUserId = localStorage.getItem("userid");

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
        (ride) => ride.riderid === parseInt(riderUserId, 10)
      );

      const formattedHistory = filteredHistory.map((ride) => ({
        id: ride.rideid,
        rideid: ride.rideid,
        riderid: ride.riderid,
        bookerid: ride.bookerid,
        origin: ride.origin,
        destination: ride.destination,
        time: ride.time,
        ridetotal: ride.ridetotal,
      }));

      setRideHistory(formattedHistory);
    } catch (error) {
      console.error("Error fetching ride history:", error);
      setRideHistory([]);
    }
  };

  return (
    <div className="w-screen">
      <div className="bg-[#0c356a] top-0 w-full h-[7rem] flex items-center text-[#ffffff]">
        <div className="p-8 justify-start">
          <h1 className="text-roboto text-2xl font-bold flex">
            Welcome {username}! Ready to Start your day?
          </h1>
        </div>
        <div className="p-8 absolute right-0 items-center">
          <Sheet>
            <SheetTrigger asChild>
              <IconButton>
                <MenuIcon className="text-[#ffffff]" />
              </IconButton>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="p-4">
                <List>
                  <ListItem button onClick={() => navigate("/UpdateAccount")}>
                    <ListItemText primary="Update Profile" />
                  </ListItem>
                  <ListItem button onClick={() => navigate("/")}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="flex items-center bg-[#FF0CE] w-screen font-roboto">
        <div className="h-full w-full flex flex-row justify-center">
          <div className="h-[40rem] flex items-center">
            <Box
              sx={{
                height: "34rem",
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
              <div className="h-[23.2rem] w-full">
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

      <div className="flex align-center justify-center mt-[5rem]">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost">
              <h1 className="text-2xl font-bold">View Ride History</h1>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full w-[80rem]">
              <DrawerHeader>
                <DrawerTitle><p className="text-4xl font-bold">Ride History</p></DrawerTitle>
                <DrawerDescription>
                  <p className="text-2xl">Your past rides are listed here.</p>
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <div style={{ height: 400, width: "100%"}}>
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
                    style={{ fontSize: "16px"}}
                  />
                </div>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default RiderDashboard;
