'use strict'

const nodemailer = require('nodemailer')

function restorePasswordMail(user){
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'deportescp@gmail.com',
      pass: 'zrqu#vCHf!qZb1Y3gk*$nYRAKQew4Tufkta5ad^^Y#gYlsOoRd'
    }
    })

    const mailOptions = {
      from: 'deportescp@gmail.com', // sender address
      to: `${user}`, // list of receivers
      subject: 'Password Restore', // Subject line
      html: '<p> Hola </p>'// plain text body
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     })

    // TODO: Define the callback function

    // TODO: Allow non secure apps to access gmail you can do this by going to your gmail settings
}

module.exports = {
    restorePasswordMail
}