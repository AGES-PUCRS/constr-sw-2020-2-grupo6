const Turma = require('../models');
const http = require('http');

/**
 * GET /turmas
 */

module.exports.getAllTurmas = async function (query) {
    return await Turma.find(query);
};

/**
 * GET /turma/:turmaid
 */

module.exports.getTurmaById = async function (id, query) {
    const turma = await Turma.findById(id).catch(() => {
        return undefined
    })

    if (query && turma) {
        const listGetApi = []
        for (let i = 0; i < query.length; i++) {
            listGetApi.push(getAPIs(query[i], turma[query[i]]))
        }
        return await Promise.all(listGetApi).then((expands) => {
            for (let i = 0; i < query.length; i++) {
                turma._doc[query[i]] = expands[i]
            }
            return turma
        })
    } else {
        return turma ? turma : 404
    }
}

const APIs = {
    aulas: 'http://admin:admin@ec2-18-218-177-125.us-east-2.compute.amazonaws.com:3000/api/v1/classes',
    professor: 'http://ec2-3-91-232-225.compute-1.amazonaws.com:3333/professores',
    alunos: 'http://ec2-3-236-239-112.compute-1.amazonaws.com:3000/api/alunos',
    disciplina: 'http://ec2-18-225-37-214.us-east-2.compute.amazonaws.com:3333/disciplinas',
    sala: 'http://ec2-18-220-149-196.us-east-2.compute.amazonaws.com:3001/room'
}

function getAPIs(api, id) {
    return new Promise((resolve) => {
        if (Array.isArray(id)) {
            const listGetApi = []
            for (let i = 0; i < id.length; i++) {
                listGetApi.push(getAPIs(api, id[i]))
            }
            return Promise.all(listGetApi).then((expand) => {
                resolve(expand)
            })
        } else {
            let url = APIs[api] + '/' + id
            try {
                let res = http.get(url)
                res.on('error', function () {
                    console.log('timeout')
                    resolve(id)
                })
                res.on('response', function (response) {
                    response.setEncoding('utf8')
                    let rawData = ''
                    response.on('data', (chunk) => {
                        rawData += chunk
                    })
                    response.on('end', () => {
                        try {
                            const parsedData = JSON.parse(rawData)
                            resolve(parsedData)
                        } catch (e) {
                            resolve(id)
                        }
                    })
                })
            } catch (e) {
                resolve(id)
            }
        }
    })
}

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
        return turma ? turma : 400;
    }
};
