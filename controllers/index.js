const Turma = require('../models');

module.exports.getAllTurmas = async function () {
    const allTurmas = await Turma.find({});
    console.log('TURMA: ', allTurmas);

    return allTurmas;
};

module.exports.getTurmaById = async function (id) {
    const turma = await Turma.findById(id).catch(() => {
        return 404;
    });
    return turma ? turma : 404;
};

module.exports.getAulasById = async function (id) {
    const aulas = await Turma.findById(id)
        .select('aulas')
        .catch(() => {
            return 404;
        });
    return aulas ? aulas : 404;
};

module.exports.getAlunosById = async function (id) {
    const alunos = await Turma.findById(id)
        .select('alunos')
        .catch(() => {
            return 404;
        });
    return alunos ? alunos : 404;
};

module.exports.deleteTurmaById = async function (id) {
    const turma = await Turma.findByIdAndDelete(id).catch(() => {
        return 404;
    });
    return turma ? 200 : 404; //ta feio mas funciona
};

/**
 * PUT /turma/update/:turmaid
 */

module.exports.updateTurmaById = async function (id, body) {
    new Turma(body);

    const turma = await Turma.findByIdAndUpdate(id, body);
    return turma ? 200 : 404;
};

/**
 * PATCH /turma/patch/:turmaid
 */

module.exports.updateTurmaByField = async function (id, body) {
    const turma = await Turma.findByIdAndUpdate(id, body).catch(() => {
        return 404;
    });
    return turma ? 200 : 404;
};

module.exports.createTurma = async function (body) {
    const turma = new Turma(body);

    await turma.save();
    return turma;
};
