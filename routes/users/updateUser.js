'use strict'

// Controllers
const usersController = require('../../controllers/users.controller')

module.exports = async (req, res) => {

  var data = await usersController.updateUser(req.body)

  // if (data.constructor === Array) {
  //   res.status(200)
  // } else {
  //   data = {
  //     error: 'Something is wrong!'
  //   }
  //   res.status(500)
  // }

  res.send(data)

}
