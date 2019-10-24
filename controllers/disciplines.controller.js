'use strict'

// Configuration 
const config = require('../config')

const debug = require('debug')(`${config.debug}controllers:disciplines`)
const dbPostgres = require('../db/').postgres()
const objFuncs = require('../utilities/objectFunctions')

/**
 * Deletes a discipline from the database
 */
async function deleteDiscipline (id) {

  var data = null

  try {

    data = await dbPostgres.sql('disciplines.deleteDiscipline', { id })

  } catch (error) {
    // Error handling
    debug('Error: ', error)
    data = {
      error: 'Something is wrong!'
    }
  }

  return data

}

/**
 * Gets all user in the database
 */
async function getAllDisciplines () {

  var data = null

  try {
    data = await dbPostgres.sql('disciplines.getAllDisciplines')

    debug('Data: ', data)
    
    data = data.rows

  } catch (error) {
    // Error handling
    debug('Error: ', error)
    data = {
      error: 'Something is wrong!'
    }
  }

  return data

}

/**
 * Create user into the database
 */
async function createDiscipline (disciplineData) {

  var data = null 

  //checking if object is valid
  var data_body = objFuncs.checkBody(disciplineData, "discipline")
  if( data_body.error ){
    return data_body
  }


  try {

    data = await dbPostgres.sql('disciplines.createDiscipline', disciplineData)

    data = data.rows

  }catch (error) {
    //Error handling
    debug('Error: ', error)

    // Set error message
    data = handleDatabaseValidations(error)
  }
  return data

}
async function updateDiscipline (discipline) {

  var data = null

  //checking if object is valid
  var data_body = objFuncs.checkBody(discipline, "discipline_update")
  if( data_body.error ){
    return data_body
  }

  try {
    
    data = await dbPostgres.sql('disciplines.updateDiscipline', discipline)

  } catch (error) {
    // Error handling
    debug('Error: ', error)

    // Set error message
    data = handleDatabaseValidations(error)
  }

  return data

}

function handleDatabaseValidations(error) {

  var data = null

  // Check if the database constraint error matches the expected error
  if (error.queryContext.error.constraint == 'discipline_name_key') {
    data = {
      error: `name is already in the database`
    }
  }else{
    data = {
      error: 'Unidentified error'
    }
  }

  data.code = 400

  return data
}

module.exports = {
  getAllDisciplines,
  createDiscipline,
  deleteDiscipline,
  updateDiscipline
}
