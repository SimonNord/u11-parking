const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const auth = require("../middleware/auth");

/* get all the cars */
router.get("/", auth, async (req, res) => {
  try {
    const cars = await Car.find({});
    return res.json(cars);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

// Get cars with a specific owner
router.get("/:id", auth, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
  } catch (error) {
    res.status(500).json({ message: error });
  }
  res.status(200).json(car);
});

// create a new car
router.post("/", auth, async (req, res) => {
  // Validate the required fields in body
  const { registrationNumber, name } = req.body;
  if (!registrationNumber || !name)
    return res.status(400).json({ message: "Please enter all fields" });
  if (registrationNumber.length < 6 && registrationNumber.length > 6) {
    return res
      .status(400)
      .json({ message: "Registration Number incorrect length" });
  }
  //Check for existing registration Number
  const registrationAlreadyExists = await Car.findOne({ registrationNumber });
  if (registrationAlreadyExists)
    return res.status(400).json({ message: "This car already exists" });

  //create the new car
  try {
    const car = new Car({
      name: req.body.name,
      registrationNumber: req.body.registrationNumber,
      owner: req.user.id,
    });
    await car.save();
    // after save, return car
    res.status(201).json({
      car,
    });
  } catch (error) {
    throw new Error(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await Car.findOneAndUpdate(
      { _id: req.params.id },
      { active: req.body.active }
    );
    res.status(200).json({ result });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Car.findOneAndDelete({ _id: req.params.id });
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
