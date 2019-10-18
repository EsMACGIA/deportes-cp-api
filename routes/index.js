'use strict'

// Routes Router
const routes = require('express').Router()

// Modules
const root = require('./root')

// Import Modules to Use
routes.use('/', root)

module.exports = root
