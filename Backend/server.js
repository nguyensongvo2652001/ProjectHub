const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./env/main.env" });

const app = require("./app");

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
