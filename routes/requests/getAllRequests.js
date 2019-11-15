'use strict'

// Controllers
const requestsController = require('../../controllers/requests.controller')

module.exports = async (req, res) => {

  var data = await requestsController.getAllRequests()

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

