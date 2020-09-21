const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  //check for token
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "no token, authorization needed" });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token is not valid" });
  }
}

module.exports = auth;
