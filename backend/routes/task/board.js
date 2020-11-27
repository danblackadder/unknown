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
            Project.find({ board: board._id }, (err, projects) => {
                projects.map((project, index) => {
                    let projectBoard = {
                        _id: board._id,
                        projects: {
                            'Backlog': [],
                            'In Progress': [],
                            'Completed': []
                        }
                    };
                    projectBoard.projects[project.workflow].push(project);
                    if (index == projects.length - 1) {
                        res.send(projectBoard);
                    }
                });
            }).sort({ workflow: 1, index: 1 })
        }
    });
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const newBoard = new Board({
        owner_id: req.user._id,
        created: new Date(),
    });

    newBoard.save().then(board => {
        res.json(board);
    });
});

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Board.findById(req.params.id, (err, board) => {
        if (err) {
            res.status(500).send(err);
        } else {
            
            console.log(req.body);

            board.save((err, update) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(update);
                }
            });
        }
    });
});

module.exports = router;
