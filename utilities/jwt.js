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

module.exports = {
  signToken,
  verifyToken
}
