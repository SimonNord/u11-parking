require("dotenv").config();

const express = require("express");
require("./src/db/db");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const userRoutes = require("./src/routes/api/user");

app.use("/users", userRoutes);

const port = process.env.PORT | 4000;
app.listen(port, () => console.log(`server is running on port ${port}`));
