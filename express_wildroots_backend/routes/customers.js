var express = require('express');
var router = express.Router();
var Customer = require('../models/Customers');

/* Get home page. */

router.get('/', async function(req, res) {
    try {
        const customer = await Customer.find();
        res.status(200).json({
            data: { customer }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});

router.post('/add', async function(req, res){
    try {
        const newCustomer = await Customer.create(req.body);

        res.status(201).json({
            data: { customer: newCustomer }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
});

module.exports = router;