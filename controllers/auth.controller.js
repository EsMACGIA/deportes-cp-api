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
const trainersController = require('./trainers.controller')

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
            error: "Los datos proporcionados son inválidos",
            code: 404
        }
        return data
    }

    var user = data.rows[0];
    //checking if the password is correct
    if (!hashing.verifyHash(password, user.password)){
        data = {
            error: "Los datos proporcionados son inválidos",
            code: 401
        }
        return data
    }

    var trainer = await trainersController.getTrainer(data.rows[0].id);

    //case where all data was valid
    var jwtObj = {
        id: user.id
    }
    
    var token = jwt.signToken(jwtObj);
    
    data = {
      token: token
    }

    if (trainer.ci) {
      data.type = 3
    } else if(email == config.roles.admin){
      data.type = 1
    } else {
      data.type = 2
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
 * @param {string} account
 * @returns {any}
 */
async function restorePassword(account){

  var data = null

  var user = await users.getUser(account)
  try{
    if(user.email){
      var passwd = randomstring.generate(8)
      user.password = hashing.createHash(passwd)
      data = await dbPostgres.sql('users.updateUser', user)
  
      email.sendEmail(account, 
      'Recuperacion de contraseña', 
      `Estimad@ usuari@, su contraseña temporal es ${passwd}.\nAtentamente, Sistema de Deportes CP`)
  
      }else{
  
        data = {
          error: "El usuario no existe en la base de datos",
          code : "400"
        }   
    
      }
  }catch(error){
     // Error handling
     debug('Error: ', error)

     // Get error's message
     data = {
       error : "Unknown error when recovering password",
       code : "400"
     }
  }

  return data
}

module.exports = {
  restorePassword,
  loginUser
}
