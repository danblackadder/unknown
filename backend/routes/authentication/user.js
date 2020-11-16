const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('express-mailer');
const dotenv = require('dotenv');

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
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
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
                                token: `Bearer ${token}`,
                                id: user.id
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

module.exports = router;
