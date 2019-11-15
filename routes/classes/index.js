'use strict'

// classes Router
const classes = require('express').Router()

// Functions under /
const getAllClasses = require('./getAllClasses')
const createClass = require('./createClass')
const updateClass = require('./updateClass')
const deleteClass = require('./deleteClass')
const getClass = require('./getClass')
const getAthletesInClass = require('./getAthletesInClass')
const createAthleteInClass = require('./createAthleteInClass')
const deleteAthleteInClass = require('./deleteAthleteInClass')

// Endpoints
classes.get('/', getAllClasses)
classes.put('/', updateClass)
classes.delete('/:id', deleteClass)
classes.post('/', createClass)
classes.get('/:id', getClass)
classes.get('/athletes', getAthletesInClass)
classes.post('/athletes', createAthleteInClass)
classes.delete('/athletes', deleteAthleteInClass)

module.exports = classes

