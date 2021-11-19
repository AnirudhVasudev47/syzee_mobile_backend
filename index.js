require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


//My routes
const homeTabRoutes = require("./src/routes/home_tab");
const userRoutes = require("./src/routes/user")

//Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", homeTabRoutes);
app.use("/api", userRoutes);

//PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
})