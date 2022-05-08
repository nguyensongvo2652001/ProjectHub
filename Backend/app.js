const express = require("express");

const authRouter = require("./routers/authRouter");

const app = express();

app.use(express.json({ limit: process.env.MAX_BODY_SIZE }));

app.use("/api/v1/auth", authRouter);

module.exports = app;
