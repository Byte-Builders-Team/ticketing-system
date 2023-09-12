const validator = require("validator");

const isRegisterBodyValid = (body) => {
  const { username, email, display_name, password, is_admin, phone_number } =
    body;

  let error = null;

  // Check if the request body exists
  if (!body) {
    return (error =
      "Invalid registration request. Please provide a username, email, display_name, is_admin and password ...");
  }

  // Define the required fields for registration
  const requiredFields = [
    "username",
    "email",
    "display_name",
    "password",
    "is_admin",
  ];

  console.log({ requiredFields });
  // Check if all required fields are present
  for (const field of requiredFields) {
    if (!(field in body) || !body[field]) {
      return (error =
        "Invalid registration request. Please provide a username, email, display_name, is_admin and password ...");
    }
  }

  if (!validator.isEmail(email)) {
    return (error = `${email} is not a valid email address.`);
  }
};

function isLoginBodyValid(req) {
  // Check if the request body exists and has the required fields
  
  if (!req || !req.email || !req.password) {
    return false;
  }
  return true;
}

const isBodyValid = (body, requiredFields) => {
  //check if requiredFields is exist 
  
  for (const field of requiredFields) {

    if (!body[field]) {
      return false;
    }
  }
  return true

};

module.exports = { isBodyValid, isLoginBodyValid, isRegisterBodyValid };
