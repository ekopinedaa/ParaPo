import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import backgroundImage from '../rsc/finallandingpage.png';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3004/api/login', {
        username,
        password
      });

      // Assuming the response.data contains user information including usertype
      const { data } = response; // Destructure the response to get data object
      const { userData } = data; // Destructure userData from data

      // Store user data in local storage
      Object.keys(userData).forEach(key => {
        localStorage.setItem(key, userData[key]);
      });

      // Extract usertype from userData
      const { usertype } = userData;

      // Navigate based on usertype
      if (usertype === 'rider') {
        navigate('/rider');
      } else if (usertype === 'pasahero') {
        navigate('/pasahero');
      } else if (usertype === 'admin') {
        navigate('/admin');
      } else if (usertype === 'accounting') {
        navigate('/accounting');
      } else {
        alert('Invalid usertype returned from server.');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      alert('Invalid credentials. Please try again.');
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
        <Box
          className="p-4 rounded"
          sx={{ width: 300 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <TextField
                fullWidth
                label="username"
                variant="outlined"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <TextField
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              fullWidth
              variant="contained"
              color="primary"
              className={`w-full h-[2.5rem] p-[.5rem] rounded-md flex items-center gap-[.5rem] duration-300 ease hover:bg-customBlue hover:text-customWhite mt-4 bg-customLightBlue text-customWhite hover:border-customBlue justify-center`}
              type="submit"
            >
              Login
            </button>
            <p className="mt-2 text-start">
              New user? <Link to="/signup">Create an account</Link>
            </p>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default Login;
