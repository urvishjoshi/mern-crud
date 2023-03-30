require("dotenv").config();
const express = require("express");
const path = require('path');
const ejs = require('ejs');
const cors = require('cors');
const ejsLayouts = require('express-ejs-layouts');
const apiRoutes = require("./routes/api");
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(ejsLayouts)
app.use(express.static("public"));
app.use(cors())

//server
const port = process.env.PORT
app.listen(port, console.log(`Application is running on port: `+port));

//get error log file without accessing server console
app.get('/error/log', (req, res) => res.sendFile('error.log', { root: path.join(__dirname, './') }))

//database connection
require("./db/dbConnection")(process.env.DB_CONN_LOCAL).connect();

// api routes
app.use('/api/v1', apiRoutes);
