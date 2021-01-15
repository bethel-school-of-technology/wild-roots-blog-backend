var express = require('express');
var router = express.Router();
var Scripture = require('../models/Scriptures.js');

/* Get home page. */

router.get('/', async function(req, res) {
    try {
        const results = await Scripture.find();
        res.status(200).json({
            data: { results }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});

router.post('/add', async function(req, res){
    console.log(req.body)
    try {
        const newScripture = await Scripture.create(req.body);

        res.status(201).json({
            data: { scripture: newScripture }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
});

module.exports = router;

//Scriptures