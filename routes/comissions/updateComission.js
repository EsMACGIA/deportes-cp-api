'use strict'

// Controllers
const comissionsController = require('../../controllers/comissions.controller')

module.exports = async (req, res) => {

  var data = await comissionsController.updateComission(req.body)

  if (data.error) {
    res.status(data.code)
    delete data['code']
  } else {
    res.status(201)
  }

  res.send(data)

}
