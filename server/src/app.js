const express = require('express');
const cors = require('cors');
const connectDb = require('../config/db');
const UserRouter = require('../routes/user_routes');
const TransactionRouter = require('../routes/transaction_routes');
const RideRequestRouter = require('../routes/riderequest_routes');
const RideRouter = require('../routes/rides_routes');
const dotenv = require('dotenv')
dotenv.config()

const app = express();

app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.get('/', (req,res) =>{
  res.json({message: "Message"})
})

//routes
app.use('/api', UserRouter);
app.use('/api', TransactionRouter);
app.use('/api', RideRequestRouter);
app.use('/api', RideRouter);


const startServer = async () => {
    await connectDb(); // Wait for the database connection to be established
};

startServer();

module.exports = app;