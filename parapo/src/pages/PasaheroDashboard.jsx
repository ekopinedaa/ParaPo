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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Close as CloseIcon } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import backgroundImage from "../rsc/PasaheroDashImage.png";

const PasaheroDashboard = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openBookRideModal, setOpenBookRideModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [rideTime, setRideTime] = useState("");
  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

  const handleOpenBookRideModal = () => {
    setOpenBookRideModal(true);
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

  const handleUpdateCredentials = () => {
    // Handle update credentials logic here (e.g., API call, etc.)
    // Placeholder: Update credentials
    console.log(
      `Updating credentials: Username - ${username}, Password - ${password}, First Name - ${firstName}, Last Name - ${lastName}`
    );
    // Placeholder: Close modal
    handleCloseUpdateModal();
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
        <ListItem button onClick={handleOpenUpdateModal}>
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
      <div className="bg-customBlue fixed top-0 w-full h-[7rem] flex items-center text-customWhite">
        <div className="p-8 justify-start">
          <h1 className="text-roboto text-2xl font-bold flex">
           Welcome! Care to Book a Ride?
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
  
        <div className="h-[20rem] mt-[30rem] flex flex-col justify-end">
        <div className="bg-customLightBlue h-[5rem] flex items-center w-screen p-8">
            <h1 className="text-roboto text-2xl font-bold">
              Download The App
            </h1>
          </div>
          <div className="bg-customYellow h-[5rem] flex items-center w-screen p-8">
            <h1 className="text-roboto text-2xl font-bold">
              About Us
            </h1>
          </div>
        </div>
      </div>

      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Pasahero Dashboard</h1>
        {/* Book a Ride Modal */}
        <Modal
          open={openBookRideModal}
          onClose={handleCloseBookRideModal}
          aria-labelledby="book-ride-modal"
          aria-describedby="book-ride-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              height: 350,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h5" component="h2" sx={{ flexGrow: 1 }}>
                Book a Ride
              </Typography>
              <IconButton onClick={handleCloseBookRideModal}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <TextField
              fullWidth
              label="Time"
              variant="outlined"
              className="mb-4 mt-4"
              value={rideTime}
              onChange={(e) => setRideTime(e.target.value)}
            />
            <TextField
              fullWidth
              label="Destination"
              variant="outlined"
              className="mb-4"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              className="mb-4"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleBookRide}
            >
              OK
            </Button>
          </Box>
        </Modal>

        {/*Update credentials modal*/}
        <Modal
          open={openUpdateModal}
          onClose={handleCloseUpdateModal}
          aria-labelledby="update-credentials-modal"
          aria-describedby="update-credentials-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
              Update Credentials
            </Typography>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              className="mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              className="mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              className="mb-4"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              className="mb-4"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Grid container justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateCredentials}
              >
                Update
              </Button>
            </Grid>
          </Box>
        </Modal>

        {/* Sections */}
        <div className="mb-8">
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenBookRideModal}
          >
            Book a Ride
          </Button>
          {/* Placeholder for "Searching for a rider to accept" */}
        </div>

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

export default PasaheroDashboard;
