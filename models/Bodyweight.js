const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BodyweightSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    weight: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Bodyweight = mongoose.model("bodyweights", BodyweightSchema);
module.exports = Bodyweight;