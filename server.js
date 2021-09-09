require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes')

const PORT = process.env.PORT || 3001;
connectDB();

const app  = express();

app.use(express.json({ extended: false }));   

app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () =>{
	console.log(`Server listening on ${PORT}`);
});
