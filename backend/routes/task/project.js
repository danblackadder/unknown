const express = require('express');
const passport = require('passport');
const router = express.Router();

const validateProjectInput = require('../../validation/task/project');

const Project = require('../../models/task/Project');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    // #swagger.tags = ['Project']
    // #swagger.method = 'get'
    // #swagger.path = '/api/projects/'
    
    Project.find({ owner_id: req.user._id }, (err, projects) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(projects);
        }
    });
});



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
    // #swagger.parameters['owner_id'] = { in: 'path', description: 'User ID' }
    // #swagger.parameters['user_ids'] = { in: 'path', description: 'Array of User IDs' }

    const { errors, isValid } = validateProjectInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newProject = new Project({
        name: req.body.name,
        owner_id: req.body.owner_id,
        user_ids: req.body.user_ids,
        created: new Date(),
    });

    console.log(newProject);
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

    const { errors, isValid } = validateProjectInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Project.findById(req.params.id, (err, project) => {
        if (err) {
            res.status(500).send(err);
        } else {
            project.name = req.body.name;

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
