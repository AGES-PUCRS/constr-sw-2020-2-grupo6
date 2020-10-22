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
        type: [String],
        required: true,
    },
    professor: {
        type: String,
        required: true,
    },
    aulas: {
        type: [String],
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
        type: [String],
        required: false,
    }
});

module.exports = Turma = Mongoose.model('Turma', turmaSchema);
