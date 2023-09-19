const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();

// const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try{
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  }catch(err){
    return res.status(401).json({ message: "Token is not correct " + err });
  }
  req.username = decoded.username;
  next();

};

const verifyTokenAndAdmin = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
try{
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
}catch (err) {
  return res.status(401).json({ message: "Token is not correct " + err });
}c

  if (!decoded.is_admin){
    return res.status(401).json({ message: "you are not admin" });
  }

  req.username = decoded.username;
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
