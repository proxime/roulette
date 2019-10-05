const mongoose = require('mongoose');

const JackpotSchema = new mongoose.Schema({
    cash: {
        type: Number,
        required: true,
        default: 0,
    },
    current: {
        type: Boolean,
        required: true,
        default: true,
    },
    winner: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    players: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                ref: 'user'
            },
            cash: {
                type: Number,
                required: true,
            }
        },
    ],
    started: {
        type: Boolean,
        required: true,
        default: false,
    }
});

module.exports = Jackpot = mongoose.model('jackpot', JackpotSchema);