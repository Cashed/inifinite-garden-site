const express = require('express');
const router = express.Router();
const Post = require('../../services/posts');

// routes
router.get('/post/:id', getById);
router.get('/user/:id', getAllbyUser);
router.post('/add', addPost);
router.put('/update', updatePost);
router.delete('/delete', deletePost);

module.exports = router;

function getById(req, res, next) {
  Post.getById(req.params.id, (error, post) => {
    if (error) {
      res.status(400).send(error);
    }
    else if (post) {
      res.send(post);
    }
    else {
      res.sendStatus(404);
    }
  });
}

function getAllbyUser(req, res, next) {
  Post.getAllbyUser(req.params.id, (error, posts) => {
    if (error) {
      res.status(400).send(error);
    }
    else if (posts) {
      res.send(posts);
    }
    else {
      res.sendStatus(404);
    }
  });
}

function addPost(req, res, next) {
  Post.addPost(req.body, (error, newPost) => {
    if (error) {
      res.status(400).send(error);
    }
    else {
      res.send(newPost);
    }
  });
}

function updatePost(req, res, next) {
  Post.updatePost(req.body, (error, updatePost) => {
    if (error) {
      res.status(400).send(error);
    }
    else {
      res.send(updatePost);
    }
  });
}

function deletePost(req, res, next) {
  Post.deletePost(req.params.id, (error, row) => {
    if (error) {
      res.status(400).send(error);
    }
    else {
      res.send(row);
    }
  });
}
