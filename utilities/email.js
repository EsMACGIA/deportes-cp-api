'use strict'

/**
 * @date 2019-10-23
 * @author Wilfredo Graterol
 */

const config = require('../config')
const nodemailer = require('nodemailer')
const debug = require('debug')(`${config.debug}utilities:email`)

/**
 * Sent an email to a list of recipients.
 * 
 * @date 2019-10-23
 * @param {Array<string>, string} recipients mails of all of the recipients of the email
 * @param {string} subject subject of the email
 * @param {string} body body of the email
 * @returns {string} status of the email (sent or failed)
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
  let response = await transporter.sendMail(mailOptions, function (err, info) {
      if(err) {
        debug('Error: ', err)
      } else {
        debug('Info: ', info)
      }
    })

  return response
}

module.exports = {
    sendEmail
}