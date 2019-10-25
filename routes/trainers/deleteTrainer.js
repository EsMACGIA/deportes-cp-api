'use strict'

// Controllers
const trainersController = require('../../controllers/trainers.controller')

module.exports = async (req, res) => {

  var id = req.params.id

  var data = await trainersController.deleteTrainer(id)

  res.send(data)

}