'use strict'

// classes Router
const classes = require('express').Router()

// Functions under /
const getAllClasses = require('./getAllClasses')
const createClass = require('./createClass')
const updateClass = require('./updateClass')
const deleteClass = require('./deleteClass')
const getClass = require('./getClass')

// Endpoints
classes.get('/', getAllClasses)
classes.put('/', updateClass)
classes.delete('/:id', deleteClass)
classes.post('/', createClass)
classes.get('/:id', getClass)

module.exports = classes

