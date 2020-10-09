const Turma = require('../models');

/**
 * GET /turmas
 */

module.exports.getAllTurmas = async function () {
    const allTurmas = await Turma.find({});
    console.log('TURMA: ', allTurmas);

    return allTurmas;
};

/**
 * GET /turma/:turmaid
 */

module.exports.getTurmaById = async function (id) {
    const turma = await Turma.findById(id).catch(() => {
        return 404;
    });
    return turma ? turma : 404;
};

/**
 * GET /turma/getAulas/:turmaid
 */

module.exports.getAulasById = async function (id) {
    const aulas = await Turma.findById(id)
        .select('aulas')
        .catch(() => {
            return 404;
        });
    return aulas ? aulas : 404;
};

/**
 * GET /turma/getAlunos/:turmaid
 */

module.exports.getAlunosById = async function (id) {
    const alunos = await Turma.findById(id)
        .select('alunos')
        .catch(() => {
            return 404;
        });
    return alunos ? alunos : 404;
};

/**
 * DELETE /turma/delete/:turmaid
 */

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
    const t = new Turma(body);

    const fun = await t.validate().catch(() => {
        return 400;
    });
    if (fun === 400) {
        return fun;
    } else {
        const turma = await Turma.findByIdAndUpdate(id, body);
        return turma ? 200 : 404;
    }
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

/**
 * POST /turma/create
 * atenção nesse aqui: to-do
 */

module.exports.createTurma = async function (body) {
    const t = new Turma(body);

    const fun = await t.validate().catch(() => {
        return 400;
    });
    if (fun === 400) {
        return fun;
    } else {
        const turma = await t.save();
        return turma ? 201 : 400;
    }
};
