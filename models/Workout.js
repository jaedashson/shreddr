const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: "exercises"
        }
    ]
})

const Workout = mongoose.model("workouts", WorkoutSchema);
module.exports = Workout;