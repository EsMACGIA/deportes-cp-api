'use strict'

// Users Router
const login = require('express').Router()

// Functions under /
const loginUser = require('./authUser')

// Endpoints
login.post('/', loginUser)


module.exports = login
