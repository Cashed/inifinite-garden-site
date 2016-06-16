const express = require('express');
const router = express.Router();
const Comment = require('../../services/comments');

// routes
router.get('/post/:id', getById);
router.get('/user/:id', getAllbyPost);
router.post('/add', addComment);
router.put('/update', updateComment);
router.delete('/delete', deleteComment);

module.exports = router;

function getById(req, res, next) {
  Comment.getById(req.params.id, (error, comment) => {
    if (error) {
      res.status(400).send(error);
    }
    else if (comment) {
      res.send(comment);
    }
    else {
      res.sendStatus(404);
    }
  });
}

function getAllbyPost(req, res, next) {
  Comment.getAllbyPost(req.params.id, (error, comments) => {
    if (error) {
      res.status(400).send(error);
    }
    else if (comments) {
      res.send(comments);
    }
    else {
      res.sendStatus(404);
    }
  });
}

function addComment(req, res, next) {
  Comment.addComment(req.body, (error, newComment) => {
    if (error) {
      res.status(400).send(error);
    }
    else {
      res.send(newComment);
    }
  });
}

function updateComment(req, res, next) {
  Comment.updateComment(req.body, (error, updateComment) => {
    if (error) {
      res.status(400).send(error);
    }
    else {
      res.send(updateComment);
    }
  });
}

function deleteComment(req, res, next) {
  Comment.deleteComment(req.params.id, (error, row) => {
    if (error) {
      res.status(400).send(error);
    }
    else {
      res.send(row);
    }
  });
}
