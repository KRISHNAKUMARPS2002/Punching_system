const express = require("express");
const router = express.Router();
const { fetchAndStoreUsers } = require("../services/fetchService");

router.get("/fetch-users", async (req, res) => {
  try {
    const message = await fetchAndStoreUsers();
    res.json({ success: true, message });
  } catch (error) {
    console.error("Error syncing users:", error);
    res.status(500).json({ success: false, error: "Failed to sync users" });
  }
});

module.exports = router;
