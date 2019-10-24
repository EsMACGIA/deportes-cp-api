'use strict'

// Controllers
const usersController = require('../../controllers/users.controller')

module.exports = async (req, res) => {

  var userData = req.body

  var data = await usersController.createUser(userData, res)

  if (data.error) {
    res.status(data.code)
    delete data['code']
  } else {
    res.status(201)
  }
  res.send(data)

}
