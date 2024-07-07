import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AdminSidebar from "../components/AdminSidebar";

const ViewRideRequests = () => {
  const users = [
    {
      ridereqID: 1,
      bookerID: 7,
      riderrequestedID: 5,
      location: "Solano",
      destination: "Bambang Save More",
      time: "Afternoon",
      rideprice: "200",
      rideconfirmation: "Accepted",
    },
    {
      ridereqID: 2,
      bookerID: 7,
      riderrequestedID: "",
      location: "Solano",
      destination: "Bambang Save More",
      time: "Afternoon",
      rideprice: "200",
      rideconfirmation: "Unaccepted",
    },
    // Add more user data as needed
  ];

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="items-center justify-center w-[105rem] p-8">
        <h2 className="text-2xl font-bold mb-4 w-[20rem]">Ride Requests</h2>
        <Paper elevation={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ride Request ID</TableCell>
                  <TableCell>Booker ID</TableCell>
                  <TableCell>Rider Requested</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Ride Price</TableCell>
                  <TableCell>Ride Confirmation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.ridereqID}>
                    <TableCell>{user.ridereqID}</TableCell>
                    <TableCell>{user.riderrequestedID}</TableCell>
                    <TableCell>{user.location}</TableCell>
                    <TableCell>{user.destination}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.time}</TableCell>
                    <TableCell>{user.rideprice}</TableCell>
                    <TableCell>{user.rideconfirmation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};

export default ViewRideRequests;
