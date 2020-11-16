const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        required: false,
    },
    userIds: {
        type: Array,
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

const Project = mongoose.model('projects', ProjectSchema);

module.exports = Project;
