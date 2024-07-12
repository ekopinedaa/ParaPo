const express = require('express');
const cors = require('cors');
const app = require('./app');
const dotenv = require('dotenv')
dotenv.config();


const PORT = process.env.PORT || 3004;
const HOST = '192.168.10.37';
//const HOST = '192.168.1.20';

app.use(express.json());
app.use(cors());

// app.listen(3004, '192.168.10.37', () => {
//     console.log(`Listening: http://${HOST}:${PORT}`)
// });

app.listen(3004, process.env.SERVER_IP, () => {
    console.log(`Listening: http://${process.env.SERVER_IP}:3004`)
});
