'use strict'

// Configuration 
const config = require('../config')
const debug = require('debug')(`${config.debug}controllers:trainers`)
const dbPostgres = require('../db/').postgres()
const hashing = require('../utilities/hashing')
const objFuncs = require('../utilities/objectFunctions')
const comissionController = require('./comissions.controller')

/**
 * Deletes a trainer from the database
 * @date 2019-11-14
 * @param {number} id Trainer's id
 */
async function deleteTrainer (id) {

  var data = null

  try {

    data = await dbPostgres.sql('users.deleteUser', { id })
    data.code = 201

  } catch (error) {
    // Error handling
    
    data = {
      error: 'No se pudo eliminar al entrenador' 
    }
    data.code = 400

  }

  return data

}

/**
 * Gets all trainer in the database
 * date: 2019-11-14
 */
async function getAllTrainers () {

  var data = null

  try {
    data = await dbPostgres.sql('trainer.getAllTrainers')

    data = data.rows
    data.code = 201

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
 * Create trainer in the database
 * @date 2019-11-14
 * @param {Object} trainerData data of the new trainer
 */
async function createTrainer (trainerData) {

  var data = null 

  //checking if object is valid
  var data_body = objFuncs.checkBody(trainerData, "trainer")
  if( data_body.error ){
    return data_body
  }
  
  try {
    trainerData.password = hashing.createHash(trainerData.password)

    
    await dbPostgres.transaction(async transaction_db => { // BEGIN

        const create_result = await transaction_db.sql('users.createUser', trainerData)
      
        const user = create_result.rows[0]
        trainerData.user_id = user.id
      
        await transaction_db.sql('trainer.createTrainer', trainerData)
      
        return user
     })

    data = trainerData
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
 * Function that updates an trainer's information
 * @date 2019-11-14
 * @param {Object} trainer Trainer that it's information is going to be updated
 */
async function updateTrainer (trainer) {

  var data = null

  //checking if object is valid
  var data_body = objFuncs.checkBody(trainer, "trainer_update")
  if( data_body.error ){
    return data_body
  }

  try {
    
    if (trainer.password == "") {

        await dbPostgres.sql('trainer.updateTrainer', trainer)

    } else {

        trainer.password = hashing.createHash(trainer.password)

        await dbPostgres.transaction(async transaction_db => { // BEGIN

            await transaction_db.sql('trainer.updateTrainer', trainer)
            await transaction_db.sql('users.updateUser', trainer)

         })
    }
    
    data = trainer
    data.action = "UPDATED"
  } catch (error) {
    // Error handling
    debug('Error: ', error)

    // Get error's message
    data = handleDatabaseValidations(error)
  }

  return data

}

/**
 * Get the information of a given trainer
 * @date 2019-11-14
 * @param {nustring} id id of the trainer to be consulted
 */
async function getTrainer(id) {

  var data = null

  try {
    data = await dbPostgres.sql('trainer.getTrainer', { id })
    
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

/**
 * Relates a trainer and a comission
 * @date 2019-11-14
 * @param {Object} trainerComission object with the id of trainer and comission to add
 */
async function addComission(trainerComission) {

  var data = null

  //checking if object is valid
  var data_body = objFuncs.checkBody(trainerComission, "trainer_comission")
  if( data_body.error ){
    return data_body
  }

  try {

    await dbPostgres.sql('trainer.addComission', trainerComission)
    
    data = trainerComission
    data.action = 'ADDED'

  } catch (error) {
    // Error handling
    debug('Error: ', error)

    // Get error's message
    data = handleDatabaseValidations(error)
  }

  return data
}

/**
 * Deletes de relation between a trainer and a comission
 * @date 2019-11-14
 * @param {Object} trainerComission object with the id of trainer and comission to add
 */
async function deleteComission(trainerComission) {

  var data = null

  //checking if object is valid
  var data_body = objFuncs.checkBody(trainerComission, "trainer_comission")
  if( data_body.error ){
    return data_body
  }

  try {
      
    data = await dbPostgres.sql('trainer.deleteComission', trainerComission)
    
    data.code = 201

  } catch (error) {
    // Error handling
    console.log(error)
    data = {
      error: 'No se pudo eliminar la comisión del entrenador' 
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
  if (constraint == 'trainer_ci_key') {
    data = {
      error: 'Ya existe un entrenador en el sistema con esa cédula'
    }
  } else if(constraint == 'users_email_key'){
    data = {
      error: 'Ya existe un entrenador en el sistema con ese email'
    }      
  } else if(constraint == 'document_check'){
    data = {
      error: 'Cédula debe ser un valor con un formato como V-1234 '
    }
  } else if(constraint == 'Password is not a string'){
    data = {
      error: 'La contraseña es invalida'
    }
  } else if(constraint == 'trainer_name_check'){
    data = {
      error: 'Nombre de entrenador requerido'
    }
  } else if(constraint == 'trainer_lastname_check'){
    data = {
      error: 'Apellido de entrenador requerido'
    }
  } else if(constraint == 'email_type_check'){
    data = {
      error: 'Email suministrado tiene un formato invalido'
    }
  } else if(constraint == 'users_password_check'){
    data = {
      error: 'Contraseña requerida'
    }

  } else if(constraint == 'trainer_comission_comission_id_fkey'){
    data = {
      error: 'No existe la comisión que intentas agregar al trainer'
    }

  } else if(constraint == 'trainer_comission_trainer_id_fkey'){
    data = {
      error: 'No existe el entrenador'
    }
  }else if(constraint == 'trainer_comission_pkey'){
    data = {
      error: 'Ya estaban relacionados esa comisión y entrenador'
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


module.exports = {
  getAllTrainers,
  createTrainer,
  updateTrainer,
  deleteTrainer,
  getTrainer,
  addComission,
  deleteComission
}
