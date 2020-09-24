const jwt = require("jsonwebtoken");

function isAdmin(req, res, next) {
  //check for token
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "no token, authorization needed" });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    let user = decoded;

    if (user.role !== "admin") {
      return res.status(401).json({ message: "Not authorized to access" });
    } else {
      next();
    }
  } catch (error) {
    res.status(400).json({ message: "Token is not valid" });
  }
}

module.exports = isAdmin;
