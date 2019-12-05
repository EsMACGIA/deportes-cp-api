'use strict'

const jwt = require('express-jwt');
const config = require('../../config')

// Athletes Router
const athletes = require('express').Router()

// Functions under /
const getAllAthletes = require('./getAllAthletes')
const createAthlete = require('./createAthlete')
const updateAthlete = require('./updateAthlete')
const deleteAthlete = require('./deleteAthlete')
const getAthlete = require('./getAthlete')
const handleErrorToken = require('../errors/handleErrorToken')

// Endpoints
athletes.get('/', jwt({secret: config.jwt_key}), getAllAthletes)
athletes.put('/', jwt({secret: config.jwt_key}), updateAthlete)
athletes.delete('/:id', jwt({secret: config.jwt_key}), deleteAthlete)
athletes.post('/', jwt({secret: config.jwt_key}), createAthlete)
athletes.get('/:id', jwt({secret: config.jwt_key}), getAthlete)

module.exports = athletes
