'use strict'

// Controllers
const classesController = require('../../controllers/classes.controller')

module.exports = async (req, res) => {
  
  var athlete_id = req.body.athlete_id
  var class_id = req.body.class_id
  var user_token = req.user.user

  var data = await classesController.deleteAthleteInClass(athlete_id, class_id, user_token)

  res.send(data)

}