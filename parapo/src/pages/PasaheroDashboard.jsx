import React, { useState } from 'react';
import { Button, Modal, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Grid, Typography, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const PasaheroDashboard = () => {
  const [openBookRideModal, setOpenBookRideModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [rideTime, setRideTime] = useState('');
  const [destination, setDestination] = useState('');
  const [price, setPrice] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rideHistory, setRideHistory] = useState([
    { id: 1, time: '08:00 AM', destination: 'Airport', rider: 'John Doe', total: '$20', vehicle: 'Car' },
    { id: 2, time: '10:30 AM', destination: 'Shopping Mall', rider: 'Jane Smith', total: '$15', vehicle: 'Motorcycle' },
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
    console.log(`Booking ride: Time - ${rideTime}, Destination - ${destination}, Price - ${price}`);
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
    console.log(`Updating credentials: Username - ${username}, Password - ${password}, First Name - ${firstName}, Last Name - ${lastName}`);
    // Placeholder: Close modal
    handleCloseUpdateModal();
  };

  return (
    <div className="p-8 w-screen">
      <h2 className="text-2xl font-bold mb-4">Pasahero Dashboard</h2>

      {/* Book a Ride Modal */}
           {/* Book a Ride Modal */}
           <Modal
        open={openBookRideModal}
        onClose={handleCloseBookRideModal}
        aria-labelledby="book-ride-modal"
        aria-describedby="book-ride-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            height: 350,
            bgcolor: 'background.paper',
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
      {/* Update Credentials Modal */}
      <Modal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        aria-labelledby="update-credentials-modal"
        aria-describedby="update-credentials-description"
      >
        <div className="modal">
          <h2 id="update-credentials-modal" className="text-2xl font-bold mb-4">Update Credentials</h2>
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateCredentials}
          >
            Update
          </Button>
        </div>
      </Modal>

      {/* Sections */}
      <div className="mb-8">
        <Button variant="contained" color="primary" onClick={handleOpenBookRideModal}>
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

      <div>
        <Button variant="contained" color="primary" onClick={handleOpenUpdateModal}>
          Update Credentials
        </Button>
      </div>
    </div>
  );
};

export default PasaheroDashboard;
