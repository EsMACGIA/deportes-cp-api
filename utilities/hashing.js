
const bcrypt = require('bcrypt')
const config = require('../config')
const debug = require('debug')(`${config.debug}utilities:hashing`)

function createHash (string) {

  try {
    var salt = bcrypt.genSaltSync(parseInt(config.salt));
    var hash = bcrypt.hashSync(string, salt);

  } catch (error) {
    // Error handling
    debug('Error: ', error)
    data = {
      error: 'Something is wrong!'
    }
  }

  return hash

}

function verifyHash (string, hash) {

  try {

    var verification = bcrypt.compareSync(string,hash)

  } catch (error) {
    // Error handling
    debug('Error: ', error)
    data = {
      error: 'Something is wrong!'
    }
  }

  return verification
}

module.exports = {
  createHash,
  verifyHash}