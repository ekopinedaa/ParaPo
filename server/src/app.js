const express = require('express');
const cors = require('cors');
const connectDb = require('../config/db');
const UserRouter = require('../routes/user_routes');
const TransactionRouter = require('../routes/transaction_routes');
const RideRequestRouter = require('../routes/riderequest_routes');

const app = express();

app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

//routes
app.use('/api', UserRouter);
app.use('/api', TransactionRouter)
app.use('/api', RideRequestRouter)


const startServer = async () => {
    await connectDb(); // Wait for the database connection to be established
};

startServer();

module.exports = app;