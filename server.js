require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes')

const PORT = process.env.PORT || 3001;
connectDB();

const app  = express();

app.use(express.json({ extended: false }));   

app.use(routes);
app.listen(PORT, () =>{
	console.log(`Server listening on ${PORT}`);
});
