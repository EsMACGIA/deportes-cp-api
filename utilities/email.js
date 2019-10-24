'use strict'

/**
 * @date 2019-10-23
 * @author Wilfredo Graterol
 */

const config = require('../config')
const nodemailer = require('nodemailer')


/**
 * 
 * @date 2019-10-23
 * @param {any} recipients mails of all of the recipients of the email
 * @param {any} subject subject of the email
 * @param {any} body body of the email
 */
async function sendEmail(recipients, subject, body){
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email.account,
      pass: config.email.password
    }
  })

  const mailOptions = {
    from: config.email.account,   // sender address
    to: recipients,               // list of receivers
    subject: subject,             // Subject line
    text: body                    // plain text body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
    })
}

module.exports = {
    sendEmail
}