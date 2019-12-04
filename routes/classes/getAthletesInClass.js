'use strict'

// Controllers
const classesController = require('../../controllers/classes.controller')

module.exports = async (req, res) => {
  
  var id = req.body.class_id
  var data = await classesController.getAthletesInClass(id)

  res.send(data)

}