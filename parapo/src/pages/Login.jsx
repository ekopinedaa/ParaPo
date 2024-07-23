import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import backgroundImage from '../rsc/finallandingpage.png';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import createAuditLog from "../utils/Auditlogger";
import { SERVER_IP } from '../../config';

const Login = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://${SERVER_IP}:3004/api/login`, {
        username,
        password
      });

      const { data } = response;
      const { userData } = data;

      // Store user data in local storage
      Object.keys(userData).forEach(key => {
        localStorage.setItem(key, userData[key]);
      });

      // Extract usertype from userData
      const { usertype } = userData;



      // Navigate based on usertype
      if (usertype === 'rider') {
        await createAuditLog({
          userid: null,
          username: username,
          userrole: usertype,
          action: "Login"
        })

        navigate('/rider');
      } else if (usertype === 'pasahero') {
        await createAuditLog({
          userid: null,
          username: username,
          userrole: usertype,
          action: "Login"
        })

        navigate('/pasahero');
      } else if (usertype === 'admin') {
        await createAuditLog({
          userid: null,
          username: username,
          userrole: usertype,
          action: "Login"
        })

        navigate('/admin');
      } else if (usertype === 'accounting') {
        await createAuditLog({
          userid: null,
          username: username,
          userrole: usertype,
          action: "Login"
        })

        navigate('/accounting');
      } else {
        await createAuditLog({
          userid: null,
          username: username,
          userrole: usertype,
          action: "Invalid Login Attempt"
        })

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
            <p className="mt-10 text-start w-[30rem]">
              <u>Pasahero</u> Username: <b>jericho</b>| Password: <b>jericho</b>
            </p>
            <p className="mt-2 text-start w-[30rem]">
              <u>Rider</u> Username: <b>Mc</b>| Password: <b>Osmund</b>
            </p>
            <p className="mt-2 text-start w-[30rem]">
              <u>Admin</u>: <b>admin</b>
            </p>
            <p className="mt-2 text-start w-[30rem]">
              <u>Accounting</u>: <b>accounting</b>
            </p>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default Login;
