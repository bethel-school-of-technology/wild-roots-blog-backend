// const { Router } = require('express');
var express = require('express');
var router = express.Router();
var Cooking = require('../models/Cooking');

// get Cooking Page

router.get('/', async function (req, res) {
    try {
        const recipie = await Cooking.findAll();
        res.status(200).json({
            data: {
                recipie
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});

router.get('/:id', async function (req, res) {
    try {
        const recipie = await Cooking.findOne();
        res.status(200).json({
            data: {
                recipie
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});

// you have to use async in order to use await
// router.post('/addRecipe', async function(req, res){
//     var firstName = req.body.firstName;
//     var email = req.body.email;
//     var recipie = req.body.recipieName;
//     var description = req.body.description;
//    var message = `name: ${firstName} \n email: ${email} \n recipie: ${recipie} \n meaning:${description} `
//     try {
//         const newRecipie = await Cooking.create(req.body); 

//             res.status(200).json({
//                 data: { Recipie: newRecipie }
//             });
//         } catch (err) {
//             res.status(404).json({
//                 status: 'fail',
//                 message: err
//             });
//         }
// });

router.post('/addRecipe', async function (req, res, next) {
    console.log(req.body)
    try {
        const itemToCreate = {
            firstName: req.body.firstName,
            email: req.body.email,
            recipieName: req.body.recipieName,
            description: req.body.description
        }
        const newRecipie = await Cooking.create(itemToCreate);

        res.status(201).json({
                recipie: newRecipie,
                status: 'success',
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
    // Cooking.find({
    //     where: {
    //         firstName: req.body.firstName,
    //         email: req.body.email,
    //         recipieName: req.body.recipieName,
    //         description: req.body.description
    //     },
    // })
    // .spread(function (result, created) {
    //     if (created) {
    //       res.json({
    //         message: "Recipe added",
    //         status: 200,
    //       });
    //     } else {
    //       res.send("Recipe addded failed.");
    //     }
    //   });
})


router.put('/update/:id', async function (req, res) {
    try {
        const RecipieUpdate = await Cooking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            data: {
                RecipieUpdate: RecipieUpdate
            }
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
        await Cooking.findByIdAndDelete(req.params.id);
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