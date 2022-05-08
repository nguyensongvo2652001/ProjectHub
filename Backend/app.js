const express = require("express");

const app = express();

app.use(express.json({ limit: process.env.MAX_BODY_SIZE }));

module.exports = app;
