'use strict'

// Controllers
const trainersController = require('../../controllers/trainers.controller')

module.exports = async (req, res) => {
  
  var id = req.params.id
  var user_token = req.user.user
  var data = await trainersController.listClasses(id, user_token)

  if (data.error) {
    res.status(data.code)
    delete data['code']
  } else {
    res.status(201)
  }
  res.send(data)

}