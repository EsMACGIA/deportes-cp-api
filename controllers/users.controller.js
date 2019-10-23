'use strict'

// Configuration 
const config = require('../config')

const debug = require('debug')(`${config.debug}controllers:users`)
const dbPostgres = require('../db/').postgres()
const hashing = require('../utilities/hashing')
const objFuncs = require('../utilities/objectFunctions')

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

  var data_body = objFuncs.checkUserBody(userData)
  if( data_body.error ){
    return data_body
  }
  
  try {
    userData.password = await hashing.createHash(userData.password)
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
  var data_body = objFuncs.checkUserBody(user)
  if( data_body.error ){
    return data_body
  }

  try {
    user.password = await hashing.createHash(user.password)
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
  createUser,
  updateUser,
  deleteUser
}
