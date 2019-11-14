'use strict'

// Controllers
const athletesController = require('../../controllers/athletes.controller')

module.exports = async (req, res) => {
  
  var id = req.params.id

  var data = await athletesController.getAthlete(id)

  res.send(data)

}