const express = require("express");
const router = express.Router();
const User = require("../models/User");
const isAdmin = require("../middleware/admin");

/* get all the users */
router.get("/", isAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
  } catch (error) {
    res.status(500).json({ message: error });
  }
  res.status(200).json(user);
});

module.exports = router;
