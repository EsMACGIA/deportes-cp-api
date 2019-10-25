'use strict'

// Controllers
const trainersController = require('../../controllers/trainers.controller')

module.exports = async (req, res) => {

  var trainerData = req.body

  var data = await trainersController.createTrainer(trainerData, res)

  if (data.error) {
    res.status(data.code)
    delete data['code']
  } else {
    res.status(201)
  }
  res.send(data)

}
