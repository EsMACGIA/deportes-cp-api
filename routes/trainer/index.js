'use strict'

// Trainers Router
const trainer = require('express').Router()

// Functions under /
const getAllTrainers = require('./getAllTrainers')
const createTrainer = require('./createTrainer')
const updateTrainer = require('./updateTrainer')
const deleteTrainer = require('./deleteTrainer')
const getTrainer = require('./getTrainer')

// Endpoints
trainer.get('/', getAllTrainers)
trainer.put('/', updateTrainer)
trainer.delete('/:id', deleteTrainer)
trainer.post('/', createTrainer)
trainer.get('/:id', getTrainer)

module.exports = trainer
