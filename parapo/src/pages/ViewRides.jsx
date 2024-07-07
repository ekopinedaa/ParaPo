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

const ViewRides = () => {
  const users = [
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

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="items-center justify-center w-[105rem] p-8">
        <h2 className="text-2xl font-bold mb-4 w-[20rem]">Rides</h2>
        <Paper elevation={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ride ID</TableCell>
                  <TableCell>Booker ID</TableCell>
                  <TableCell>Rider ID</TableCell>
                  <TableCell>Origin</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Ride Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
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
      </div>
    </div>
  );
};

export default ViewRides;
