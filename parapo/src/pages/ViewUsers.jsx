import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import AdminSidebar from "../components/AdminSidebar";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { SERVER_IP } from '../../config';

const ViewUsers = () => {
  const usersData = [
    {
      userId: 1,
      username: "user1",
      password: "password1",
      firstName: "John",
      lastName: "Doe",
      contactNo: "123-456-7890",
      accountNo: "123456789",
      userType: "rider",
    },
    {
      userId: 2,
      username: "user2",
      password: "password2",
      firstName: "Jane",
      lastName: "Smith",
      contactNo: "987-654-3210",
      accountNo: "987654321",
      userType: "pasahero",
    },
    {
      userId: 3,
      username: "user3",
      password: "password3",
      firstName: "Michael",
      lastName: "Johnson",
      contactNo: "111-222-3333",
      accountNo: "111222333",
      userType: "rider",
    },
    {
      userId: 4,
      username: "user4",
      password: "password4",
      firstName: "Emily",
      lastName: "Brown",
      contactNo: "444-555-6666",
      accountNo: "444555666",
      userType: "pasahero",
    },
    {
      userId: 5,
      username: "user5",
      password: "password5",
      firstName: "David",
      lastName: "Wilson",
      contactNo: "777-888-9999",
      accountNo: "777888999",
      userType: "rider",
    },
    {
      userId: 6,
      username: "user6",
      password: "password6",
      firstName: "Sophia",
      lastName: "Davis",
      contactNo: "111-999-8888",
      accountNo: "111999888",
      userType: "pasahero",
    },
    {
      userId: 7,
      username: "user7",
      password: "password7",
      firstName: "Matthew",
      lastName: "Clark",
      contactNo: "222-333-4444",
      accountNo: "222333444",
      userType: "rider",
    },
    {
      userId: 8,
      username: "user8",
      password: "password8",
      firstName: "Olivia",
      lastName: "Martinez",
      contactNo: "555-666-7777",
      accountNo: "555666777",
      userType: "pasahero",
    },
    {
      userId: 9,
      username: "user9",
      password: "password9",
      firstName: "Daniel",
      lastName: "Lopez",
      contactNo: "888-999-0000",
      accountNo: "888999000",
      userType: "rider",
    },
    {
      userId: 10,
      username: "user10",
      password: "password10",
      firstName: "Isabella",
      lastName: "Garcia",
      contactNo: "333-444-5555",
      accountNo: "333444555",
      userType: "pasahero",
    },
    {
      userId: 11,
      username: "user11",
      password: "password11",
      firstName: "Ethan",
      lastName: "Hernandez",
      contactNo: "666-777-8888",
      accountNo: "666777888",
      userType: "rider",
    },
    {
      userId: 12,
      username: "user12",
      password: "password12",
      firstName: "Ava",
      lastName: "Gonzalez",
      contactNo: "999-000-1111",
      accountNo: "999000111",
      userType: "pasahero",
    },
    {
      userId: 13,
      username: "user13",
      password: "password13",
      firstName: "Mason",
      lastName: "Perez",
      contactNo: "444-555-6666",
      accountNo: "444555666",
      userType: "rider",
    },
    {
      userId: 14,
      username: "user14",
      password: "password14",
      firstName: "Sophia",
      lastName: "Sanchez",
      contactNo: "777-888-9999",
      accountNo: "777888999",
      userType: "pasahero",
    },
    {
      userId: 15,
      username: "user15",
      password: "password15",
      firstName: "James",
      lastName: "Ramirez",
      contactNo: "111-222-3333",
      accountNo: "111222333",
      userType: "rider",
    },
    {
      userId: 16,
      username: "user16",
      password: "password16",
      firstName: "Emma",
      lastName: "Torres",
      contactNo: "555-666-7777",
      accountNo: "555666777",
      userType: "pasahero",
    },
    {
      userId: 17,
      username: "user17",
      password: "password17",
      firstName: "Alexander",
      lastName: "Nguyen",
      contactNo: "888-999-0000",
      accountNo: "888999000",
      userType: "rider",
    },
    {
      userId: 18,
      username: "user18",
      password: "password18",
      firstName: "Abigail",
      lastName: "Kim",
      contactNo: "333-444-5555",
      accountNo: "333444555",
      userType: "pasahero",
    },
    {
      userId: 19,
      username: "user19",
      password: "password19",
      firstName: "William",
      lastName: "Tran",
      contactNo: "666-777-8888",
      accountNo: "666777888",
      userType: "rider",
    },
    {
      userId: 20,
      username: "user20",
      password: "password20",
      firstName: "Samantha",
      lastName: "Lee",
      contactNo: "999-000-1111",
      accountNo: "999000111",
      userType: "pasahero",
    },
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
          <h2 className="text-2xl font-bold">USERS</h2>
          <div className="w-[21.5rem] ml-auto flex items-center">
            <TextField
              label="Search Users"
              variant="outlined"
              fullWidth
            />
            <SearchIcon sx={{ fontSize: 45, marginLeft: ".5rem" }} />
            <button
              variant="contained"
              color="primary"
              className={`w-[5rem] h-[2.35rem] p-[.5rem] ml-8 rounded-md flex items-center gap-[.5rem] duration-300 ease hover:bg-customYellow hover:text-customLightBlue border-black justify-center`}
            >
              <AddIcon />
            </button>
          </div>
        </div>
        <Paper elevation={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>User ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Password</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>First Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Last Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Contact No</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Account No</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>User Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.password}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.contactNo}</TableCell>
                    <TableCell>{user.accountNo}</TableCell>
                    <TableCell>{user.userType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        {/* Pagination controls */}
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

export default ViewUsers;
