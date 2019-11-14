'use strict'

// Routes Router
const routes = require('express').Router()

// Modules
const root = require('./root')
const comissions = require('./comissions')
const disciplines = require('./disciplines')
const auth = require('./auth')
const trainers = require('./trainers')
const athletes = require('./athletes')
const classes = require('./classes')

// Import Modules to Use
routes.use('/', root)
routes.use('/comissions', comissions)
routes.use('/disciplines', disciplines)
routes.use('/auth', auth)
routes.use('/trainers', trainers)
routes.use('/athletes', athletes)
routes.use('/classes', classes)

module.exports = routes
