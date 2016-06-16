const knex = require('../db/knex');

function post() {
  return knex('posts');
}

post.getById = (id, callback) => {
  post().where({ id: id }).then((post) => {
    callback(undefined, post);
  })
  .catch((error) => {
    callback(error);
  });
}

post.getAllbyUser = (userId, callback) => {
  post().where({ author_id: userId }).then((posts) => {
    callback(undefined, posts);
  })
  .catch((error) => {
    callback(error);
  });
}

post.addPost = (post, callback) => {
  post().insert(post, '*').then((newPost) => {
    callback(undefined, newPost);
  })
  .catch((error) => {
    callback(error);
  });
}

post.updatePost = (post, callback) => {
  post()
    .where({ id: post.id })
    .update(post, '*').then((updatePost) => {
      callback(undefined, updatePost);
    })
    .catch((error) => {
      callback(error);
    });
}

post.deletePost = (id, callback) => {
  post().where({ id: id }).del().then((row) => {
    callback(undefined, row);
  })
  .catch((error) => {
    callback(error);
  });
}

module.exports = post;
