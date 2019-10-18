'use strict'

// Routes Router
const routes = require('express').Router()

// Modules
const root = require('./root')
const users = require('./users')

// Import Modules to Use
routes.use('/', root)
routes.use('/users', users)

module.exports = routes
