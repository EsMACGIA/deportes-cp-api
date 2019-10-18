'use strict'

// disciplines Router
const disciplines = require('express').Router()

// Functions under /
const getAllDisciplines = require('./getAllDisciplines')
const createDiscipline = require('./createDiscipline')
// const updateDisciplines = require('./updateDisciplines')
// const deleteDisciplines = require('./deleteDisciplines')

// Endpoints
disciplines.get('/', getAllDisciplines)
// disciplines.put('/', updateDisciplines)
// disciplines.delete('/:id', deleteDisciplines)
disciplines.post('/', createDiscipline)

module.exports = disciplines
