'use strict'

// Controllers
const trainerController = require('../../controllers/trainer.controller')

module.exports = async (req, res) => {

  var trainerData = req.body

  var data = await trainerController.createTrainer(trainerData, res)

  if (data.error) {
    res.status(data.code)
    delete data['code']
  } else {
    res.status(201)
  }
  res.send(data)

}
