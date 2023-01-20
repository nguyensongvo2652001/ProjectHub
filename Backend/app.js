const express = require("express");

const authRouter = require("./routers/authRouter");
const errorController = require("./controllers/errorController");

const app = express();

app.use(express.json({ limit: process.env.MAX_BODY_SIZE }));

app.use("/api/v1/users", authRouter);
app.use(errorController);

module.exports = app;
