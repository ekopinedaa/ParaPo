import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import backgroundImage from '../rsc/finallandingpage.png';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here (e.g., API call, validation)

    // Temporary login logic based on email and password
    if (email === 'rider' && password === 'rider') {
      navigate('/Rider');
    } else if (email === 'pasahero' && password === 'pasahero') {
      navigate('/Pasahero');
    } else if (email === 'admin' && password === 'admin') {
      navigate('/Admin');
    } else if (email === 'accounting' && password === 'accounting') {
      navigate('/Accounting');
    } else {
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
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className="mt-4"
              type="submit"
            >
              Login
            </Button>
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
