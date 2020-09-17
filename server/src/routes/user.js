const router = require("express").Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// create a new user
router.post(
  "/users",
  [
    // sanitize user req.body
    body("email").isEmail().trim().escape(),
    body("password").isLength({ min: 5 }).trim(),
    body("phoneNumber").isMobilePhone().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = new User(req.body);
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } catch (error) {
      res.status(400).send(error);
    }

    /* User.create({
      firstname: req.body.username,
      lastname: req.body.lastname,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: req.body.password,
    });*/
  }
);

// login user
router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredential(email, password);

    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed, check user credentails" });
    }

    const token = await User.generateAuthToken();
    res.send({ user, token });
  } catch (error) {}
});
