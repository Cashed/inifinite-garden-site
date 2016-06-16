const knex = require('../db/knex');

function comment() {
  return knex('comments');
}

comment.getById = (id, callback) => {
  comment().where({ id: id }).then((comment) => {
    callback(undefined, comment);
  })
  .catch((error) => {
    callback(error);
  });
}

comment.getAllbyPost = (postId, callback) => {
  comment().where({ post_id: postId }).then((comments) => {
    callback(undefined, comments);
  })
  .catch((error) => {
    callback(error);
  });
}

comment.addPost = (comment, callback) => {
  comment().insert(comment, '*').then((newComment) => {
    callback(undefined, newPost);
  })
  .catch((error) => {
    callback(error);
  });
}

comment.updatePost = (comment, callback) => {
  comment()
    .where({ id: comment.id })
    .update(comment, '*').then((updateComment) => {
      callback(undefined, updateComment);
    })
    .catch((error) => {
      callback(error);
    });
}

comment.deletePost = (id, callback) => {
  comment().where({ id: id }).del().then((row) => {
    callback(undefined, row);
  })
  .catch((error) => {
    callback(error);
  });
}

module.exports = comment;
