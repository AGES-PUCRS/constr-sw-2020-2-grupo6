var mongoose = require('mongoose');
const Turma = require('../models')

module.exports.getAllTurmas = async function () {
    const allTurmas = await Turma.find({})
    console.log("TURMA: ", allTurmas)

    return allTurmas
}

module.exports.getTurmaById = function (id) {
    return [{
        "ano": id,
        "horario": [
            "{}",
            "{}"
        ],
        "id": id,
        "semestre": 1,
        "numero": 5
    }];
}

module.exports.deleteTurma = async function (id) {
    const turma = await Turma.findByIdAndDelete(id)
    return turma ? 200 : 404 //ta feio mas funciona
}

module.exports.updateTurma = function (id, body) {
    // TODO: put
}

/**
 * PATCH /turma/patch/:turmaid
 */

module.exports.updateTurmaByField = function (id, body) {
    // TODO: patch
}

module.exports.createTurma = async function (body) {
    const turma = new Turma(body)
    await turma.save()
    console.log("TURMA: ", turma)

    return turma
}
