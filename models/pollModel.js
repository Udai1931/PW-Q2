const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true  ///array=> key:{value}
    }],
    votes: [{
        type: Number,
        default: 0
    }],
    totalVotes: {
        type: Number,
        default: 0
    }
},{timestamps: true});

const pollModel = mongoose.model('Poll', pollSchema);

module.exports = pollModel