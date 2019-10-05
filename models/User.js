const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    nick: {
        type: String,
    },
    luckycoins: {
        type: Number,
        required: true,
        default: 0,
    },
    color: {
        type: String,
        required: true,
        default: '#263238',
    }
});

module.exports = User = mongoose.model('user', UserSchema);