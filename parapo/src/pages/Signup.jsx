import React, { useState } from 'react';
import { TextField, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../rsc/finallandingpage.png';
import createAuditLog from "../utils/Auditlogger";
import { SERVER_IP } from '../../config';
import { Button } from "@/components/ui/button";

const Signup = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');
    const [showVehicleType, setShowVehicleType] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        contactno: '',
        accountno: '',
        username: '',
        password: '',
        usertype: '',
        vehicletype: ''
    });
    const [errors, setErrors] = useState({});

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
        setShowVehicleType(e.target.value === 'rider');
        setFormData({ ...formData, usertype: e.target.value });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        // Validate form fields
        if (!formData.firstname || !formData.lastname || !formData.contactno || !formData.accountno || !formData.username || !formData.password || !formData.usertype || (showVehicleType && !formData.vehicletype)) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            await axios.post(`http://${SERVER_IP}:3004/api/createUser`, formData);
            await createAuditLog({
                userid: null,
                username: formData.username,
                userrole: formData.usertype,
                action: "Account Register"
            });
            navigate('/');
            console.log('User created successfully');
        } catch (error) {
            console.error('Error creating user:', error.message);
        }
    };

    return (
        <div className="flex items-center justify-start bg-[#FF0CE] w-screen font-roboto"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            <div className='flex bg-white h-screen items-center w-[30rem] justify-center'>
                <Box className="p-3 rounded" sx={{ width: 300 }}>
                    <h2 className="text-4xl font-bold mb-4 text-center">Sign Up</h2>
                    <form className="space-y-4" onSubmit={handleSignup}>
                        <div className="flex space-x-4 mb-4">
                            <TextField
                                fullWidth
                                label="First Name"
                                variant="outlined"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleInputChange}
                                error={!!errors.firstname}
                                helperText={errors.firstname}
                            />
                            <TextField
                                fullWidth
                                label="Last Name"
                                variant="outlined"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleInputChange}
                                error={!!errors.lastname}
                                helperText={errors.lastname}
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                fullWidth
                                label="Contact Number"
                                variant="outlined"
                                name="contactno"
                                value={formData.contactno}
                                onChange={handleInputChange}
                                error={!!errors.contactno}
                                helperText={errors.contactno}
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                fullWidth
                                label="Bank Account Number"
                                variant="outlined"
                                name="accountno"
                                value={formData.accountno}
                                onChange={handleInputChange}
                                error={!!errors.accountno}
                                helperText={errors.accountno}
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                fullWidth
                                label="Username"
                                variant="outlined"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                error={!!errors.username}
                                helperText={errors.username}
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                fullWidth
                                label="Password"
                                variant="outlined"
                                type='password'
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                        </div>
                        <FormControl fullWidth variant="outlined" className="mb-4" error={!!errors.usertype}>
                            <InputLabel id="userType-label">User Type</InputLabel>
                            <Select
                                labelId="userType-label"
                                id="userType"
                                value={userType}
                                onChange={handleUserTypeChange}
                                label="User Type"
                                name="usertype"
                            >
                                <MenuItem value="">
                                    <em>Select user type</em>
                                </MenuItem>
                                <MenuItem value="rider">Rider</MenuItem>
                                <MenuItem value="pasahero">Pasahero</MenuItem>
                            </Select>
                            {errors.usertype && <p className="text-red-600">{errors.usertype}</p>}
                        </FormControl>
                        {showVehicleType && (
                            <TextField
                                fullWidth
                                label="Vehicle Type"
                                variant="outlined"
                                className="mb-4"
                                name="vehicletype"
                                value={formData.vehicletype}
                                onChange={handleInputChange}
                                error={!!errors.vehicletype}
                                helperText={errors.vehicletype}
                            />
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            color="primary"
                            className={`w-full h-[2.5rem] p-[.5rem] rounded-md flex items-center gap-[.5rem] duration-300 ease mt-4 justify-center bg-[#0c356a]`}
                        >
                            Signup
                        </Button>
                        <p className="mt-2 text-start">
                            Already have an <Link to="/" className='hover:text-[#0174be]'>account?</Link>
                        </p>
                    </form>
                </Box>
            </div>
        </div>
    );
};

export default Signup;
