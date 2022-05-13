const mongoose = require("mongoose");

// Configurate environment variables
const dotenv = require("dotenv");
dotenv.config({ path: "./env/config.env" });

const app = require("./app");

// Connect to database
let databaseString = process.env.LOCAL_DB_STRING.replace(
  /<username>/,
  process.env.DB_USERNAME
);
databaseString = databaseString.replace(/<password>/, process.env.DB_PASSWORD);
mongoose.connect(databaseString, () => {
  console.log("DATABASE CONNECTED");
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log("SERVER STARTED");
});
