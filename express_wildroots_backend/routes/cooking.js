// const { Router } = require('express');
var express = require('express');
var router = express.Router();
var Cooking = require('../models/Cooking');

// get Cooking Page

router.get('/', async function(req, res) {
    try {
        const recipie = await Cooking.findAll();
        res.status(200).json({
            data: { recipie }
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
        const recipie = await Cooking.findOne();
        res.status(200).json({
            data: { recipie }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});