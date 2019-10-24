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

  //checking if object is valid
  var data_body = objFuncs.checkBody(userData, "user")
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
    
    if (error.queryContext.error.constraint == 'users_ci_key') {
      data = {
        error: 'ci_key is already in the database'
      }
    } else if(error.queryContext.error.constraint == 'users_email_key'){
      data = {
        error: 'email_key is already in the database'
      }      
    } else if(error.queryContext.error.constraint == 'users_type_check'){
      data = {
        error: 'type is not a value between 1 and 3'
      }      
    } else {
      data = {
        error: 'Unidentified error'
      }      
    }
  
  }
  return data

}
async function updateUser (user) {

  var data = null

  //checking if object is valid
  var data_body = objFuncs.checkBody(user, "user")
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
