const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("../utils/validator");

const dotEnv = require("dotenv");

dotEnv.config();

const login = async (req, res) => {
  const body = req.body;

  // Check if the login request body is valid using a custom validator function.
  if (!validator.isLoginBodyValid(body)) {
    // If the body is invalid, send a 400 Bad Request response with an error message.
    return res.status(400).json({ error: "Invalid user credentials." });
  }

  try {
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res.status(401).json({ msg: "Incorrect email or password." });
    }

    const data = await bcrypt.compare(body.password, user.password);

    if (data) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: data,
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        msg: `Login successful. Welcome back, ${user.username}!`,
        token: token,
      });
    } else {
      return res.status(401).json({ msg: "Incorrect email or password." });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ msg: "An error occurred." });
  }
};

const register = async (req, res) => {
  const { username, email, display_name, password, is_admin, phone_number } =
    req.body;
  // console.log({ email, password });

  const errors = validator.isRegisterBodyValid(req.body);

  // console.log({ errors });
  if (errors) {
    return res.status(400).json({ errors });
  }

  const user = await User.findOne({ username, email });
  console.log({ user });

  // check if the user is already registered
  if (user) {
    return res.status(409).json({
      message: "User Is Register ...",
    });
  }

  try {
    // Attempt to insert a new user with a duplicate username
    // hash the password

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      username,
      is_admin,
      display_name,
      phone_number: phone_number ?? "",
      password: hashPassword,
    });

    // console.log({ hashPassword });

    res.status(200).json({
      message: "Uer successfully added ...",
    });

    await newUser.save();
    // Handle successful save if needed
  } catch (error) {
    // Handle the duplicate key error here
    if (error.code === 11000 && error.keyPattern) {
      // Handle the duplicate username error
      if (error.keyPattern.username === 1)
        return res.status(409).json({
          message:
            "Username already exists. Please choose a different username.",
        });

      // Handle the duplicate email error
      if (error.keyPattern.email === 1)
        return res.status(409).json({
          message: "Email already exists. Please choose a different email.",
        });
    } else {
      // Handle other errors
      return res.status(409).json({
        message: "An error occurred:",
        error,
      });
    }
  }
};

module.exports = { login, register };
