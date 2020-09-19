const router = require("express").Router();
const User = require("../models/User");

// create a new user
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save(function (err) {
      if (err) throw Error(err);
    });

    console.log(result);

    const token = await user.generateAuthToken();

    res.status(201).json({ user: user, token: token });
  } catch (error) {
    res.status(400).json({ message: error });
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
