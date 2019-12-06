'use strict'

// Controllers
const classesController = require('../../controllers/classes.controller')

module.exports = async (req, res) => {

  var user_token = req.user.user
  var data = await classesController.getAllClasses(user_token)

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

