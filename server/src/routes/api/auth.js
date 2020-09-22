const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User login
router.post("/", async (req, res) => {
  // Validate the required fields in body
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    //Find user by email and compare the entered password with the hashed one
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Login failed, check user credentails" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Login failed, check user credentials" });
    }
    // change loggedIn to true
    user.loggedIn = true;

    //generate jwt token
    const token = await jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: 3600,
    });
    user.tokens = user.tokens.concat({ token });

    user.save();
    res.json({ user, token });
  } catch (error) {
    res.json({ message: error });
  }
});

// get user data

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user))
    .catch((err) => res.json({ message: err }));
});
module.exports = router;
