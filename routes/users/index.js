'use strict'

// Users Router
const users = require('express').Router()

// Functions under /
const getAllUsers = require('./getAllUsers')
const createUser = require('./createUser')

// Endpoints
users.get('/', getAllUsers)
users.post('/', createUser)

module.exports = users
