'use strict'

// Controllers
const usersController = require('../../controllers/users.controller')

module.exports = async (req, res) => {

  var id = req.params.id

  var data = await usersController.deleteUser(id)

  res.send(data)

}