var express = require('express');
var router = express.Router();
var Customer = require('../models/Customers');

/* Get home page. */
// get all ///////////////
router.get('/', async function(req, res) {
    try {
        const customers = await Customer.find();
        res.status(200).json({
            data: { customers }
        });
    //error handling
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});
// Get by id ///////////////
router.get('/:id', async function(req, res) {
    try {
        let id = req.params.id
        const customer = await Customer.findById(id);
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

// Post /////////////////
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

// Update //////////////
router.put('/update/:id', async function(req, res){
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(201).json({
            data: { customer }
        });
    //error Handling important to handle errors 
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err
        });
    }
});

router.delete('/delete/:id', async function(req, res){
    try {
        await Customer.findByIdAndDelete(req.params.id); 
        res.status(200).json({
            status: 'success',
            data: null
        });    
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err
        });
    }
});



module.exports = router;