const router = require("express").Router();
const User = require("../../models/User");

// create a new user
router.post("/", async (req, res) => {
  //Check for existing user
  const emailAlreadyExists = await User.findOne({ email: req.body.email });
  if (emailAlreadyExists)
    return res.status(400).json({ message: "email address already in use" });

  //check for another user with the same phone number
  const phoneNumberInUse = await User.findOne({
    phoneNumber: req.body.phoneNumber,
  });
  if (phoneNumberInUse)
    return res.status(400).json({ message: "phone number already in use" });

  //create the new user
  try {
    const user = new User(req.body);
    await user.save();
    // generate jwt token
    /* const token = await user.generateAuthToken(); */

    // after save, return modified user obj
    /* user : {
      firstname: user.firstname
      lastname: user.lastname,
      email: user.email
      phoneNumber: user.phoneNumber,
      register_date: user.register_date,

    }  */

    res.status(201).json({
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);

    if (!user) {
      return res
        .status(401)
        .json({ error: "Login failed, check user credentails" });
    }

    const token = await User.generateAuthToken();
    res.json({ user, token });
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
