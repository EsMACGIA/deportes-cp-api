'use strict'

const jwt = require('express-jwt');
const config = require('../../config')

// Trainers Router
const trainers = require('express').Router()

// Functions under /
const getAllTrainers = require('./getAllTrainers')
const createTrainer = require('./createTrainer')
const updateTrainer = require('./updateTrainer')
const deleteTrainer = require('./deleteTrainer')
const getTrainer = require('./getTrainer')
const addComission = require('./addComission')
const deleteComission = require('./deleteComission')
const listComissions = require('./listComissions')
const handleErrorToken = require('../errors/handleErrorToken')

// Endpoints

//error handling
trainers.use('/',jwt({secret: config.jwt_key}), handleErrorToken)

trainers.get('/',jwt({secret: config.jwt_key}), getAllTrainers)
trainers.put('/',jwt({secret: config.jwt_key}), updateTrainer)
trainers.delete('/deleteComission',jwt({secret: config.jwt_key}), deleteComission)
trainers.delete('/:id',jwt({secret: config.jwt_key}), deleteTrainer)
trainers.post('/',jwt({secret: config.jwt_key}), createTrainer)
trainers.get('/:id',jwt({secret: config.jwt_key}), getTrainer)
trainers.post('/addComission',jwt({secret: config.jwt_key}), addComission)
trainers.get('/listComissions/:id',jwt({secret: config.jwt_key}), listComissions)



module.exports = trainers
