'use strict'

// Configuration 
const config = require('../config')
const jwt = require('../utilities/jwt')
const debug = require('debug')(`${config.debug}controllers:trainers`)
const dbPostgres = require('../db/').postgres()
const hashing = require('../utilities/hashing')
const objFuncs = require('../utilities/objectFunctions')

/**
 * Deletes a trainer from the database
 * @date 2019-11-14
 * @param {number} id Trainer's id
 * @param {object} user_token the information of the logged user
 */
async function deleteTrainer (id, user_token) {

  var data = null
  // verify that the role is the correct for the view 
  data = jwt.verifyRole(user_token, "admin", -1)
  if (data.error) { return data }

  try {

    data = await dbPostgres.sql('users.deleteUser', { id })
    data.code = 201
    data.action = 'DELETED'

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
 * @param {object} user_token the information of the logged user
 * date: 2019-11-14
 */
async function getAllTrainers (user_token) {

  var data = null
  // verify that the role is the correct for the view 
  data = jwt.verifyRole(user_token, "admin", -1)
  if (data.error) { return data }

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
 * @param {object} user_token the information of the logged user
 */
async function createTrainer (trainerData, user_token) {

  var data = null 
  // verify that the role is the correct for the view 
  data = jwt.verifyRole(user_token, "commission", -1)
  if (data.error) { return data }

  var comission_owner = false
  if (user_token.role == "commission"){
    comission_owner = true
  }

  //checking if object is valid
  var data_body = objFuncs.checkBody(trainerData, "trainer")
  if( data_body.error ){
    return data_body
  }

  var data_error =  {}
  //checking that each comission id has a correct type
  trainerData.comissions.forEach(function (comission){
    if( !Number.isInteger(comission) ){       
      data_error= {error: "El arreglo de comisiones solo puede tener ids de comisiones", code: 400}
    }
  })

  if (data_error.error){
    return data_error
  }
  
  try {
    trainerData.password = hashing.createHash(trainerData.password)

    
    await dbPostgres.transaction(async transaction_db => { // BEGIN

        const create_result = await transaction_db.sql('users.createUser', trainerData)
      
        const user = create_result.rows[0]
        trainerData.user_id = user.id
      
        await transaction_db.sql('trainer.createTrainer', trainerData)
        
        // if the user creating the trainer is a commission we must also
        // insert the relation between them by default
        if (comission_owner){
          var comission_id = user_token.id
          var trainerComission = {
            comission_id: comission_id,
            trainer_id: user.id
          }
  
          await transaction_db.sql('trainer.addComission', trainerComission)
        } else { // if the admin is the creator we must also include a list of default commissions
          // for the trainer
          var comissions = trainerData.comissions
          var n = comissions.length
          var comission_id = -1
          var user_id = user.id
          for (var i = 0;  i < n ; i++ ){
            comission_id = comissions[i]
            await transaction_db.sql('trainer.addComission', {trainer_id: user_id, comission_id: comission_id})
          }
        }
      
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
 * @param {object} user_token the information of the logged user
 */
async function updateTrainer (trainer, user_token) {

  var data = null

  //checking if object is valid
  var data_body = objFuncs.checkBody(trainer, "trainer_update")
  if( data_body.error ){
    return data_body
  }

  var data_error = {}
  //checking that each comission id has a correct type
  trainer.comissions.forEach(function (comission){
    if( !Number.isInteger(comission) ){       
      data_error = {error: "El arreglo de comisiones solo puede tener ids de comisiones", code: 400}
    }
  })

  if (data_error.error){
    return data_error
  }

  // verify that the role is the correct for the view 
  data = jwt.verifyRole(user_token, "trainer", trainer.id)
  if (data.error) { return data }


  try {
    
    trainer.password = hashing.createHash(trainer.password)

    await dbPostgres.transaction(async transaction_db => { // BEGIN

        await transaction_db.sql('trainer.updateTrainer', trainer)
        if (trainer.password != "") {// if the user wants a new password we update it
          await transaction_db.sql('users.updateUser', trainer)
        }

        if (user_token.role == "admin"){
          var user_id = trainer.id
          await transaction_db.sql('comissions.deleteAllComissionsOfTrainer', {trainer_id: user_id})

          var comissions = trainer.comissions
          var n = comissions.length
          var comission_id = -1
          for (var i = 0;  i < n ; i++ ){
            comission_id = comissions[i]
            await transaction_db.sql('trainer.addComission', {trainer_id: user_id, comission_id: comission_id})
          }
        }
        

      })
    
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
 * @param {object} user_token the information of the logged user
 */
async function getTrainer(id, user_token) {

  var data = null
  // verify that the role is the correct for the view 
  data = jwt.verifyRole(user_token, "trainer", id)
  if (data.error) { return data }

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
async function addComission(trainerComission, user_token) {

  var data = null
  // verify that the role is the correct for the view 
  data = jwt.verifyRole(user_token, "admin", -1)
  if (data.error) { return data }

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
async function deleteComission(trainerComission, user_token) {

  var data = null
  

  //checking if object is valid
  var data_body = objFuncs.checkBody(trainerComission, "trainer_comission")
  if( data_body.error ){
    return data_body
  }

  // verify that the role is the correct for the view 
  data = jwt.verifyRole(user_token, "commission", trainerComission.comission_id)
  if (data.error) { return data }

  var comission_owner = false
  if (user_token.role == "commission"){
    comission_owner = true
  }

  try {
      
    await dbPostgres.transaction(async transaction_db => { // BEGIN

      await transaction_db.sql('trainer.deleteComission', trainerComission)

      // if a commission is the one deleting the relation and also this is the last commission
      // for the trainer we must delete the whole trainer
      if (comission_owner){
        var query = await transaction_db.sql('trainer.listComissions', trainerComission)
        var comissions = query.rows
        if(comissions.length == 0){
          await transaction_db.sql('users.deleteUser', {id : trainerComission.trainer_id})

        }

      }
      

   })
    
    data.code = 201
    data.action = 'DELETED'

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
 * Gets all comissions of a trainer
 * @param {int} id the id of the trainer
 * @param {object} user_token the information of the logged user
 * date: 2019-12-05
 */
async function listComissions (id, user_token) {

  var data = null
  // verify that the role is the correct for the view 
  data = jwt.verifyRole(user_token, "trainer", id)
  if (data.error) { return data }

  try {

    data = await dbPostgres.sql('trainer.listComissions', {trainer_id: id})

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
 * Gets all classes of a trainer
 * @param {int} id the id of the trainer
 * @param {object} user_token the information of the logged user
 * date: 2019-12-05
 */
async function listClasses (id, user_token) {

  var data = null
  // verify that the role is the correct for the view 
  data = jwt.verifyRole(user_token, "trainer", id)
  if (data.error) { return data }

  try {

    data = await dbPostgres.sql('trainer.listClasses', {trainer_id: id})

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
 * Gets all classes of a trainer
 * @param {int} id the id of the trainer
 * @param {object} user_token the information of the logged user
 * date: 2019-12-05
 */
async function listAthletes (id, user_token) {

  var data = null
  // verify that the role is the correct for the view 
  data = jwt.verifyRole(user_token, "trainer", id)
  if (data.error) { return data }

  try {

    data = await dbPostgres.sql('trainer.listAthletes', {trainer_id: id})

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
  deleteComission,
  listComissions,
  listClasses,
  listAthletes
}
