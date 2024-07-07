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

const VIewTransactions = () => {
  const users = [
    {
      userId: 1,
      firstName: "John",
      lastName: "Doe",
      accountNo: "123456789",
      amount: "200",
      TransactionType: "withdraw",
    },
    {
      userId: 2,
      firstName: "Jake",
      lastName: "Dawson",
      accountNo: "987654321",
      amount: "100",
      TransactionType: "transfer",
    },
    // Add more user data as needed
  ];

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="items-center justify-center w-[105rem] p-8">
        <h2 className="text-2xl font-bold mb-4 w-[20rem]">Transactions</h2>
        <Paper elevation={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Account No</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Transaction Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.accountNo}</TableCell>
                    <TableCell>{user.amount}</TableCell>
                    <TableCell>{user.TransactionType}</TableCell>
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

export default VIewTransactions;
