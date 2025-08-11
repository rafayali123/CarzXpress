require("dotenv").config();
require("./database/connection");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./router/router");

// const Contact = require("contact")
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("", router);
app.use('/api', router);
// app.use('/api/contact', router);

const port = 8005;

app.listen(port, () => {
  console.log(`server is connected to ${port}`);
});
