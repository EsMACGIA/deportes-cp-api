'use strict'

// Controllers
const trainersController = require('../../controllers/trainers.controller')

module.exports = async (req, res) => {

  var user_token = req.user.user
  var data = await trainersController.updateTrainer(req.body, user_token)

  if (data.error) {
    res.status(data.code)
    delete data['code']
  } else {
    res.status(201)
  }

  res.send(data)

}
