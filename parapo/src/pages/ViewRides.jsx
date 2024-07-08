import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Button,
} from "@mui/material";
import AdminSidebar from "../components/AdminSidebar";
import SearchIcon from '@mui/icons-material/Search';

const ViewRides = () => {
  const usersData = [
    {
      RideID: 1,
      BookerID: 1,
      RiderID: 3,
      Origin: "SMU Gate 1",
      Destination: "Capitol",
      Time: "Afternoon",
      RideTotal: 120,
    },
    {
      RideID: 2,
      BookerID: 5,
      RiderID: 8,
      Origin: "Solano LGU",
      Destination: "SMU Gate 2",
      Time: "Morning",
      RideTotal: 150,
    },
    // Add more user data as needed
  ];

  const itemsPerPage = 5; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination logic
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = usersData.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            />
            <SearchIcon sx={{ fontSize: 45, marginLeft: '.5rem', marginTop: '.25rem' }} />
          </div>
        </div>
        <Paper elevation={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Ride ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Booker ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Rider ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Origin</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Destination</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Ride Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersData.map((user) => (
                  <TableRow key={user.RideID}>
                    <TableCell>{user.RideID}</TableCell>
                    <TableCell>{user.BookerID}</TableCell>
                    <TableCell>{user.RiderID}</TableCell>
                    <TableCell>{user.Origin}</TableCell>
                    <TableCell>{user.Destination}</TableCell>
                    <TableCell>{user.Time}</TableCell>
                    <TableCell>{user.RideTotal}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <div className="mt-4 flex justify-center">
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outlined"
            color="primary"
          >
            Previous
          </Button>
          <span className="ml-4 mr-4">
            Page {currentPage} of {Math.ceil(usersData.length / itemsPerPage)}
          </span>
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastUser >= usersData.length}
            variant="outlined"
            color="primary"
            className="ml-4"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewRides;
