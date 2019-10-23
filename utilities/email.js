'use strict'

const config = require('../config')
const nodemailer = require('nodemailer')

async function sendEmail(recipients, subjects, body){
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email.account,
      pass: config.email.password
    }
  })

  const mailOptions = {
    from: config.email.account, // sender address
    to: recipients, // list of receivers
    subject: subjects, // Subject line
    text: body // plain text body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
    })

  // TODO: Define the callback function
}

module.exports = {
    sendEmail
}