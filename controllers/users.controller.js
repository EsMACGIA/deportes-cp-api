'use strict'

// Configuration 
const config = require('../config')

const debug = require('debug')(`${config.debug}controllers:users`)
const dbPostgres = require('../db/').postgres()

/**
 * Gets all user in the database
 */
async function getAllUsers () {

  var data = null

  try {
    data = await dbPostgres.sql('users.getAllUsers')

    debug('Data: ', data)
    
    data = data.rows

  } catch (error) {
    // Error handling
    debug('Error: ', error)
    data = {
      error: 'Something is wrong!'
    }
  }

  return data

}

async function updateUser (user) {

  var data = null

  try {
    
    data = await dbPostgres.sql('users.updateUser', user)

  } catch (error) {
    // Error handling
    debug('Error: ', error)
    data = {
      error: 'Something is wrong!'
    }
  }

  return data

}

module.exports = {
  getAllUsers, 
  updateUser
}
