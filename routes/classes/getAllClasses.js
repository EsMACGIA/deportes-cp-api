'use strict'

// Controllers
const classesController = require('../../controllers/classes.controller')

module.exports = async (req, res) => {

  var data = await classesController.getAllClasses()

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

