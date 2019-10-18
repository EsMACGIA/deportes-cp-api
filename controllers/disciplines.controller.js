'use strict'

// Configuration 
const config = require('../config')

const debug = require('debug')(`${config.debug}controllers:users`)
const dbPostgres = require('../db/').postgres()

/**
 * Deletes a user in the database
 */
<<<<<<< HEAD
async function deleteUser (id) {
=======
async function deleteDiscipline (id) {
>>>>>>> 1ed5573cd495dd42af0ada66915f61766b199b9c

  var data = null

  try {

<<<<<<< HEAD
    data = await dbPostgres.sql('users.deleteUser', { id })
=======
    data = await dbPostgres.sql('disciplines.deleteDiscipline', { id })
>>>>>>> 1ed5573cd495dd42af0ada66915f61766b199b9c

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
<<<<<<< HEAD
    data = await dbPostgres.sql('users.getAllUsers')
=======
    data = await dbPostgres.sql('disciplines.getAllDisciplines')
>>>>>>> 1ed5573cd495dd42af0ada66915f61766b199b9c

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
    data = {
      error: 'Something is wrong!'
    }
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
    data = {
      error: 'Something is wrong!'
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
