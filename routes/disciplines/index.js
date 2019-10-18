'use strict'

// disciplines Router
const disciplines = require('express').Router()

// Functions under /
const getAllDisciplines = require('./getAllDisciplines')
// const createDisciplines = require('./createDisciplines')
// const updateDisciplines = require('./updateDisciplines')
const deleteDiscipline = require('./deleteDiscipline')

// Endpoints
disciplines.get('/', getAllDisciplines)
// disciplines.put('/', updateDisciplines)
disciplines.delete('/:id', deleteDiscipline)
// disciplines.post('/', createDisciplines)

module.exports = disciplines
