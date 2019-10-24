'use strict'

// Configuration 
const config = require('../config')

const debug = require('debug')(`${config.debug}controllers:authentication`)
const users = require('./users.controller')
const email = require('../utilities/email')
const randomstring = require('randomstring')

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
  restorePassword
}
