var express = require('express');
var router = express.Router();
var models = require('../models');
var mongoose = require('mongoose');
var User = require('../models/User');

/* GET users listing. */
router.get('/', async function(req, res) {
  try {
    const users = await User.find();

    res.status(200).json({
      data: { users }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
});

router.get('/:id', async function(req, res) {
  try {
    let id = req.parans.id
    const users = await User.findById(id);

    res.status(200).json({
      data: { users }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
});

router.post('/add', async function (req, res) {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      data: { user: newUser }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
});

router.put('/update/:id', async function (req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      data: { user }
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err
    });
  }
});


router.delete('/delete/:id', async function (req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
});








module.exports = router;
