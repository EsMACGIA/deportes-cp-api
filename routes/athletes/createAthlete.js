'use strict'

// Controllers
const athletesController = require('../../controllers/athletes.controller')

module.exports = async (req, res) => {

  var athleteData = req.body
  var user_token = req.user.user
  var data = await athletesController.createAthlete(athleteData, user_token)

  if (data.error) {
    res.status(data.code)
    delete data['code']
  } else {
    res.status(201)
  }
  res.send(data)

}
