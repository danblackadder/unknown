const express = require('express');
const passport = require('passport');
const router = express.Router();

const validateProjectInput = require('../../validation/task/project');

const Project = require('../../models/task/Project');

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    // #swagger.tags = ['Project']
    // #swagger.method = 'get'
    // #swagger.path = '/api/projects/{id}'
    // #swagger.parameters['id'] = { in: 'path', description: 'Project ID' }

    Project.findById(req.params.id, (err, project) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(project);
        }
    });
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    // #swagger.tags = ['Project']
    // #swagger.method = 'post'
    // #swagger.path = '/api/projects/'
    // #swagger.parameters['name'] = { in: 'path', description: 'Project Name' }
    // #swagger.parameters['board'] = { in: 'path', description: 'User ID' }
    // #swagger.parameters['user_ids'] = { in: 'path', description: 'Array of User IDs' }

    const { errors, isValid } = validateProjectInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newProject = new Project({
        name: req.body.name,
        board: req.body.board,
        workflow: req.body.workflow,
        index: req.body.index,
        tags: req.body.tags,
        created: new Date(),
    });

    newProject.save().then(project => {
        res.json(project);
    });
},
);

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    // #swagger.tags = ['Project']
    // #swagger.method = 'put'
    // #swagger.path = '/api/projects/{id}'
    // #swagger.parameters['id'] = { in: 'path', description: 'Project ID' }
    // #swagger.parameters['name'] = { in: 'path', description: 'New Project Name' }

    Project.findById(req.params.id, (err, project) => {
        if (err) {
            res.status(500).send(err);
        } else {
            project.name = req.body.name ? req.body.name : project.name;
            project.workflow = req.body.workflow ? req.body.workflow : project.workflow;
            project.tags = req.body.tags ? req.body.tags : project.tags;
            project.board = req.body.board ? req.body.board : project.board;
            project.index = req.body.index ? req.body.index : project.index;

            project.save((err, update) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(update);
                }
            });
        }
    });
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    // #swagger.tags = ['Project']
    // #swagger.method = 'delete'
    // #swagger.path = '/api/projects/{id}'
    // #swagger.parameters['id'] = { in: 'path', description: 'Project ID' }

    Project.findById(req.params.id, (err, project) => {
        project.remove(err => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('Project Deleted');
            }
        })
    });
});

module.exports = router;
