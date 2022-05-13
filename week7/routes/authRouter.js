const express = require('express');
const authRouter = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

authRouter
    .get('/', (req, res, next) => {
        User.find((err, users) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(200).send(users);
        })
    }) 

    .delete('/:userID', (req, res, next) => {
        User.findOneAndDelete({_id: req.params.userID}, (err, deleted) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(200).send('Item successfully deleted')
        })
    }) 

    .get('/search/user', (req, res, next) => {
        User.findOne({_id: req.query._id}, (err, user) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(200).send(user);
        })
    }) 

    .post('/signup', (req, res, next) => {
        User.findOne({userName: req.body.userName.toLowerCase()}, (err, user) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (user) {
                res.status(403);
                return next(new Error('Username already exists'));
            }
            const newUser = new User(req.body);
            newUser.save((err, savedUser) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                const token = jwt.sign(savedUser.noPassword(), process.env.SECRET)
                return res.status(201).send({token, user: savedUser.noPassword()})
            })
        })
    }) 

    .post('/login', (req, res, next) => {
        const failedInfo = 'Invalid login information'
        User.findOne({userName: req.body.userName.toLowerCase()}, (err, user) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            user.checkPassword(req.body.password, (err, match) => {
                if (err) {
                    res.status(403)
                    return next(new Error(failedInfo))
                }
                if (!match) {
                    res.status(403);
                    return next(new Error(failedInfo));
                }
                const token = jwt.sign(user.noPassword(), process.env.SECRET);
                return res.status(200).send({token, user: user.noPassword()});
            })
        })
    }) 

module.exports = authRouter;