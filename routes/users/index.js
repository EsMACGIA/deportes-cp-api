'use strict'

// Users Router
const users = require('express').Router()

// Functions under /
const getAllUsers = require('./getAllUsers')
const createUser = require('./createUser')
const updateUser = require('./updateUser')
const deleteUser = require('./deleteUser')

// Endpoints
users.get('/', getAllUsers)
users.put('/', updateUser)
users.delete('/:id', deleteUser)
users.post('/', createUser)

module.exports = users
