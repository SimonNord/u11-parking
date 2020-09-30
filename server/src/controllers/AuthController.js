const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");
/* 
   @uri     /auth/register
   @method  POST
   @        Private
*/
//  Register a new user
router.post("/register", async (req, res) => {
  // Validate the required fields in body
  const { firstname, lastname, email, password, phoneNumber } = req.body;
  if (!email || !password || !lastname || !firstname)
    return res.status(400).json({ message: "Please enter all fields" });
  if (password.length < 7) {
    return res.status(400).json({ message: "password is too short" });
  }
  //Check for existing user
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists)
    return res.status(400).json({ message: "email address already in use" });

  //check for another user with the same phone number
  const phoneNumberInUse = await User.findOne({ phoneNumber });
  if (phoneNumberInUse)
    return res.status(400).json({ message: "phone number already in use" });

  //create the new user
  try {
    const user = new User(req.body);

    // generate jwt token
    const token = await jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: 3600,
    });
    user.token = token;

    await user.save();
    // after save, return token and user without password
    res.status(201).json({
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        register_date: user.register_date,
      },
      token,
    });
  } catch (error) {
    throw new Error(error);
  }
});

/* 
   @uri     /auth/login
   @method  POST
   @        Private
*/
// User login
router.post("/login", async (req, res) => {
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
        .json({ message: "Login failed, check user credentails" });
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
    user.token = token;
    user.save();

    res.json({ user, token });
  } catch (error) {
    res.json({ message: error });
  }
});

/* 
   @uri     /auth/user
   @method  get
   @        Private
*/
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user))
    .catch((err) => res.json({ message: err }));
});

module.exports = router;
