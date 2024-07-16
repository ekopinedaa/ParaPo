import React, { useState, useEffect } from "react";
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
import axios from "axios"; // Import Axios
import { DataGrid } from "@mui/x-data-grid";
import { SERVER_IP } from '../../config';

const columns = [
  { field: "rideid", headerName: "Ride ID", width: 150 },
  { field: "bookerid", headerName: "Booker ID", width: 130 },
  { field: "riderid", headerName: "Rider ID", width: 180 },
  { field: "origin", headerName: "Origin", width: 200 },
  { field: "destination", headerName: "Destination", width: 230 },
  { field: "time", headerName: "Time", width: 130 },
  { field: "ridetotal", headerName: "Ride Total", width: 130 },
];

const ViewRides = () => {
  const [rides, setRides] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchRides();
  }, []);


  const fetchRides = async () => {
    try {
      const response = await axios.get(`http://${SERVER_IP}:3004/api/GetAllRides`);
      console.log(response)
      if (response.data.success) {
        setRides(response.data.data);
      } else {
        console.error("Failed to fetch Ride Requests: ", response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };



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
          <div className="h-631 w-full">
            <DataGrid
              rows={rides}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 15]}
              getRowId={(row) => row.rideid}
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f5f5f5",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",
                },
              }}
            />
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default ViewRides;
