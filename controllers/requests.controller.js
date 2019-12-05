'use strict'

// Configuration 
const config = require('../config')
const jwt = require('../utilities/jwt')
const debug = require('debug')(`${config.debug}controllers:requests`)
const dbPostgres = require('../db/').postgres()
const objFuncs = require('../utilities/objectFunctions')


/**
 * Gets all requests in the database
 */
async function getAllRequests (user_token) {

    var data = null
    // verify that the role is the correct for the view 
    data = jwt.verifyRole(user_token, "admin", -1)
    if (data.error) { return data }
  
    try {
      data = await dbPostgres.sql('requests.getAllRequests')
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
 * Create Request in the database
 * @param {Object} requestData data of the new request
 */
async function createRequest (requestData, user_token) {
    var data = null 
    // verify that the role is the correct for the view 
    data = jwt.verifyRole(user_token, "commission", -1)
    if (data.error) { return data }
  
    //checking if object is valid
    var data_body = objFuncs.checkBody(requestData, "request")
    if( data_body.error ){
      return data_body
    }

    
    
    try {
      
      await dbPostgres.sql('requests.createRequest', requestData)
      data = requestData
      data.action = "CREATED"
      
    }catch (error) {
      
      //Error handling
      console.log('Error: ', error)
      
      // Get error's message
      data = handleDatabaseValidations(error)
    }
    return data
  
}


/**
 * Function that checks the error from the database and stablish error's message
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
    if (constraint == 'status_domain_check') {
      data = {
        error: 'Formato de estado invalido'
      }
    } else if(constraint == 'request_class_id_fkey'){
      data = {
        error: 'No existe la clase indicada'
      }      
    
    } else if(constraint == 'request_athlete_id_fkey'){
        data = {
          error: 'No existe el atleta indicado'
        }      
    } else if(constraint == 'athlete_class_pkey'){
        data = {
          error: 'Ya se encuentra registrado en esa clase'
        }      
    } else{
      data = {
        error: 'Unidentified error'
      }      
    }
    data.code = 400
    
    debug('CONSTRAINT', constraint)
  
    return data
  
  }
  
  
  

module.exports = {
    getAllRequests,
    createRequest
}