const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//register user
exports.createUser = async (req, res) => {
  try {
    //get user input
    const { full_name, username, email, password } = req.body;

    //validate user input
    if (!(username && email && password && full_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ username });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
      //then redirect to login page
    }

    //create user in our database
    const user = await User.create({
      full_name,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
    });

    //create token
    const token = jwt.sign(
      {
        user_id: user._id,
        username,
      },
      process.env.TOKEN_KEY
    );

    //save user token
    user.token = token;

    //return new user
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    //get user input
    const { username, password } = req.body;

    //validate user input
    if (!(username && password)) {
      res
        .status(400)
        .json({ status: "error", message: "All input is required" });
    }

    //validate if user exist in our database
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      //create token
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        { expiresIn: "3d" } //token expires in 3 day
      );
      //save user token
      user.token = token;

      //user info sending
      res.status(200).json(user);
    } else {
      res.status(400).json({ status: "error", message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(400).json({ status: "error", message: "Invalid Credentials" });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    const user = await User.findOne({ username });
    user.token = "";
    user.save();
    res.status(200).json(user.token);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
