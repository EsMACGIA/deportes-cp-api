'use strict'

// Controllers
const usersController = require('../../controllers/users.controller')

module.exports = async (req, res) => {

  var userData = req.body

  var data = await usersController.createUser(userData)

  if (data.constructor === Array) {
    res.status(200)
  } else {
    res.status(500)
  }
  res.send(data)

}
