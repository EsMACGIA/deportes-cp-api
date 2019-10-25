'use strict'

// Routes Router
const routes = require('express').Router()

// Modules
const root = require('./root')
const users = require('./users')
const comissions = require('./comissions')
const disciplines = require('./disciplines')
const auth = require('./auth')
const trainers = require('./trainers')

// Import Modules to Use
routes.use('/', root)
routes.use('/users', users)
routes.use('/comissions', comissions)
routes.use('/disciplines', disciplines)
routes.use('/auth', auth)
routes.use('/trainers', trainers)

module.exports = routes
