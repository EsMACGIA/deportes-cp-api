'use strict'

// Users Router
const users = require('express').Router()

// Functions under /
const getAllUsers = require('./getAllUsers')
const updateUser = require('./updateUser')

// Endpoints
users.get('/', getAllUsers)
users.put('/', updateUser)

module.exports = users
