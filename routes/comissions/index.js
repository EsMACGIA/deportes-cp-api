'use strict'

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

// Endpoints
comissions.get('/', getAllComissions)
comissions.put('/', updateComission)
comissions.delete('/:id', deleteComission)
comissions.post('/', createComission)
comissions.get('/:id', getComission)
comissions.get('/listTrainers/:id', listTrainers)
comissions.get('/listClasses/:id', listClasses)

module.exports = comissions
