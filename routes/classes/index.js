'use strict'

const jwt = require('express-jwt');
const config = require('../../config')

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
const getSchedule = require('./getSchedule')
const handleErrorToken = require('../errors/handleErrorToken')

// Endpoints


//error handling
classes.use('/',jwt({secret: config.jwt_key}), handleErrorToken)
classes.get('/athletes/',jwt({secret: config.jwt_key}), getAthletesInClass)
classes.post('/athletes/',jwt({secret: config.jwt_key}), createAthleteInClass)
classes.delete('/athletes/',jwt({secret: config.jwt_key}), deleteAthleteInClass)
classes.delete('/:id',jwt({secret: config.jwt_key}), deleteClass)
classes.get('/:id',jwt({secret: config.jwt_key}), getClass)
classes.get('/',jwt({secret: config.jwt_key}), getAllClasses)
classes.get('/schedule/:id',jwt({secret: config.jwt_key}), getSchedule)
classes.put('/',jwt({secret: config.jwt_key}), updateClass)
classes.post('/',jwt({secret: config.jwt_key}), createClass)


module.exports = classes
