'use strict'

// Configuration 
const config = require('../config')
const debug = require('debug')(`${config.debug}controllers:users`)
const dbPostgres = require('../db').postgres()
const hashing = require('../utilities/hashing')
const objFuncs = require('../utilities/objectFunctions')
const jwt = require('../utilities/jwt')

/**
 * Create user in the database
 * @param {Object} userData data of the login user
 */
async function loginUser (userData) {

  var data = null 

  //checking if object is valid
  var data_body = objFuncs.checkBody(userData, "user_login")
  if( data_body.error ){
    return data_body
  }
  
  try {

    var email = userData.email
    var password = userData.password
    data = await dbPostgres.sql('users.getUser', { email })

    if( data.rows.length < 1 ){
        data = {
            error: "Not such user",
            code: 404
        }
        return data
    }

    var user = data.rows[0];
    //checking if the password is correct
    if (!hashing.verifyHash(password, user.password)){
        data = {
            error: "Wrong password",
            code: 401
        }
        return data
    }

    //case where all data was valid
    var jwtObj = {
        id: user.id
    }
    
    var token = jwt.signToken(jwtObj);

    data = {
        token: token
    }

    return data

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



module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser
}
