const express = require('express');
const passport = require('passport');
const router = express.Router();

const validateProjectInput = require('../../validation/task/project');

const Project = require('../../models/task/Project');

router.get('/', (req, res) => {
    Project.find({ user_id: req.params.user_id }, (err, projects) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(projects);
        }
    });
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
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

router.post('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
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
