'use strict'

// Controllers
const classesController = require('../../controllers/classes.controller')

module.exports = async (req, res) => {
  
  var id = req.params.id
  var user_token = req.user.user

  var data = await classesController.getSchedule(id, user_token)

  res.send(data)

}