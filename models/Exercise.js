const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    equipment: {
        type: [String],
        required: false
    },
    difficulty: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    muscleGroups: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Exercise = mongoose.model("exercises", ExerciseSchema);
module.exports = Exercise;