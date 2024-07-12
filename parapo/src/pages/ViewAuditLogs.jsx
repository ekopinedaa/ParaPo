import React from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TextField,
    TableRow,
    Paper,
} from "@mui/material";
import AdminSidebar from "../components/AdminSidebar";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { SERVER_IP } from '../../config';

const ViewAuditLogs = () => {
    const users = [
        {
            AuditId: 1,
            userID: 1,
            userRole: "admin",
            date: "02/14/20204",
            time: "3:40pm",
            action: "Add User",
        },
        {
            AuditId: 2,
            userID: 6,
            username: "pasahero",
            userRole: "pasahero",
            date: "02/14/20204",
            time: "7:30am",
            action: "Add ride",
        },
        // Add more user data as needed
    ];
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
                        />
                        <SearchIcon sx={{ fontSize: 45, marginLeft: '.5rem' }} />
                    </div>
                </div>
                <Paper elevation={3}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "bold" }}>Audit ID</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>User ID</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>User Role</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.AuditId}>
                                        <TableCell>{user.AuditId}</TableCell>
                                        <TableCell>{user.userID}</TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.userRole}</TableCell>
                                        <TableCell>{user.date}</TableCell>
                                        <TableCell>{user.time}</TableCell>
                                        <TableCell>{user.action}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </div>
    )
}

export default ViewAuditLogs
