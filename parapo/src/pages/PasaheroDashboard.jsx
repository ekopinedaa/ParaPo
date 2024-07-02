import React, { useState } from "react";
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
  Box,
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
            Welcome *User*! Care to Book a Ride?
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
                <ExpandCircleDownIcon sx={{ color: 'black', mr: 1, my: 0.5, fontSize: '2.9rem'}}/>
                <TextField
                  fullWidth
                  label="Location"
                  variant="filled"
                  placeholder="Where you at?"
                  className="mb-4 mt-[10rem]"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 1,
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <UnfoldMoreIcon sx={{ color: 'black', mr: 1, my: 0.5, fontSize: '2.9rem'}}/>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <NearMeIcon sx={{ color: 'black', mr: 1, my: 0.5, fontSize: '2.9rem'}}/>
                <TextField
                  fullWidth
                  label="Destination"
                  variant="filled"
                  className="mb-4 mt-[10rem]"
                  placeholder="Where you goin?"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 1,
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PaymentIcon sx={{ color: 'black', mr: 1, my: 0.5, fontSize: '2.9rem'}}/>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AttachMoneyIcon sx={{ color: 'black', mr: 1, my: 0.5, fontSize: '2.9rem'}}/>
                <TextField
                  fullWidth
                  label="Amount"
                  variant="filled"
                  className="mb-4 mt-[10rem]"
                  placeholder="eg. 200.00"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 1,
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: "1.2rem" }}>
              <button variant="contained" className="bg-customLightBlue text-customWhite h-[3rem] w-[8rem] text-2xl">Request!</button>
              </Box>
            </Box>
            

            <Box
              sx={{
                height: "35rem",
                width: "30rem",
                bgcolor: "rgba(255, 255, 255, 0.5)",
                p: 4,
                borderRadius: 2,
                boxShadow: 3,
                mt: "1.5rem",
                ml: ".5rem"
              }}
              className="blur-sm"
            >
              <h1 className="text-left font-bold text-5xl mb-[.5rem] text-Black">
                Payment
              </h1>
              <p className="text-left mt-[.5rem] text-xl mb-[5.5rem]">
                Pay cashless!
              </p>

              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountBalanceIcon sx={{ color: 'black', mr: 1, my: 0.5, fontSize: '2.9rem'}}/>
                <TextField
                  fullWidth
                  label="Account No"
                  variant="filled"
                  className="mb-4 mt-[10rem]"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 1,
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <UnfoldMoreIcon sx={{ color: 'black', mr: 1, my: 0.5, fontSize: '2.9rem'}}/>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AttachMoneyIcon sx={{ color: 'black', mr: 1, my: 0.5, fontSize: '2.9rem'}}/>
                <TextField
                  fullWidth
                  label="Total"
                  variant="filled"
                  className="mb-4 mt-[10rem]"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 1,
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: "1.2rem" }}>
              <button variant="contained" className="bg-customLightBlue text-customWhite h-[3rem] w-[8rem] text-2xl mt-[3.4rem]">Pay now!</button>
              </Box>
            </Box>
          </div>
        </div>
      </div>
      <div className="p-8">

        {/* Sections */}

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
