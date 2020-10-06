const Mongoose = require("mongoose")

const turmaSchema = new Mongoose.Schema({
    ano: {
        type: Number,
        required: true,
    },
    semestre: {
        type: Number,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    horario: {
        type: Array,
        required: true
    }
})

module.exports = Turma = Mongoose.model("Turma", turmaSchema)
