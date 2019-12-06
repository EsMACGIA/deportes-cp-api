'use strict'

// Configuration 
const config = require('../config')
const jwt = require('../utilities/jwt')
const debug = require('debug')(`${config.debug}controllers:athletes`)
const dbPostgres = require('../db/').postgres()
const objFuncs = require('../utilities/objectFunctions')

/**
 * Deletes a athlete from the database
 * @param {number} id Athlete's id
 */
async function deleteAthlete (id, token) {

  var data = null
  // verify that the role is the correct for the view 
  data = jwt.verifyRole(token, "commission", -1)
  if (data.error) { return data }

  try {

    data = await dbPostgres.sql('athlete.deleteAthlete', { id })
    data.code = 201

  } catch (error) {
    // Error handling
    
    data = {
      error: 'No se pudo eliminar al atleta' 
    }
    error.code = 400

  }

  return data

}

/**
 * Gets all athlete in the database
 */
async function getAllAthletes (token) {

  var data = null
  // verify that the role is the correct for the view 
  data = jwt.verifyRole(token, "commission", -1)
  if (data.error) { return data }

  try {
    data = await dbPostgres.sql('athlete.getAllAthletes')

    data = data.rows
    data.code = 201

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
 * Create athlete in the database
 * @param {Object} athleteData data of the new athlete
 */
async function createAthlete (athleteData, token) {

  var data = null 
  // verify that the role is the correct for the view 
  data = jwt.verifyRole(token, "commission", -1)
  if (data.error) { return data }

  //checking if object is valid
  var data_body = objFuncs.checkBody(athleteData, "athlete")
  if( data_body.error ){
    return data_body
  }

  try {
    
    if(athleteData.ci == ''){
      data = await dbPostgres.sql('athlete.createAthleteNullCI', athleteData)
    }else {
      data = await dbPostgres.sql('athlete.createAthlete', athleteData)
    }

    data = data.rows

  }catch (error) {
    //Error handling
    debug('Error: ', error)

    // Set error message
    data = handleDatabaseValidations(error)
  }
  return data
}
/**
 * Function that updates an athlete's information
 * @param {Object} athlete Trainer that it's information is going to be updated
 */
async function updateAthlete (athlete, token) {

  var data = null
  // verify that the role is the correct for the view 
  data = jwt.verifyRole(token, "commission", -1)
  if (data.error) { return data }

  //checking if object is valid
  var data_body = objFuncs.checkBody(athlete, "athlete_update")
  if( data_body.error ){
    return data_body
  }

  try {

    if(athlete.ci == ''){
      data = await dbPostgres.sql('athlete.updateAthleteNullCI', athlete)
    }else {
      data = await dbPostgres.sql('athlete.updateAthlete', athlete)
    }
    
  } catch (error) {
    // Error handling
    debug('Error: ', error)

    // Set error message
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
  if (constraint == 'athlete_ci_key') {
    data = {
      error: 'Ya existe un atleta en el sistema con esa cédula'
    } 
  } else if(constraint == 'athlete_ci_check'){
    data = {
      error: 'Cédula debe ser un valor entre 1 y 999999999 '
    }
  } else if(constraint == 'users_name_check'){
    data = {
      error: 'Nombre de atleta requerido'
    }
  } else if(constraint == 'athlete_lastname_check'){
    data = {
      error: 'Apellido de atleta requerido'
    }
  } else if(constraint == 'athlete_stock_number_check'){
    data = {
      error: 'El numero de accion debe ser mayor a 0'
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

  debug('CONSTRAINT', constraint)

  return data

}

/**
 * Get the information of a given athlete
 * @date 2019-10-23
 * @param {nustring} email email of the athlete to be consulted
 */
async function getAthlete(id, token) {

  var data = null
  // verify that the role is the correct for the view 
  data = jwt.verifyRole(token, "commission", -1)
  if (data.error) { return data }

  try {
    data = await dbPostgres.sql('athlete.getAthlete', { id })
    
    if (data.rows.length != 0){
      data = data.rows[0]
    }else{
      data = {}
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
  getAllAthletes,
  createAthlete,
  updateAthlete,
  deleteAthlete,
  getAthlete
}
