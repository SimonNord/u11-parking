const router = require("express").Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

// create a new user
router.post("/", async (req, res) => {
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
    user.tokens = user.tokens.concat({ token });

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

// login user

module.exports = router;
