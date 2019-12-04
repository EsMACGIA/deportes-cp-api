'use strict'

const jwt = require('express-jwt');
const config = require('../../config')

// Comissions Router
const comissions = require('express').Router()

// Functions under /
const getAllComissions = require('./getAllComissions')
const createComission = require('./createComission')
const updateComission = require('./updateComission')
const deleteComission = require('./deleteComission')
const getComission = require('./getComission')
const listTrainers = require('./listTrainers')
const listClasses = require('./listClasses')
const handleErrorToken = require('../errors/handleErrorToken')

// Endpoints

//error handling
comissions.use('/',jwt({secret: config.jwt_key}), handleErrorToken)

comissions.get('/',jwt({secret: config.jwt_key}), getAllComissions)
comissions.put('/',jwt({secret: config.jwt_key}), updateComission)
comissions.delete('/:id',jwt({secret: config.jwt_key}), deleteComission)
comissions.post('/',jwt({secret: config.jwt_key}), createComission)
comissions.get('/:id',jwt({secret: config.jwt_key}), getComission)
comissions.get('/listTrainers/:id',jwt({secret: config.jwt_key}), listTrainers)
comissions.get('/listClasses/:id',jwt({secret: config.jwt_key}), listClasses)

module.exports = comissions
