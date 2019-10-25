'use strict'

// Controllers
const comissionsController = require('../../controllers/comissions.controller')

module.exports = async (req, res) => {

  var data = await comissionsController.getAllComissions()

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