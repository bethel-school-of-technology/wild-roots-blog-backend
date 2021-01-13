var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var cors = require('cors');
const creds = require('./config');
const Customer = require('../models/Contact');
// const transporter = require("transporter")

// router.get("/", async function(req, res){ 
//   await 
// })


router.post('/send', async (req, res, next) => {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var content = `name: ${name} \n email: ${email} \n message: ${message} `
  var mail = {
    from: email,
    to: email,
    subject: 'New Message from Contact Form',
    text: content
  }
  const ContactUs = new Customer({ 
    name, email, message
  }); ContactUs.save(); 
  
  var transport = {
    host: '127.0.0.1',
    port: 1025,
  },
    transporter = nodemailer.createTransport(transport)

  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  });
  transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err)
        res.json({
          status: 'fail'
        })
      } else {
             res.json({
        status: 'success'
      })
      }
      transporter.close()
    })
        
  // transporter.sendMail(mail, (err, data) => {
  //   if (err) {
  //     res.json({
  //       status: 'fail'
  //     })
  //   } else {

  //     transporter.sendMail({
  //       from: "<your email address>",
  //       to: email,
  //       subject: "Submission was successful",
  //       text: `Thank you for contacting us!\n\nForm details\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
  //     }, function (error, info) {
  //       if (error) {
  //         console.log(error);
  //       } else {
  //         console.log('Message sent: ' + info.response);
  //       }
  //     })


  //     res.json({
  //       status: 'success'
  //     })
  //   }
  // })
})




module.exports = router;
