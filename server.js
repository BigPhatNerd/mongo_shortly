require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3001;
connectDB();

const app  = express();

app.listen(PORT, () =>{
	console.log(`Server listening on ${PORT}`);
});
