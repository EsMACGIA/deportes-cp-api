'use strict'

// Configuration 
const config = require('../config')

const debug = require('debug')(`${config.debug}controllers:users`)
const dbPostgres = require('../db/').postgres()

/**
 * Deletes a user in the database
 */
async function deleteUser (id) {

  var data = null

  try {

    data = await dbPostgres.sql('users.deleteUser', { id })

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

/**
 * Get the information of a given user
 * @date 2019-10-23
 * @param {number} id Id of the user to be consulted
 */
async function getUser(id) {

  var data = null

  try {
    data = await dbPostgres.sql('users.getUser', { id })

    data = data.rows[0]

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
  createUser,
  updateUser,
  deleteUser,
  getUser
}
