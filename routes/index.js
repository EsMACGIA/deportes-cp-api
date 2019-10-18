'use strict'

// Routes Router
const routes = require('express').Router()

// Modules
const root = require('./root')
const users = require('./users')
const disciplines = require('./disciplines')

// Import Modules to Use
routes.use('/', root)
routes.use('/users', users)
routes.use('/disciplines', disciplines)

module.exports = routes
