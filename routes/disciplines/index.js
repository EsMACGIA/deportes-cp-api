'use strict'

// disciplines Router
const disciplines = require('express').Router()

// Functions under /
const getAllDisciplines = require('./getAllDisciplines')
// const createDisciplines = require('./createDisciplines')
// const updateDisciplines = require('./updateDisciplines')
// const deleteDisciplines = require('./deleteDisciplines')

// Endpoints
disciplines.get('/', getAllDisciplines)
// disciplines.put('/', updateDisciplines)
// disciplines.delete('/:id', deleteDisciplines)
// disciplines.post('/', createDisciplines)

module.exports = disciplines
