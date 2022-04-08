const express = require("express");
const commentRouter = express.Router();
const Comment = require('../models/comment.js');


//POST Create One
commentRouter.post('/', (req, res, next) => {
    const newComment = new Comment(req.body);
    newComment.save((err, savedComment) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(201).send(savedComment);
    });
});

// GET  One
commentRouter.get('/:commentId', (req, res, next) => {
    Comment.find({ _id: req.params.commentId }, (err, comments) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(200).send(comments);
    });
});


// GET  All
commentRouter.get('/', (req, res, next) => {
    Comment.find((err, comments) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(200).send(comments);
    });
});



// PUT Update One
commentRouter.put('/:commentId', (req, res, next) => {
    Comment.findOneAndUpdate(
        { _id: req.params.commentId },
        req.body,
        { new: true },
        (err, updatedComment) => {
            if(err){
                res.status(500);
                return next(err);
            }
            return res.status(201).send(updatedComment);
        }
    );
});



// DELETE One
commentRouter.delete('/:commentId', (req, res, next) => {
    Comment.findOneAndDelete({ _id: req.params.commentId }, (err, deletedComment) => {
        if(err){
            res.status(500);
            return next(err);
        }
      res.status(200).send(`You have successfully deleted "${deletedComment.title}"`);
    });
});


module.exports = commentRouter;