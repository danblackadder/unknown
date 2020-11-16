const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        required: true,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
