const express = require("express");
const router = require("../router");
const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
//mount router here
server.use("/api/accounts", router);

module.exports = server;
