'use strict'

// Users Router
const login = require('express').Router()

// Functions under /
const loginUser = require('./authUser')
const restorePassword = require('./restorePassword')

// Endpoints
login.post('/', loginUser)
login.put('/', restorePassword)


module.exports = login
