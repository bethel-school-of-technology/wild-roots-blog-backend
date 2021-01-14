var express = require("express");
var router = express.Router();
var models = require("../models");
var mongoose = require("mongoose");
const User = require("../models/User");
const { json } = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get("/", async function (req, res) {
  try {
    const users = await User.find();

    res.status(200).json({
      data: { users },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

router.get("/:id", async function (req, res) {
  try {
    let id = req.parans.id;
    const users = await User.findById(id);

    res.status(200).json({
      data: { users },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    let { username, email, password, passwordCheck } = req.body;

    //validation

    if (!email || !password || passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the password again for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    if (!username) username = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, hash);

    const newUser = new User({
      email,
      password: passwordHash,
      username,
    });
    const savedUser = await newUser.save(); //saves new user to database.
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    //validate password belongs to account with this email

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password); //user.password from const user which has the hashed password.
    if (!isMatch)
    return res
    .status(400)
    .json({ msg: "Invalid credentials." });
    
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    })
  
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*router.put("/update/:id", async function (req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      data: { user },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
});

router.delete("/delete/:id", async function (req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}); */

module.exports = router;
