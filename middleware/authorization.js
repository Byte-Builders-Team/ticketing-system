const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();

// const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  //todo
  next();
};

const verifyTokenAndAdmin = (req, res, next) => {
  //todo
  next();
};

// module.exports = { verifyToken , verifyTokenAndAdmin }

const checkUserAuth = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isVerified = jwt.verify(token, process.env.SECRET_KEY);

  if (!isVerified) {
    return res.status(401).json({ message: "Is Un Authenticated" });
  }

  next();
};

module.exports = { checkUserAuth, verifyToken, verifyTokenAndAdmin };
