'use strict'

// Controllers
const requestsController = require('../../controllers/requests.controller')

module.exports = async (req, res) => {

  var user_token = req.user.user
  var data = await requestsController.getAllRequests(user_token)

  if (data.error) {
    res.status(data.code)
    delete data['code']
  } else {
    res.status(201)
  }

  res.send(data)

}

