'use strict'

// Configuration 
const config = require('../config')
const jwt = require('../utilities/jwt')
const debug = require('debug')(`${config.debug}controllers:comissions`)
const dbPostgres = require('../db/').postgres()
const hashing = require('../utilities/hashing')
const objFuncs = require('../utilities/objectFunctions')

/**
 * Deletes a commision from the database
 * @param {number} id Comission's id
 * @param {Object} user_token objeto que tiene la informacion del usuario que quiere usar la funcionalidad
 */
async function deleteComission (id, user_token) {

  var data = null
  // verify that the role is the correct for the view 
  data = jwt.verifyRole(user_token, "admin", -1)
  if (data.error) { return data }

  try {

    data = await dbPostgres.sql('users.deleteUser', { id })

  } catch (error) {
    // Error handling
    debug('Error: ', error)
    data = {
      error: 'No se pudo eliminar la comisión'
    }
    data.code = 400

  }

  return data

}

/**
 * Gets all comissions in the database
 * @param {Object} user_token objeto que tiene la informacion del usuario que quiere usar la funcionalidad
 */
async function getAllComissions (user_token) {

  var data = null
  // verify that the role is the correct for the view 
  data = jwt.verifyRole(user_token, "admin", -1)
  if (data.error) { return data }

  try {
    data = await dbPostgres.sql('comissions.getAllComissions')

    data = data.rows

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

/**
 * Create comission in the database
 * @param {Object} comissionData data of the new comission
 * @param {Object} user_token objeto que tiene la informacion del usuario que quiere usar la funcionalidad
 */
async function createComission (comissionData, user_token) {

  var data = null 
  // verify that the role is the correct for the view 
  data = jwt.verifyRole(user_token, "admin", -1)
  if (data.error) { return data }

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
 * @param {Object} user_token objeto que tiene la informacion del usuario que quiere usar la funcionalidad
 */
async function updateComission (comission, user_token) {

  var data = null
  // verify that the role is the correct for the view 
  data = jwt.verifyRole(user_token, "commission", comission.id)
  if (data.error) { return data }

  //checking if object is valid
  var data_body = objFuncs.checkBody(comission, "comissionCreated")
  if( data_body.error ){
    return data_body
  }

  try {

    if(comission.password == ""){

      data = await dbPostgres.sql('comissions.updateComission', comission)    
      
    } else {
      
      comission.password = hashing.createHash(comission.password)
    
      await dbPostgres.transaction(async transaction_db => { // BEGIN

        data = await transaction_db.sql('users.updateUser', comission)
        await transaction_db.sql('comissions.updateComission', comission)
      })
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
 * Get the information of a given comission
 * @date 2019-10-23
 * @param {nustring} id id of the comission to be consulted
 * @param {Object} user_token objeto que tiene la informacion del usuario que quiere usar la funcionalidad
 */
async function getComission(id, user_token) {

  var data = null
  // verify that the role is the correct for the view 
  data = jwt.verifyRole(user_token, "commission", id)
  if (data.error) { return data }

  try {
    data = await dbPostgres.sql('comissions.getComission', { id })

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

/**
 * List trainers of the given comission 
 * @date 2019-11-14
 * @param {integer} id id of the comission to be consulted
 * @param {Object} user_token objeto que tiene la informacion del usuario que quiere usar la funcionalidad
 */
async function listTrainers(id, user_token) {

  var data = null
  // verify that the role is the correct for the view 
  data = jwt.verifyRole(user_token, "commission", id)
  if (data.error) { return data }

  try {

    data = await dbPostgres.sql('comissions.listTrainers', { id })

    data = data.rows
    
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

/**
 * List classes of the given comission 
 * @date 2019-11-26
 * @param {integer} id id of the comission to be consulted
 * @param {Object} user_token objeto que tiene la informacion del usuario que quiere usar la funcionalidad
 */
async function listClasses(id, user_token) {

  var data = null
  // verify that the role is the correct for the view 
  data = jwt.verifyRole(user_token, "commission", id)
  if (data.error) { return data }

  try {

    data = await dbPostgres.sql('comissions.listClasses', { id })
    data = data.rows
    
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
  } else if(constraint == 'comission_name_check'){
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


module.exports = {
  getAllComissions,
  createComission,
  updateComission,
  deleteComission,
  getComission,
  listTrainers,
  listClasses
}