import React, { useState } from 'react';
import { Button, TextField, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import backgroundImage from '../rsc/finallandingpage.png'
import { Link } from 'react-router-dom';

const Signup = () => {
    const [userType, setUserType] = useState('');
    const [showVehicleType, setShowVehicleType] = useState(false);

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
        setShowVehicleType(e.target.value === 'rider');
    };

    return (
        <div className="flex items-center justify-start bg-[#FF0CE] w-screen font-roboto"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            <div className='flex bg-white h-screen items-center w-[30rem] justify-center'>
                <Box
                    className="p-3 rounded"
                    sx={{ width: 300 }}
                >
                    <h2 className="text-4xl font-bold mb-4 text-center">Sign Up</h2>
                    <form className="space-y-4">
                        <div className="flex space-x-4 mb-4">
                            <TextField
                                fullWidth
                                label="First Name"
                                variant="outlined"
                            />
                            <TextField
                                fullWidth
                                label="Last Name"
                                variant="outlined"
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                fullWidth
                                label="Contact Number"
                                variant="outlined"
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                fullWidth
                                label="Bank Account Number"
                                variant="outlined"
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                fullWidth
                                label="Username"
                                variant="outlined"
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                fullWidth
                                label="Password"
                                variant="outlined"
                                type='password'
                            />
                        </div>
                        <FormControl fullWidth variant="outlined" className="mb-4">
                            <InputLabel id="userType-label">User Type</InputLabel>
                            <Select
                                labelId="userType-label"
                                id="userType"
                                value={userType}
                                onChange={handleUserTypeChange}
                                label="User Type"
                            >
                                <MenuItem value="">
                                    <em>Select user type</em>
                                </MenuItem>
                                <MenuItem value="rider">Rider</MenuItem>
                                <MenuItem value="pasahero">Pasahero</MenuItem>
                            </Select>
                        </FormControl>
                        {showVehicleType && (
                            <TextField
                                fullWidth
                                label="Vehicle Type"
                                variant="outlined"
                                className="mb-4"
                            />
                        )}

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="mt-4"
                        >
                            Signup
                        </Button>
                        <p className="mt-2 text-start">
                            Already have an <Link to="/">account?</Link>
                        </p>
                    </form>

                </Box>
            </div>
        </div>
    );
};

export default Signup;
