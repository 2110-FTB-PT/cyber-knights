const express = require("express");
const server = express();
require("dotenv").config();
const { client } = require("./db");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const PORT = process.env.PORT || 4000;

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(express.static(path.join(__dirname, "build")));

server.use("/api", require("./api"));

server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

server.use(({ name, message }, req, res, next) => {
  console.error(name, message);
  res.status(500).send({ name, message });
});

server.listen(PORT, () => {
  client.connect();
  console.log(`Server is running on ${PORT}`);
});
