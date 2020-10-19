var express = require('express');
var router = express.Router();
const {
    getAllTurmas,
    getTurmaById,
    createTurma,
    updateTurmaById,
    getAulasById,
    getAlunosById,
    deleteTurmaById,
    updateTurmaByField,
} = require('../controllers');

/* GET home page. */
router.get('/turma', async function (req, res, next) {
    const turmas = await getAllTurmas(req.query);
    res.send(turmas);
});

router.get('/turma/:turmaid', async function (req, res, next) {
    const id = req.params.turmaid;
    const turma = await getTurmaById(id);
    res.send(turma);
});

router.get('/turma/getAulas/:turmaid', async function (req, res, next) {
    const id = req.params.turmaid;
    const turma = await getAulasById(id);
    res.send(turma);
});

router.get('/turma/getAlunos/:turmaid', async function (req, res, next) {
    const id = req.params.turmaid;
    const turma = await getAlunosById(id);
    res.send(turma);
});

router.delete('/turma/delete/:turmaid', async function (req, res, next) {
    const id = req.params.turmaid;
    const codigo = await deleteTurmaById(id, res);
    res.send(codigo);
});

router.put('/turma/update/:turmaid', async function (req, res, next) {
    const id = req.params.turmaid;
    const body = req.body;
    const codigo = await updateTurmaById(id, body);
    res.send(codigo);
});

router.post('/turma/create', async function (req, res, next) {
    const body = req.body;
    const turma = await createTurma(body);
    if (turma !== 400){
        res.status(201)
    }
    res.send(turma);
});

router.patch('/turma/patch/:turmaid', async function (req, res, next) {
    const id = req.params.turmaid;
    const body = req.body;
    const turma = await updateTurmaByField(id, body);
    res.send(turma);
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Turmas' });
});

module.exports = router;
