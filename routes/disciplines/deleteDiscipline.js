'use strict'

// Controllers
const disciplineController = require('../../controllers/disciplines.controller')

module.exports = async (req, res) => {

  var id = req.params.id

  var data = await disciplineController.deleteDiscipline(id)

  res.send(data)

}