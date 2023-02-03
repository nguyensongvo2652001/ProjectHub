const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./env/main.env" });

const app = require("./app");

mongoose.set("strictQuery", true);

const rawDatabaseURI = process.env.RAW_DATABASE_URI;
const databasePassword = process.env.DATABASE_PASSWORD;
const databaseURI = rawDatabaseURI.replace("<password>", databasePassword);
mongoose.connect(databaseURI, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected to database successfully");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
