'use strict'

// Configuration 
const config = require('../config')

const debug = require('debug')(`${config.debug}controllers:users`)
const dbPostgres = require('../db/').postgres()

/**
 * Deletes a user in the database
 */
async function deleteDiscipline (id) {

  var data = null

  try {

    data = await dbPostgres.sql('disciplines.deleteDiscipline', { id })

  } catch (error) {
    // Error handling
    debug('Error: ', error)
    data = {
      error: 'Something is wrong!'
    }
  }

  return data

}

/**
 * Gets all user in the database
 */
async function getAllDisciplines () {

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

/**
 * Create user into the database
 */
async function createUser (userData) {

  var data = null 


  try {

    data = await dbPostgres.sql('users.createUser', userData)

    debug('Date: ', data)

    data = data.rows

  }catch (error) {
    //Error handling
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
  getAllDisciplines,
  createUser,
  updateUser,
  deleteDiscipline,
}
