const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    projectId: {
        type: Schema.Types.ObjectId,
        required: false,
    },
    parentId: {
        type: Schema.Types.ObjectId,
        required: false,
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

const Task = mongoose.model('tasks', TaskSchema);

module.exports = Task;
