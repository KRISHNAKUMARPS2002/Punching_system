const express = require("express");
const cors = require("cors");
require("dotenv").config();

const fetchDataRoutes = require("./routes/fetchData");
const { fetchAndStoreUsers } = require("./services/fetchService");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", fetchDataRoutes);

// Auto-sync users on startup
fetchAndStoreUsers()
  .then(() => console.log("Initial Sync Complete"))
  .catch((err) => console.error("Sync Error:", err));

module.exports = app;
