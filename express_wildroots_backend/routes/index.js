var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wild Roots' });
});

module.exports = router;
