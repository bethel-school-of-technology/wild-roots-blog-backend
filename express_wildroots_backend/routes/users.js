var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const User = require("../models/User");
const { json } = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const auth = require('../services/auth');

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

    if (!email || !password || !passwordCheck)
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
    const passwordHash = await bcrypt.hash(password, salt);

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
    
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET); //JWT_SECRET verifies token hasnt been created by someone else.
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

router.delete('/delete', auth, async (req, res) => {
try {
 const deletedUser = await User.findByIdAndDelete(req.user);
 res.json(deletedUser);
} catch (err) {
  res.status(500).json({ error: err.message });
}
});


//used in frontend to verify whether or not someone is logged in
router.post('/tokenIsValid', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//applied authentication to route below as param
router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    username: user.username,
    id: user._id,
  });
});


module.exports = router;
