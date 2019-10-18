'use strict'

// Root Router
const root = require('express').Router()

// Functions under /
const rootFunction = require('./root')

// Endpoints
root.get('/', rootFunction)

module.exports = root
