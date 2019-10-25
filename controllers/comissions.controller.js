'use strict'

// Configuration 
const config = require('../config')

const debug = require('debug')(`${config.debug}controllers:comissions`)
const dbPostgres = require('../db/').postgres()
const hashing = require('../utilities/hashing')
const objFuncs = require('../utilities/objectFunctions')

/**
 * Deletes a commision from the database
 * @param {number} id Comission's id
 */
async function deleteComission (id) {

  var data = null

  try {

    data = await dbPostgres.sql('users.deleteUser', { id })

  } catch (error) {
    // Error handling
    debug('Error: ', error)
    data = {
      error: 'No se pudo eliminar la comisión'
    }
    error.code = 400

  }

  return data

}

/**
 * Gets all comissions in the database
 */
async function getAllComissions () {

  var data = null

  try {
    data = await dbPostgres.sql('comissions.getAllComissions')

    data = data.rows

  } catch (error) {
    // Error handling
    debug('Error: ', error)
    data = {
      error: 'No se pudo obtener la información de la base de datos'
    }
    error.code = 400

  }

  return data

}

/**
 * Create comission in the database
 * @param {Object} comissionData data of the new comission
 */
async function createComission (comissionData) {

  var data = null 

  //checking if object is valid
  var data_body = objFuncs.checkBody(comissionData, "comission")
  if( data_body.error ){
    return data_body
  }
  
  try {
    comissionData.password = hashing.createHash(comissionData.password)

    
    await dbPostgres.transaction(async transaction_db => { // BEGIN

        const create_result = await transaction_db.sql('users.createUser', comissionData)
      
        const user = create_result.rows[0]
        comissionData.user_id = user.id
      
        await transaction_db.sql('comissions.createComission', comissionData)
      
        return user
     })

    data = comissionData
    data.action = "CREATED"
    
  }catch (error) {
    
    //Error handling
    debug('Error: ', error)
    
    // Get error's message
    data = handleDatabaseValidations(error)
  }
  return data

}
/**
 * Function that updates a comission's information
 * @param {Object} comission Comission that it's information is going to be updated
 */
async function updateComission (comission) {

  var data = null

  //checking if object is valid
  var data_body = objFuncs.checkBody(comission, "comission")
  if( data_body.error ){
    return data_body
  }

  try {

    if(comission.password == ""){

      data = await dbPostgres.sql('comissions.updateComissionNoPassword', comission)    
      
    } else {
      
      if (typeof(comission.password) != 'string'){
        throw new Error('Password is not a string')
      }

      comission.password = hashing.createHash(comission.password)


      data = await dbPostgres.sql('comissions.updateComission', comission)

    }
  } catch (error) {
    // Error handling
    debug('Error: ', error)

    // Get error's message
    data = handleDatabaseValidations(error)
  }

  return data

}
/**
 * Function that check the error from the database and stablish error's message
 * @param {Object} error database's error
 */
function handleDatabaseValidations(error) {
  var data = null
  var constraint = null

  if(error.queryContext){
    constraint = error.queryContext.error.constraint
  } else {
    constraint = error.message
  }
  
  // Check if the database constraint error matches the expected error
  if(constraint == 'users_email_key'){
    data = {
      error: 'Ya existe una comisión en el sistema con este email'
    }      
  } else if(constraint == 'Password is not a string'){
    data = {
      error: 'La contraseña es invalida'
    }
  } else if(constraint == 'users_name_check'){
    data = {
      error: 'Nombre de comisión requerida'
    }
  }else if(constraint == 'email_type_check'){
    data = {
      error: 'Email suministrado tiene formato inválido'
    }
  } else if(constraint == 'users_password_check'){
    data = {
      error: 'Contraseña requerida'
    }
  } else if(error.queryContext){
    data = {
      error: error.message
    }
  } else{
    data = {
      error: 'Unidentified error'
    }      
  }
  data.code = 400

  return data

}

/**
 * Get the information of a given comission
 * @date 2019-10-23
 * @param {nustring} email email of the comission to be consulted
 */
async function getComission(email) {

  var data = null

  try {
    data = await dbPostgres.sql('comissions.getComission', { email })

    if (data.rows.length != 0){
      data = data.rows[0]
    }
    
  } catch (error) {
    // Error handling
    debug('Error: ', error)
    data = {
      error: 'No se pudo obtener la información de la base de datos'
    }
    data.code = 400
  }

  return data
}

module.exports = {
  getAllComissions,
  createComission,
  updateComission,
  deleteComission,
  getComission
}