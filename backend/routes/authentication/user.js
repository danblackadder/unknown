const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('express-mailer');
const dotenv = require('dotenv');
const passport = require('passport');

const User = require('../../models/authentication/User');

const validateRegisterInput = require('../../validation/authentication/register');
const validateLoginInput = require('../../validation/authentication/login');

const generatePassword = require('../../helpers/authentication/generatePassword');

var app = require('express')();
dotenv.config();

mailer.extend(app, {
    from: process.env.EMAIL,
    host: process.env.HOST, // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

router.post('/register', (req, res) => {

    // #swagger.tags = ['Users']
    // #swagger.method = 'post'
    // #swagger.path = '/api/users/register'
    // #swagger.parameters['first_name'] = { in: 'path', description: 'New Users First Name' }
    // #swagger.parameters['last_name'] = { in: 'path', description: 'New Users Last Name' }
    // #swagger.parameters['email'] = { in: 'path', description: 'New Users Email' }
    
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email,
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email already exists',
            });
        } else {
            let password = generatePassword();

            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('There was an error', err);
                else {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) console.error('There was an error', err);
                        else {
                            app.mailer.send(
                                'user',
                                {
                                    to: req.body.email,
                                    subject: `New account created for ${req.body.first_name} ${req.body.last_name}`,
                                    first_name: req.body.first_name,
                                    last_name: req.body.last_name,
                                    password: password,
                                    troubleshoot: process.env.EMAIL,
                                    domain: process.env.DOMAIN,
                                },
                                (err) => {
                                    if (err) {
                                        console.log(err);
                                        res.send(
                                            'There was an error sending the email. User not created',
                                        );
                                        return res.status(400);
                                    } else {

                                        const newUser = new User({
                                            first_name: req.body.first_name,
                                            last_name: req.body.last_name,
                                            email: req.body.email,
                                            password: password,
                                            root: req.body.root,
                                            admin: req.body.admin,
                                            created: new Date(),
                                        });

                                        newUser.password = hash;
                                        newUser.save().then(user => {
                                            res.json(user);
                                        });
                                    }
                                },
                            );
                        }
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res) => {

    // #swagger.tags = ['Users']
    // #swagger.method = 'post'
    // #swagger.path = '/api/users/login'
    // #swagger.parameters['email'] = { in: 'path', description: 'Email' }
    // #swagger.parameters['password'] = { in: 'path', description: 'Password' }

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then(user => {
        if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name,
                };
                jwt.sign(
                    payload,
                    process.env.SECRET,
                    {
                        expiresIn: 3600,
                    },
                    (err, token) => {
                        if (err)
                            console.error('There is some error in token', err);
                        else {
                            res.json({
                                success: true,
                                token: `${token}`,
                                id: user.id,
                                theme: user.theme,
                                image: user.image
                            });
                        }
                    },
                );
            } else {
                errors.password = 'Incorrect Password';
                return res.status(400).json(errors);
            }
        });
    });
});


router.put('/theme', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById( req.user._id, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            user.theme = req.body.theme;

            user.save((err, update) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200);
                };
            });
        };
    });
})

const multer  = require('multer')
const upload = multer({ dest: 'uploads/temp' });
const fs = require('fs')
const mv = require('mv');
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

router.put('/image', passport.authenticate('jwt', { session: false }), upload.single('file'), (req, res) => {
    if (!req.file)
    return res.status(400).send('No files were uploaded.');

    User.findById( req.user._id, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            var re = /(?:\.([^.]+))?$/;
            var filetype = re.exec(req.file.originalname)[1];

            var newFile = `uploads/profile/${req.user._id}.${filetype}`;

            mv(req.file.path, newFile, (err) => {
                if (err) {
                    res.status(500).send(err);
                };
            });
    
            var allowed = ['png', 'jpg', 'jpeg'];
            for (var i = 0; i < allowed.length; i++) {
                if (allowed[i] != filetype) {
                    var file_check = `uploads/profile/${req.user._id}.${allowed[i]}`;
                    if (fs.existsSync(file_check)) {
                        unlinkAsync(file_check);
                    };
                };
            };

            user.image = newFile;

            user.save((err, updated) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send(updated.image);
                };
            });
        };
    });
})

router.get('/settings', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById( req.user._id, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            const userSettings = {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            };
            res.json(userSettings);
        }
    });
})

router.put('/settings', passport.authenticate('jwt', { session: false }), (req, res) => {
    var errors = {};
    if (req.body.new_password != req.body.new_password_confirmation) {
        errors.new_password = 'New passwords do no match';
    };

    User.findById( req.user._id, (err, user) => {
        if (req.body.old_password.length > 0 || req.body.new_password.length > 0 || req.body.new_password_confirmation.length > 0) {
            if (req.body.old_password.length == 0 && (req.body.new_password.length > 0 || req.body.new_password_confirmation.length > 0)) {
                errors.old_password = 'Old password must be supplied to update password';
                return res.status(400).json(errors);
            };
            if (req.body.new_password.length == 0) {
                errors.new_password = 'New Password has not been supplied';
            };
            if (req.body.new_password_confirmation.length == 0) {
                errors.new_password = 'Confirmation of New Password has not been supplied';
            }
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            bcrypt.compare(req.body.old_password, user.password).then(isMatch => {
                if (isMatch) {
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) console.error('There was an error', err);
                        else {
                            bcrypt.hash(req.body.new_password, salt, (err, hash) => {
                                if (err) console.error('There was an error', err);
                                user.first_name = req.body.first_name;
                                user.last_name = req.body.last_name;
                                user.email = req.body.email;
                                user.password = hash;

                                user.save((err, update) => {
                                    if (err) {
                                        res.status(500).send(err);
                                    } else {
                                        updatedUser = {
                                            first_name: update.first_name,
                                            last_name: update.last_name,
                                            email: update.email
                                        };
                                        res.json(updatedUser);
                                    }
                                });
                            });
                        };
                    });
                } else {
                    errors.old_password = 'Incorrect Password';
                    return res.status(400).json(errors);
                };
            });
        } else {
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.email = req.body.email;

            user.save((err, update) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    updatedUser = {
                        first_name: update.first_name,
                        last_name: update.last_name,
                        email: update.email
                    };
                    res.json(updatedUser);
                };
            });
        }
    });
})

module.exports = router;
