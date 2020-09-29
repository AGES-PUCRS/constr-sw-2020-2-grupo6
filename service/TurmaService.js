'use strict';


/**
 * Create turma
 * Create turma
 *
 * body Turma Create turma object
 * no response value expected for this operation
 **/
exports.createTurma = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete turma by id
 * Delete turma by id
 *
 * turmaid Long ID of turma deleted to return
 * no response value expected for this operation
 **/
exports.deleteTurma = function(turmaid) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get turma by id
 * Get turma by id
 *
 * turmaid Long ID of turma to return
 * returns Turma
 **/
exports.getTurma = function(turmaid) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "ano" : 6,
  "horario" : [ "{}", "{}" ],
  "id" : 0,
  "semestre" : 1,
  "turma" : 5
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all
 * Get all turmas
 *
 * returns getAllTurma
 **/
exports.getTurmas = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *  Partially update turma by id
 * Partially update turma by id
 *
 * turmaid String turma
 * body Turma Updated turma item object (optional)
 * no response value expected for this operation
 **/
exports.partiallyUpdateTurma = function(turmaid,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update turma by id
 * Update turma by id
 *
 * turmaid String turma
 * body Turma Updated turma item object
 * no response value expected for this operation
 **/
exports.updateTurma = function(turmaid,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

