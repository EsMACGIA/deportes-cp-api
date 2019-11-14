'use strict'

// Trainers Router
const trainers = require('express').Router()

// Functions under /
const getAllTrainers = require('./getAllTrainers')
const createTrainer = require('./createTrainer')
const updateTrainer = require('./updateTrainer')
const deleteTrainer = require('./deleteTrainer')
const getTrainer = require('./getTrainer')
const addComission = require('./addComission')

// Endpoints
trainers.get('/', getAllTrainers)
trainers.put('/', updateTrainer)
trainers.delete('/:id', deleteTrainer)
trainers.post('/', createTrainer)
trainers.get('/:id', getTrainer)
trainers.post('/addComission', addComission)

module.exports = trainers
