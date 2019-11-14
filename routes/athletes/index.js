'use strict'

// Athletes Router
const athletes = require('express').Router()

// Functions under /
const getAllAthletes = require('./getAllAthletes')
const createAthlete = require('./createAthlete')
const updateAthlete = require('./updateAthlete')
const deleteAthlete = require('./deleteAthlete')
const getAthlete = require('./getAthlete')

// Endpoints
athletes.get('/', getAllAthletes)
athletes.put('/', updateAthlete)
athletes.delete('/:id', deleteAthlete)
athletes.post('/', createAthlete)
athletes.get('/:id', getAthlete)

module.exports = athletes
