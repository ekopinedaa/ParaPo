const express = require('express');
const cors = require('cors');
const connectDb = require('../config/db');
const UserRouter = require('../routes/user_routes');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3004',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

//routes
app.use('/api', UserRouter);



const startServer = async () => {
    await connectDb(); // Wait for the database connection to be established
};

startServer();

module.exports = app;