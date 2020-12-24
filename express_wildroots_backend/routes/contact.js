var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var cors = require('cors');
const creds = require('./config');

import transporter from transporter;

var transport = {
  host: 'localhost',
  port: 1025,
  auth: {
    user: creds.USER,
  }
},
var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var content = `name: ${name} \n email: ${email} \n message: ${message} `
  var mail = {
    from: name,
    to:'receiving email address',  // Change email address 
    subject: 'New Message from Contact Form',
    text: content
  }
  

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
   
        transporter.sendMail({
            from: "<your email address>",
            to: email,
            subject: "Submission was successful",
            text: `Thank you for contacting us!\n\nForm details\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
        }, function(error, info){
            if(error) {
                console.log(error);
            } else{
                console.log('Message sent: ' + info.response);
            }
        })


        res.json({
         status: 'success'
        })
    }
  })
})



  
  module.exports = router;
