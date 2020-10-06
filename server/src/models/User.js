const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// define the schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  loggedIn: { type: Boolean, default: false },
  token: {
    type: String,
  },
});

//hash password before save
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// create the model
const User = mongoose.model("User", userSchema);

module.exports = User;
