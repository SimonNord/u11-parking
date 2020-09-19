const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  memberSince: {
    type: Date,
    default: Date.now,
  },
  cars: [
    {
      registrationNumber: { type: String, unique: true, default: null },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//hash password before save
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//generate jwt token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user.id }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  // check if email exists in database
  const user = await user.find({ email: email });
  if (!user) {
    throw new Error({ error: "invalid login credentials" });
  }
  // check if password is a match after decryption
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "invalid login credentials" });
  }
  // if email exists and password match, return the user
  return user;
};

// create the model
const User = mongoose.model("User", userSchema);

module.exports = User;
