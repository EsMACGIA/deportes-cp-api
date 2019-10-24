'use strict'

const bcrypt = require('bcrypt')
const config = require('../config')
const debug = require('debug')(`${config.debug}utilities:hashing`)

/**
 * Creates a hash from a string
 * @param {String} string String to be hashed
 */
function createHash (string) {

  try {
    if(string.length > 0){
      var salt = bcrypt.genSaltSync(parseInt(config.salt));
      var hash = bcrypt.hashSync(string, salt);
    } else {
      hash = string
    }


  } catch (error) {
    // Error handling
    debug('Error: ', error)
    hash = {
      error: `Error hashing the provided string ${error}`
    }
  }

  return hash

}

/**
 * Compares a string with a hash to verify them
 * @param {String} string String to be verified
 * @param {String} hash Hash to verify if it matches with the strings
 */
function verifyHash (string, hash) {

  try {

    var verification = bcrypt.compareSync(string,hash)

  } catch (error) {
    // Error handling
    debug('Error: ', error)
    verification = {
      error: `Error comparing the string with the hash ${error}`
    }
  }

  return verification
}

module.exports = {
  createHash,
  verifyHash
}