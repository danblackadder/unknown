const express = require('express');
const passport = require('passport');
const router = express.Router();

const Board = require('../../models/task/Board');
const Project = require('../../models/task/Project');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    Board.findOne({ owner_id: req.user._id }, (err, board) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (board) {
                let projectBoard = {
                    _id: board._id,
                    projects: {
                        'Backlog': [],
                        'In Progress': [],
                        'Completed': []
                    }
                };

                Project.find({ board: board._id }, (err, projects) => {
                    if (projects.length > 0) {
                        projects.map((project, index) => {
                            projectBoard.projects[project.workflow].push(project);
                            if (index == projects.length - 1) {
                                res.send(projectBoard);
                            }
                        });
                    } else {
                        res.send(projectBoard)
                    }
                }).sort({ workflow: 1, index: 1 })
            } else {
                res.send(board)
            }
        }
    });
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const newBoard = new Board({
        owner_id: req.user._id,
        created: new Date(),
    });

    newBoard.save().then(board => {
        let projectBoard = {
            _id: board._id,
            projects: {
                'Backlog': [],
                'In Progress': [],
                'Completed': []
            }
        };
        res.json(projectBoard);
    });
});

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Board.findById(req.params.id, (err, board) => {
        if (err) {
            res.status(500).send(err);
        } else {
            var projects_array = req.body;
            if (projects_array.length > 0) {
                projects_array.map(updated_project => {
                    var project_id = updated_project._id;
                    console.log(project_id);
                    Project.findById(project_id, (err, project) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            project.workflow = updated_project.workflow;
                            project.index = updated_project.index;
                            project.board = board._id;

                            project.save((err, update) => {
                                if (err) {
                                    res.status(500).send(err);
                                } else {
                                    if (project._id == projects_array[projects_array.length - 1]._id) {
                                        res.send('Sync complete');
                                    };
                                }
                            });
                        }
                    })
                })
            } else { 
                res.status(500).send('No projects sent for board');
            }
        }
    });
});

module.exports = router;
