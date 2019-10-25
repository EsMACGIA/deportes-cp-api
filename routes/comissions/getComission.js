'use strict'

// Controllers
const comissionsController = require('../../controllers/comissions.controller')

module.exports = async (req, res) => {
  
  var id = req.params.id

  var data = await comissionsController.getComission(id)

  res.send(data)

}