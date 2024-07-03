import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { Close as CloseIcon } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import backgroundImage from "../rsc/riderdashbgimage.png";

const RiderDashboard = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openBookRideModal, setOpenBookRideModal] = useState(false);
  const [rideTime, setRideTime] = useState("");
  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState("");

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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseBookRideModal = () => {
    setOpenBookRideModal(false);
  };

  const handleBookRide = () => {
    // Handle booking logic here (e.g., API call, etc.)
    // Placeholder: Show "Searching for a rider to accept" message
    console.log(
      `Booking ride: Time - ${rideTime}, Destination - ${destination}, Price - ${price}`
    );
    // Placeholder: Close modal
    handleCloseBookRideModal();
  };

  const handleOpenUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
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

  return (
    <div className="w-screen">
      <div className="bg-customBlue top-0 w-full h-[7rem] flex items-center text-customWhite">
        <div className="p-8 justify-start">
          <h1 className="text-roboto text-2xl font-bold flex">
            Welcome Rider! Ready to Start your day?
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
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
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
              <h1 className="text-left font-bold text-5xl mb-[.5rem] text-Black">
                Accept a ride
              </h1>
              <p className="text-left mt-[1 rem] text-xl mb-[2rem]">
                Accept a ride from a customer!
              </p>

              {/* Table */}
              <TableContainer
                component={Paper}
                sx={{ bgcolor: "White", boxShadow: "none" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ fontSize: "1.3rem", fontWeight: "bold", width: "22rem"}}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "1.3rem", fontWeight: "bold", width: "22rem" }}
                      >
                        Location
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "1.3rem", fontWeight: "bold", width: "22rem" }}
                      >
                        Destination
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "1.3rem", fontWeight: "bold", width: "22rem" }}
                      >
                        Price
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "1.3rem", fontWeight: "bold", width: "22rem" }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow key={row.id}>
                          <TableCell sx={{ fontSize: "1.2rem", width: "22rem" }}>
                            {row.name}
                          </TableCell>
                          <TableCell sx={{ fontSize: "1.2rem", width: "22rem" }}>
                            {row.location}
                          </TableCell>
                          <TableCell sx={{ fontSize: "1.2rem", width: "22rem" }}>
                            {row.destination}
                          </TableCell>
                          <TableCell sx={{ fontSize: "1.2rem", width: "22rem" }}>
                            {row.price}
                          </TableCell>
                          <TableCell>
                            <button
                              variant="contained"
                              className="bg-customBlue text-white text-[1.2rem] h-[2.5rem] w-[5rem]"
                            >
                              Accept
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
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
