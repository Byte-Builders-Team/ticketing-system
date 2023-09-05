const jwt = require('jsonwebtoken');
const verifyToken = (req , res , next) => {
    //todo
            next();
}

const verifyTokenAndAdmin = (req , res , next) => {
    //todo 
            next();
}

module.exports = { verifyToken , verifyTokenAndAdmin }