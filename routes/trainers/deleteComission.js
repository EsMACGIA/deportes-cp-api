'use strict'

// Controllers
const trainersController = require('../../controllers/trainers.controller')

module.exports = async (req, res) => {

  //this body should have the id of the trainer and the comission 
  var comissionTrainer = req.body
  var user_token = req.user.user
  var data = await trainersController.deleteComission(comissionTrainer, user_token)

  if (data.error) {
    res.status(data.code)
    delete data['code']
  } else {
    res.status(201)
  }
  res.send(data)

}
