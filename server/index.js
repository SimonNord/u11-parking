require("dotenv").config();
const express = require("express");
require("./src/db/db");

const app = express();

app.use(express.json());

const port = process.env.PORT | 4000;
app.listen(port, () => console.log(`server is running on port ${port}`));
