import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import AdminSidebar from "../components/AdminSidebar";
import { SERVER_IP } from '../../config';

const ViewRideRequests = () => {
  const usersData = [
    {
      ridereqID: 2,
      bookerID: 7,
      riderrequestedID: 5,
      location: "Solano",
      destination: "Mars",
      time: "Afternoon",
      rideprice: "200",
      rideconfirmation: "Accepted",
    },
    {
      ridereqID: 6,
      bookerID: 9,
      riderrequestedID: "",
      location: "Solano",
      destination: "Bambang Save More",
      time: "Afternoon",
      rideprice: "200",
      rideconfirmation: "Unaccepted",
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
        <h2 className="text-2xl font-bold mb-4 w-[20rem]">RIDE REQUESTS</h2>
        <Paper elevation={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Ride Request ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Booker ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Rider Requested</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Destination</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Ride Price</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Ride Confirmation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersData.map((user) => (
                  <TableRow key={user.ridereqID}>
                    <TableCell>{user.ridereqID}</TableCell>
                    <TableCell>{user.bookerID}</TableCell>
                    <TableCell>{user.riderrequestedID}</TableCell>
                    <TableCell>{user.location}</TableCell>
                    <TableCell>{user.destination}</TableCell>
                    <TableCell>{user.time}</TableCell>
                    <TableCell>{user.rideprice}</TableCell>
                    <TableCell>{user.rideconfirmation}</TableCell>
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

export default ViewRideRequests;
