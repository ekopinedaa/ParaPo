const express = require('express');
const cors = require('cors');
const app = require('./app');


const PORT = process.env.PORT || 3004;
const HOST = '192.168.10.37';

app.use(express.json());
app.use(cors());
app.listen(3004, '192.168.10.37', () => {
    console.log(`Listening: http://${HOST}:${PORT}`)
});
