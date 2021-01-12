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



router.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: req.body.password
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect.json('login');
      } else {
        res.json('This user already exists');
      }
    });
});


module.exports = router;
