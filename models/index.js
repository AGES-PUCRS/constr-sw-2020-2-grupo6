const Mongoose = require('mongoose');

const turmaSchema = new Mongoose.Schema({
    ano: {
        type: Number,
        required: true,
    },
    semestre: {
        type: Number,
        required: true,
    },
    numero: {
        type: Number,
        required: true,
    },
    horario: {
        type: Array,
        required: true,
    },
    professor: {
        type: String,
        required: true,
    },
    aulas: {
        type: Array,
        required: false,
    },
    disciplina: {
        type: String,
        required: true,
    },
    sala: {
        type: String,
        required: true,
    },
    alunos: {
        type: Array,
        required: false,
    }
});

module.exports = Turma = Mongoose.model('Turma', turmaSchema);
