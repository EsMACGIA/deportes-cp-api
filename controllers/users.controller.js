'use strict'

// Configuration 
const config = require('../config')

const debug = require('debug')(`${config.debug}controllers:users`)
const dbPostgres = require('../db/').postgres()
const hashing = require('../utilities/hashing')
const objFuncs = require('../utilities/objectFunctions')

/**
 * Deletes a user from the database
 * @param {number} id User's id
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
 * Create user in the database
 * @param {Object} userData data of the new user
 */
async function createUser (userData) {

  var data = null 

  //checking if object is valid
  var data_body = objFuncs.checkBody(userData, "user")
  if( data_body.error ){
    return data_body
  }
  
  try {
    userData.password = hashing.createHash(userData.password)
    data = await dbPostgres.sql('users.createUser', userData)

    data = data.rows
    
  }catch (error) {
    
    //Error handling
    debug('Error: ', error)
    
    // Get error's message
    if (data == null){
      data = handleDatabaseValidations(error)
    }
  }
  return data

}
/**
 * Function that updates an user's information
 * @param {Object} user User that it's information is going to be updated
 */
async function updateUser (user) {

  var data = null

  //checking if object is valid
  var data_body = objFuncs.checkBody(user, "user")
  if( data_body.error ){
    return data_body
  }

  try {
    user.password = hashing.createHash(user.password)

    if (typeof(user.password) != 'string'){
      throw new Error('Password is not a string')
    }

    data = await dbPostgres.sql('users.updateUser', user)
    data.code = 201

  } catch (error) {
    // Error handling
    debug('Error: ', error)

    
    // Get error's message
    data = handleDatabaseValidations(error)
  }

  return data

}
/**
 * Function that check the error from the database and stablish error's message
 * @param {Object} error database's error
 */
function handleDatabaseValidations(error) {
  var data = null
  var constraint = null
  if(error.message){
    constraint = error.message
  } else {
    constraint = error.queryContext.error.constraint
  }

  // Check if the database constraint error matches the expected error
  if (constraint == 'users_ci_key') {
    data = {
      error: 'ci is already in the database'
    }
  } else if(constraint == 'users_email_key'){
    data = {
      error: 'email is already in the database'
    }      
  } else if(constraint == 'users_type_check'){
    data = {
      error: 'type is not a value between 1 and 3'
    }      
  } else if(constraint == 'users_ci_check'){
    data = {
      error: 'ci is not a value between 1 and 999999999'
    }
  } else if(constraint == 'Password is not a string'){
    data = {
      error: constraint
    }
  } else {
    data = {
      error: 'Unidentified error'
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
