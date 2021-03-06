const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: String,
  registrationNumber: String,
  active: { type: Boolean, default: false },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// create the model
const Car = mongoose.model("Car", carSchema);

module.exports = Car;
