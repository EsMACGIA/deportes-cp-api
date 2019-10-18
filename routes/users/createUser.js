'use strict'

// Controllers
const usersController = require('../../controllers/users.controller')

module.exports = async (req, res) => {

  var userData = req.body
    console.log("DATA BODY:", userData)
  var data = await usersController.createUser(userData)
console.log("usuario creado: ", data);
  if (data.constructor === Array) {
    res.status(200)
  } else {
    data = {
      error: 'Something is wrong!'
    }
    res.status(500)
  }

  res.send(data)

}
