'use strict'

// Controllers
const athletesController = require('../../controllers/athletes.controller')

module.exports = async (req, res) => {

  var athleteData = req.body

  var data = await athletesController.createAthlete(athleteData, res)

  if (data.error) {
    res.status(data.code)
    delete data['code']
  } else {
    res.status(201)
  }
  res.send(data)

}
