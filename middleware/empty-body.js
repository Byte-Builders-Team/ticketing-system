const checkEmptyRequestBody = (req, res, next) => {
  console.log("Middleware executed"); // Add this line for debugging
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      error: "Request body is empty. Please provide data in the request body.",
    });
  }
  // If the body is not empty, proceed to the next middleware or route handler
  next();
};
module.exports = { checkEmptyRequestBody };
