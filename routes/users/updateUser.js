'use strict'

// Controllers
const usersController = require('../../controllers/users.controller')

module.exports = async (req, res) => {

  var data = await usersController.updateUser(req.body)


  res.send(data)

}
