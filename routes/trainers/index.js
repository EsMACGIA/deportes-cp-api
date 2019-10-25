'use strict'

// Trainers Router
const trainers = require('express').Router()

// Functions under /
const getAllTrainers = require('./getAllTrainers')
const createTrainer = require('./createTrainer')
const updateTrainer = require('./updateTrainer')
const deleteTrainer = require('./deleteTrainer')
const getTrainer = require('./getTrainer')

// Endpoints
trainers.get('/', getAllTrainers)
trainers.put('/', updateTrainer)
trainers.delete('/:id', deleteTrainer)
trainers.post('/', createTrainer)
trainers.get('/:id', getTrainer)

module.exports = trainers
