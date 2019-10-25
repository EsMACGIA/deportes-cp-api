'use strict'

// Configuration 
const config = require('../config')
const debug = require('debug')(`${config.debug}controllers:auth`)
const dbPostgres = require('../db').postgres()
const hashing = require('../utilities/hashing')
const objFuncs = require('../utilities/objectFunctions')
const jwt = require('../utilities/jwt')
const users = require('./users.controller')
const email = require('../utilities/email')
const randomstring = require('randomstring')

/**
 * Login user returning a token
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


/**
 * Function to restore password for a certain user
 * @date 2019-10-24
 * @param {any} account
 * @returns {any}
 */
async function restorePassword(account){

  var data = null
  user = users.getUser(account)  
  if(user.name){
    user.password = randomstring.generate(8)
    data = users.updateUser(user)
    data.code = 201
    email.sendEmail(account, 
    'Recuperacion de contraseña', 
    `Estimad@ ${user.name} ${user.lastname}, su contraseña temporal es ${user.password}.\nAtentamente, Sistema de Deportes CP`)
  }else{
    data = {
      error: 'User not in database'
    }   
  }
  return data
}

module.exports = {
  restorePassword,
  loginUser
}
