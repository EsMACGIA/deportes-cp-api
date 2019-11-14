'use strict'

// Configuration 
const config = require('../config')

const debug = require('debug')(`${config.debug}controllers:classes`)
const dbPostgres = require('../db/').postgres()
const objFuncs = require('../utilities/objectFunctions')

/**
 * Deletes a class from the database
 * @param {number} id Class' id
 */
async function deleteClass (id) {

    var data = null
  
    try {
  
      data = await dbPostgres.sql('classes.deleteClass', { id })
  
    } catch (error) {
      // Error handling
      debug('Error: ', error)
      data = {
        error: 'No se pudo eliminar la clase'
      }
      error.code = 400
  
    }
  
    return data
  
}

/**
 * Gets all classes in the database
 */
async function getAllClasses () {

    var data = null
  
    try {
      data = await dbPostgres.sql('classes.getAllClasses')
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
 * Create class in the database
 * @param {Object} classData data of the new class
 */
async function createClass (classData) {

    var data = null 
  
    //checking if object is valid
    var data_body = objFuncs.checkBody(classData, "class")
    if( data_body.error ){
      return data_body
    }
    
    try {
      
      const create_result = await dbPostgres.sql('classes.createClass', classData)
      data = classData
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
 * Function that updates an class's information
 * @param {Object} classUpdate class that it's information is going to be updated
 */
async function updateClass (classUpdate) {

    var data = null
  
    //checking if object is valid
    var data_body = objFuncs.checkBody(classUpdate, "class_update")
    if( data_body.error ){
      return data_body
    }
  
    try {
      
      data = await dbPostgres.sql('classes.updateClass', classUpdate)  

    } catch (error) {
      // Error handling
      debug('Error: ', error)
      // Get error's message
      data = handleDatabaseValidations(error)
    }
  
    return data
  
}

/**
 * Get the information of a given class
 * @date 2019-10-23
 * @param {nustring} id id of the class to be consulted
 */
async function getClass(id) {

    var data = null
  
    try {

      data = await dbPostgres.sql('classes.getClass', { id })
      
      if (data.rows.length != 0){
        data = data.rows[0]
        //we look for the schedules of the found class
        const schedules = await dbPostgres.sql('classes.getClassSchedule', { id })
        const array_schedules = schedules.rows
        //add schedules to the data
        data.schedules = array_schedules

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
    if (constraint == 'class_description_check') {
      data = {
        error: 'La descripción debe tener al menos 5 letras'
      }
    } else if(constraint == 'class_comission_id_fkey'){
      data = {
        error: 'No existe la comisión a la que estas intentando asignar la clase'
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
    getAllClasses,
    createClass,
    updateClass,
    deleteClass,
    getClass
}