'use strict'

// Controllers
const usersController = require('../../controllers/users.controller')

module.exports = async (req, res) => {

  var data = await usersController.updateUser(req.body)

<<<<<<< HEAD
=======
  if (data.error) {
    res.status(data.code)
    delete data['code']
  } else {
    res.status(201)
  }
>>>>>>> ebf6bfb76f04afad2053d786256d0f5370f085e3

  res.send(data)

}
