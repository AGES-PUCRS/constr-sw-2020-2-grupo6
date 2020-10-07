var express = require('express');
var router = express.Router();
const {
  getAllTurmas,
  getTurmaById,
  createTurma,
  updateTurma,
  deleteTurma,
  updateTurmaByField
} = require('../controllers');

/* GET home page. */
router.get('/turmas', async function (req, res, next) {
  const turmas = await getAllTurmas()
  res.send(turmas)
});

router.get('/turma/:turmaid', function (req, res, next) {
  const id = req.params.turmaid
  const turma = getTurmaById(id)
  res.send(turma)
});

router.delete('/turma/delete/:turmaid', async function (req, res, next) {
  const id = req.params.turmaid
  const turma = await deleteTurma(id, res)
  console.log(turma)
  res.send(turma)
});

router.put('/turma/update/:turmaid', function (req, res, next) {
  const id = req.params.turmaid
  const body = req.body
  const turma = updateTurma(id, body)
  res.send(turma)
});

router.post('/turma/create', async function (req, res, next) {
  const body = req.body
  const turma = await createTurma(body)
  res.send(turma)
});

router.patch('/turma/patch/:turmaid', function (req, res, next) {
  const id = req.params.turmaid
  const body = req.body
  const turma = updateTurmaByField(id, body)
  res.send(turma)
});

module.exports = router;
