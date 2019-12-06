'use strict'

// Controllers
const classesController = require('../../controllers/classes.controller')

module.exports = async (req, res) => {

  var id = req.body.class_id
  var user_token = req.user.user

  var data = await classesController.getAthletesInClass(id, user_token)


  res.send(data)

}