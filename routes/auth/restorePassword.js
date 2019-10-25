'use strict'

// Controller for endpoint
const loginController = require('../../controllers/auth.controller')

module.exports = async (req, res) => {

  var userData = req.body
  var data = await loginController.restorePassword(userData.email)

  if (data.error) {
    res.status(data.code)
    delete data['code']
  } else {
    res.status(201)
  }
  res.send(data)

}