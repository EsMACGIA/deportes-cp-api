'use strict'

const bcrypt = require('bcrypt')
const config = require('../config')
const debug = require('debug')(`${config.debug}utilities:hashing`)

/**
 * Creates a hash from a string
 */
function createHash (string) {

  try {
    var salt = bcrypt.genSaltSync(parseInt(config.salt));
    var hash = bcrypt.hashSync(string, salt);

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
  verifyHash}