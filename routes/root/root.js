'use strict'

// Controllers
const rootController = require('../../controllers/root.controller')

module.exports = async (req, res) => {

  var data = await rootController.rootFunction()

  res.status(data.code)
  delete data.code
  res.send(data)

}
