const express = require('express');
const {welcome}=require("../controllers/wecomeController")
const multer = require('multer');
const User = require("../models/User");

// Configure multer storage
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

const router = express.Router();

router.get('/', welcome)
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Authenticate password
      if (!user.authenticate(password)) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      res.status(200).json({ message: "Login successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });
module.exports = router;