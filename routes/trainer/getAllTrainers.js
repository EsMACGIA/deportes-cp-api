'use strict'

// Controllers
const trainerController = require('../../controllers/trainer.controller')

module.exports = async (req, res) => {

  var data = await trainerController.getAllTrainers()

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
