const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose")
const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));