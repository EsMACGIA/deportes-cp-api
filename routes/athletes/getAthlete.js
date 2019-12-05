'use strict'

// Controllers
const athletesController = require('../../controllers/athletes.controller')

module.exports = async (req, res) => {
  
  var id = req.params.id
  var user_token = req.user.user
  var data = await athletesController.getAthlete(id, user_token)

  res.send(data)

}