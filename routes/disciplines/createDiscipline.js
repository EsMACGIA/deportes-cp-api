'use strict'

// Controllers
const disciplineController = require('../../controllers/disciplines.controller')

module.exports = async (req, res) => {

  var disciplineData = req.body
    
  var data = await disciplineController.createDiscipline(disciplineData)

  if (data.error) {
    res.status(data.code)
    delete data['code']
  } else {
    res.status(201)
  }
  res.send(data)

}
