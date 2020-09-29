'use strict';

var utils = require('../utils/writer.js');
var Turma = require('../service/TurmaService');

module.exports.createTurma = function createTurma (req, res, next) {
    var body = req.swagger.params['body'].value;
    Turma.createTurma(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.deleteTurma = function deleteTurma (req, res, next) {
    var turmaid = req.swagger.params['turmaid'].value;
    Turma.deleteTurma(turmaid)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getTurma = function getTurma (req, res, next) {
    var turmaid = req.swagger.params['turmaid'].value;
    Turma.getTurma(turmaid)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getTurmas = function getTurmas (req, res, next) {
    Turma.getTurmas()
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.partiallyUpdateTurma = function partiallyUpdateTurma (req, res, next) {
    var turmaid = req.swagger.params['turmaid'].value;
    var body = req.swagger.params['body'].value;
    Turma.partiallyUpdateTurma(turmaid,body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.updateTurma = function updateTurma (req, res, next) {
    var turmaid = req.swagger.params['turmaid'].value;
    var body = req.swagger.params['body'].value;
    Turma.updateTurma(turmaid,body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
