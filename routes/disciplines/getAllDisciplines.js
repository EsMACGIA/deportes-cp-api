'use strict'

// Controllers
const disciplinesController = require('../../controllers/disciplines.controller')

module.exports = async (req, res) => {

  var data = await disciplinesController.getAllDisciplines()

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
