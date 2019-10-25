'use strict'

// Controllers
const trainersController = require('../../controllers/trainers.controller')

module.exports = async (req, res) => {

  var data = await trainersController.getAllTrainers()

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
