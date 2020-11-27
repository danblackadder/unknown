const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    owner_id: {
        type: Schema.Types.ObjectId,
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

const Board = mongoose.model('boards', BoardSchema);

module.exports = Board;
