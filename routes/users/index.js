'use strict'

// Users Router
const users = require('express').Router()

// Functions under /
const getAllUsers = require('./getAllUsers')
const deleteUser = require('./deleteUser')

// Endpoints
users.get('/', getAllUsers)
users.delete('/:id', deleteUser)

module.exports = users
