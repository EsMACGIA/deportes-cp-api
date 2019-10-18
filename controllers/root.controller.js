'use strict'

// Configuration 
const config = require('../config')

const debug = require('debug')(`${config.debug}controllers:root`)
const dbPostgres = require('../db/').postgres()

/**
 * Base Route Data
 */
async function rootFunction () {

  var data = null

  try {
    // Test Connection To Database
    data = await dbPostgres.sql('root.getUsers')

    debug('Data: ', data)

    data = {
      nameserver: 'DeportesCP Backend',
      author: 'MACGIA',
      port: config.port,
      code: 200
    }
  } catch (err) {
    // Error handling
    debug('Error: ', err)
    data = null
  }

  return data

}

module.exports = {
  rootFunction
}
