'use strict'

// Controllers
const disciplineController = require('../../controllers/disciplines.controller')

module.exports = async (req, res) => {

  var disciplineData = req.body
    
  var data = await disciplineController.createDiscipline(disciplineData)

  if (data.constructor === Array) {
    res.status(200)
  } else {
    data = {
      error: 'Something is wrong!'
    }
    res.status(500)
  }

  res.send(data)

}
