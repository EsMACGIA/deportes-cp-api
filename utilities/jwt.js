'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')
const debug = require('debug')(`${config.debug}utilities:jwt`)

/**
 * Creates a JWT Token with provided payload
 * @param {Object} payload Token payload
 */
function signToken (payload) {

  // All tokens expires in a day
  var jwt_conf = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, config.jwt_key, jwt_conf)

}

/**
 * Validates a token with local JWT key
 * @param {string} token JWT to be validated
 */
function verifyToken (token) {

  var validation = null

  try {
    validation = jwt.verify(token, config.jwt_key) 
  } catch (error) {
    debug('Error:', JSON.stringify(error))
    validation = { error: error.message }
  }

  return validation
}

/**
 * Confirm a user's role to give proper privileges over a view
 * @param  {Object} user_token object with extracted from payload that has the user information
 * @param  {string} role_required role that is required for the view
 * @param {int} required_id id requerido para la vista, poner -1 si no es requerido
 */
function verifyRole (user_token, role_required, required_id){

  var data = {}
  var role = user_token.role
  if (role_required == "commission" && (role != "commission" && role != "admin")) {
    data.error = "No tiene los privilegios de comisión para esta funcionalidad"
    data.code = 401
  }

  if(role_required == "admin" && role != "admin"){
    data.error = "No tiene los privilegios de administrador para esta funcionalidad"
    data.code = 401
  }

  if(role_required == "trainer" && role != "trainer" && role != "commission" && role != "admin"){
    data.error = "No tiene los privilegios de entrenador para esta funcionalidad"
    data.code = 401
  }

  if ( (role == "commission" && role_required == "commission") && user_token.id != required_id && required_id != -1){
    data.error = "Tu usuario no tiene los privilegios para acceder a la vista de otro usuario"
    data.code = 401
  }

  if ( (role == "trainer" && role_required == "trainer") && user_token.id != required_id && required_id != -1){
    data.error = "Tu usuario no tiene los privilegios para acceder a la vista de otro usuario"
    data.code = 401
  }

  return data
}

module.exports = {
  signToken,
  verifyToken,
  verifyRole
}
