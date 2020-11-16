const express = require('express');
const passport = require('passport');
const router = express.Router();

const validateTaskInput = require('../../validation/task/task');

const Task = require('../../models/task/Task');

router.get('/', (req, res) => {
    Task.find({ user_id: req.params.user_id }, (err, tasks) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(tasks);
        }
    });
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
        const { errors, isValid } = validateTaskInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            parent_id: req.body.parent_id,
            created: new Date(),
        });

        console.log(newTask);
        newTask.save().then(task => {
            res.json(task);
        });
    },
);

router.post('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateTaskInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Task.findById(req.params.id, (err, task) => {
        if (err) {
            res.status(500).send(err);
        } else {
            task.title = req.body.title;
            task.description = req.body.description;
            
            task.save((err, update) => {
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
    Task.findById(req.params.id, (err, task) => {
        task.remove(err => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('Task Deleted');
            }
        })
    });
});

module.exports = router;
