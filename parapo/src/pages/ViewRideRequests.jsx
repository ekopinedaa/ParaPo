import React, { useState, useEffect } from "react";
import {
  Paper,
} from "@mui/material";
import AdminSidebar from "../components/AdminSidebar";
import axios from "axios"; // Import Axios
import createAuditLog from "../utils/Auditlogger";
import { DataGrid } from "@mui/x-data-grid";
import { SERVER_IP } from "../../config";

const columns = [
  { field: "ridereqid", headerName: "Ride Request ID", width: 150 },
  { field: "bookerid", headerName: "Booker ID", width: 130 },
  { field: "riderid", headerName: "Rider Requested", width: 180 },
  { field: "origin", headerName: "Location", width: 200 },
  { field: "destination", headerName: "Destination", width: 230 },
  { field: "time", headerName: "Time", width: 130 },
  { field: "rideprice", headerName: "Ride Price", width: 130 },
  { field: "rideconfirmation", headerName: "Confirmation", width: 250 },
];

const ViewRideRequests = () => {
  const [rideRequests, setRideRequests] = useState([]);

  useEffect(() => {

    fetchRideRequests();
  }, []);

  const fetchRideRequests = async () => {
    try {
      const response = await axios.get(
        `http://${SERVER_IP}:3004/api/GetRideRequest`
      );
      if(response.data.success) {

        const filteredRequests = response.data.data.filter(
          (request) => request.rideconfirmation === "pending"
        );

        setRideRequests(filteredRequests)
      } else {
        console.error("Failed to fetch Ride Requests: ", response.data.message);
      }
    } catch (error) {
      console.error(error)
    }
  };

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
        <div className="h-631 w-full">
            <DataGrid
              rows={rideRequests}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 15]}
              getRowId={(row) => row.ridereqid}
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f5f5f5',
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontWeight: 'bold',
                },
              }}
            />
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default ViewRideRequests;
