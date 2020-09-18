const router = require("express").Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// create a new user
router.post(
  "/",
  [
    // sanitize user req.body
    body("email").isEmail().trim().escape(),
    body("password").isLength({ min: 5 }).trim(),
    body("phoneNumber").isMobilePhone().trim(),
  ],
  async (req, res) => {
    console.log("sanitize completed");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = new User(req.body);
      console.log(user);
      await user.save(function (err, res) {
        console.log("hej");
        if (err) {
          throw err;
        }
        console.log("test", res);
      });
      console.log("efter save");
      const token = await user.generateAuthToken();

      res.status(201).json({ user: user, token: token });
    } catch (error) {
      res.status(400).json({ message: error });
    }

    // ;
    /* 
   let user = User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: req.body.password,
      });

       let user = new User(req.body);
      */
  }
);

// login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredential(email, password);

    if (!user) {
      return res
        .status(401)
        .json({ error: "Login failed, check user credentails" });
    }

    const token = await User.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
