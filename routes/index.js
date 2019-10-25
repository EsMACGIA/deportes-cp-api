'use strict'

// Routes Router
const routes = require('express').Router()

// Modules
const root = require('./root')
const users = require('./users')
const disciplines = require('./disciplines')
const auth = require('./auth')
const trainer = require('./trainer')

// Import Modules to Use
routes.use('/', root)
routes.use('/users', users)
routes.use('/disciplines', disciplines)
routes.use('/auth', auth)
routes.use('/trainer', trainer)

module.exports = routes
