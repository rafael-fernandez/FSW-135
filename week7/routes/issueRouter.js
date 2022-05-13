const express = require("express")
const issueRouter = express.Router()
const Issue = require('../models/issue.js')

issueRouter
.get("/", (req, res, next) => {
    Issue.find((err, issues) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      res.status(200).send(issues);
    })
  }) 

  
  .get("/:issueID", (req, res, next) => {
    Issue.find({_id: req.params.issueID}, (err, issue) => {
      if (err) {
        res.status(500);
        return next(err);
      }

      if (issue.length === 0) {
        const error = new Error('Post does not exist');
        return next(error);
      }
      else if (issue.length !== 0) {
        res.status(200).send(issue);
      }
    })
  }) 

  .get("/search/user", (req, res, next) => {
    Issue.find({userID: req.query.userID}, (err, issues) => {
      if (err) {
        res.status(500);
        return next(err);
      }

      if (issues.length === 0) {
        const error = new Error('No post under this user');
        return next(error);
      }
      else if (issues.length !== 0) {
        res.status(200).send(issues)
      }
    })
  }) 

  .post("/", (req, res, next) => {
    req.body.userID = req.user._id;
    req.body.userProfImg = req.user.profImg;
    req.body.userName = req.user.userName;
    const newIssue = new Issue(req.body);
    newIssue.save((err, savedIssue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      res.status(201).send(savedIssue);
    })
  }) 

  .delete("/:issueID", (req, res, next) => {
    Issue.findOneAndDelete(
      { _id: req.params.issueID },
      (err, deletedIssue) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        res.status(200).send(`Successfully deleted issue: ${deletedIssue.title}`);
      }
    )
  }) 

  .put("/:issueID", (req, res, next) => {
    Issue.findOneAndUpdate(
      { _id: req.params.issueID },
      req.body,
      { new: true },
      (err, updatedIssue) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        res.status(201).send(updatedIssue);
      }
    )
  }) 

  .put("/upvote/:issueID", (req, res, next) => {
    Issue.findOneAndUpdate(
      { _id: req.params.issueID },
      {$inc: {upVotes: 1}},
      (err, updatedIssue) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        res.status(201).send(updatedIssue);
      }
    )
  }) 

  .put("/downvote/:issueID", (req, res, next) => {
    Issue.findOneAndUpdate(
      { _id: req.params.issueID },
      {$inc: {downVotes: 1}},
      (err, updatedIssue) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        res.status(201).send(updatedIssue);
      }
    )
  }) 

module.exports = issueRouter;