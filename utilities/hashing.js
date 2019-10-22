
const bcrypt = require('bcrypt')
const config = require('../config')
const debug = require('debug')(`${config.debug}utilities:hashing`)

async function hashString (string) {

  try {
    console.log(config.salt)
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

module.exports = {hashString}