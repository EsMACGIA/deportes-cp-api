'use strict'

// Controllers
const loginController = require('../../controllers/login.controller')

module.exports = async (req, res) => {

  var userData = req.body
    
  var data = await loginController.loginUser(userData)

  if (data.error) {
    res.status(data.code)
    delete data['code']
  } else {
    res.status(201)
  }
  res.send(data)

}
