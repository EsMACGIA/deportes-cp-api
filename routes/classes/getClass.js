'use strict'

// Controllers
const classesController = require('../../controllers/classes.controller')

module.exports = async (req, res) => {
  
  var id = req.params.id

  var data = await classesController.getClass(id)

  res.send(data)

}