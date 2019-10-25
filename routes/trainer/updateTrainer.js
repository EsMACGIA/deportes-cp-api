'use strict'

// Controllers
const trainerController = require('../../controllers/trainer.controller')

module.exports = async (req, res) => {

  var data = await trainerController.updateTrainer(req.body)

  if (data.error) {
    res.status(data.code)
    delete data['code']
  } else {
    res.status(201)
  }

  res.send(data)

}
