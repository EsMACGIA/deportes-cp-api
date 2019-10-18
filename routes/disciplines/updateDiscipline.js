'use strict'

// Controllers
const disciplinesController = require('../../controllers/disciplines.controller')

module.exports = async (req, res) => {

  var data = await disciplinesController.updateDiscipline(req.body)

  res.send(data)

}
