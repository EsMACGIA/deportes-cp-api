'use strict'

// Controllers
const trainerController = require('../../controllers/trainer.controller')

module.exports = async (req, res) => {

  var id = req.params.id

  var data = await trainerController.deleteTrainer(id)

  res.send(data)

}