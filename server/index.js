require("dotenv").config();

const express = require("express");
require("./src/db/db");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const UserContoller = require("./src/controllers/UserController");
const AuthController = require("./src/controllers/AuthController");
const CarController = require("./src/controllers/CarController");

app.use("/api/users", UserContoller);
app.use("/api/auth", AuthController);
app.use("/api/cars", CarController);

const port = process.env.PORT | 4000;

app.listen(port, () => console.log(`Express is running on port ${port}`));

module.exports = app;
