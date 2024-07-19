import React, { useState, useEffect } from 'react';
import { Paper, TextField } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import AdminSidebar from "../components/AdminSidebar";
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { SERVER_IP } from '../../config';

const columns = [
  { field: 'auditid', headerName: 'Audit ID', width: 100 },
  { field: 'userid', headerName: 'User ID', width: 250 },
  { field: 'username', headerName: 'Username', width: 200 },
  { field: 'userrole', headerName: 'User Role', width: 200 },
  { field: 'date', headerName: 'Date', width: 300 },
  { field: 'time', headerName: 'Time', width: 200 },
  { field: 'action', headerName: 'Action', width: 200 },
];

const ViewAuditLogs = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    try {
      const response = await axios.get(`http://${SERVER_IP}:3004/api/getAllAuditlog`);
      // Ensure each log has a valid auditid, or assign a unique identifier
      const logsWithIds = response.data.map((log, index) => ({
        ...log,
        auditid: log.auditid || `${index}`,
      }));
      setAuditLogs(logsWithIds);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredLogs = auditLogs.filter(log => 
    log.auditid && log.auditid.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="items-center justify-center w-[105rem] p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Audit Logs</h2>
          <div className="w-[21.5rem] ml-auto flex items-center">
            <TextField
              label="Search Log ID"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <SearchIcon sx={{ fontSize: 45, marginLeft: '.5rem' }} />
          </div>
        </div>
        <Paper elevation={3}>
          <div style={{ height: 631, width: '100%' }}>
            <DataGrid
              rows={filteredLogs}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(row) => row.auditid}
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

export default ViewAuditLogs;