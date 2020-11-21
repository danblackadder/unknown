const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * 
 * @typedef Project
 * @property {string} name.required
 * @property {objectId} owner_id.required
 * @property {array.objectId} user_ids
 * @property {date} created
 * @property {date} updated
 *  
*/

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    owner_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    user_ids: {
        type: Array,
        required: false,
    },
    workflow: {
        type: String,
        default: 'Backlog'
    },
    tags: {
        type: Array,
        required: false,
    },
    tasks: {
        type: Number,
        default: 0
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
