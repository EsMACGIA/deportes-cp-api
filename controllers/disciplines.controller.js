'use strict'

// Configuration 
const config = require('../config')

const debug = require('debug')(`${config.debug}controllers:disciplines`)
const dbPostgres = require('../db/').postgres()

/**
 * Deletes a user in the database
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


  try {

    data = await dbPostgres.sql('disciplines.createDiscipline', disciplineData)

    debug('Date: ', data)

    data = data.rows

  }catch (error) {
    //Error handling
    debug('Error: ', error)
    data = setError(error)
  }
  return data

}
async function updateDiscipline (discipline) {

  var data = null

  try {
    
    data = await dbPostgres.sql('disciplines.updateDiscipline', discipline)

  } catch (error) {
    // Error handling
    debug('Error: ', error)
    data = setError(error)
  }

  return data

}

function setError(error) {
  var data = null
  if (error.queryContext.error.constraint == 'discipline_name_key') {
    data = {
      error: 'name_key is already in the database'
    }
  }else{
    data = {
      error: 'Unidentified error'
    }
  }
  return data
}

module.exports = {
  getAllDisciplines,
  createDiscipline,
  deleteDiscipline,
  updateDiscipline
}
