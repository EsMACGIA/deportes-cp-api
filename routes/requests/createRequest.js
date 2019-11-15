'use strict'

// Controllers
const requestsController = require('../../controllers/requests.controller')

module.exports = async (req, res) => {

  var requestData = req.body

  var data = await requestsController.createRequest(requestData)

  if (data.error) {
    res.status(data.code)
    delete data['code']
  } else {
    res.status(201)
  }
  res.send(data)

}
