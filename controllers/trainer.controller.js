'use strict'

// Configuration 
const config = require('../config')
const debug = require('debug')(`${config.debug}controllers:trainer`)
const dbPostgres = require('../db/').postgres()
const hashing = require('../utilities/hashing')
const objFuncs = require('../utilities/objectFunctions')

/**
 * Deletes a trainer from the database
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
      error: 'Could not delete trainer' 
    }
    error.code = 400

  }

  return data

}

/**
 * Gets all trainer in the database
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
      error: 'Something is wrong!'
    }
    error.code = 400

  }

  return data

}

/**
 * Create trainer in the database
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
 * @param {Object} trainer Trainer that it's information is going to be updated
 */
async function updateTrainer (trainer) {

  var data = null

  //checking if object is valid
  var data_body = objFuncs.checkBody(trainer, "trainer_update")
  if( data_body.error ){
    return data_body
  }

  var existPass = true
  if( trainer.password == ""){
    existPass = false
  }

  try {
    
    data = await dbPostgres.sql('trainer.updateTrainer', trainer)

    if (!existPass) {

        await dbPostgres.transaction(async transaction_db => { // BEGIN

            const create_result = await transaction_db.sql('users.updateUserNoPassword', trainer)
            await transaction_db.sql('trainer.updateTrainer', trainer)

            return "UPDATED"
         })
    }else {

        trainer.password = hashing.createHash(trainer.password)

        await dbPostgres.transaction(async transaction_db => { // BEGIN

            const create_result = await transaction_db.sql('users.updateUser', trainer)
            await transaction_db.sql('trainer.updateTrainer', trainer)

            return "UPDATED"
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
      error: 'ci is already in the database'
    }
  } else if(constraint == 'trainer_email_key'){
    data = {
      error: 'email is already in the database'
    }      
  } else if(constraint == 'trainer_type_check'){
    data = {
      error: 'type is not a value between 1 and 3'
    }      
  } else if(constraint == 'trainer_ci_check'){
    data = {
      error: 'ci is not a value between 1 and 999999999'
    }
  } else if(constraint == 'Password is not a string'){
    data = {
      error: constraint
    }
  } else if(constraint == 'trainer_name_check'){
    data = {
      error: 'Trainer name is empty'
    }
  } else if(constraint == 'trainer_lastname_check'){
    data = {
      error: 'Trainer last name is empty'
    }
  } else if(constraint == 'email_type_check'){
    data = {
      error: 'Email is invalid'
    }
  } else if(constraint == 'trainer_password_check'){
    data = {
      error: 'Password is empty'
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
 * Get the information of a given trainer
 * @date 2019-10-23
 * @param {nustring} email email of the trainer to be consulted
 */
async function getTrainer(email) {

  var data = null

  try {
    data = await dbPostgres.sql('trainer.getTrainer', { email })
    
    if (data.rows.length != 0){
      data = data.rows[0]
    }else{
      data = {}
    }

  } catch (error) {
    // Error handling
    debug('Error: ', error)
    data = {
      error: 'Something is wrong!'
    }
    data.code = 400
  }

  return data
}

module.exports = {
  getAllTrainers,
  createTrainer,
  updateTrainer,
  deleteTrainer,
  getTrainer
}
