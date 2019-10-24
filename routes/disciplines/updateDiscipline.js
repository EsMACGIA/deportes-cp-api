'use strict'

// Controllers
const disciplinesController = require('../../controllers/disciplines.controller')

module.exports = async (req, res) => {

  var data = await disciplinesController.updateDiscipline(req.body)

  if (data.error) {
    res.status(data.code)
    delete data['code']
  } else {
    res.status(201)
  }
  res.send(data)

}
