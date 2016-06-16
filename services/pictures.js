const knex = require('../db/knex');

function picture() {
  return knex('pictures');
}

picture.getById = (id, callback) => {
  picture().where({ id: id }).then((picture) => {
    callback(undefined, picture);
  })
  .catch((error) => {
    callback(error);
  });
}

picture.getAllbyUser = (userId, callback) => {
  picture().where({ author_id: userId }).then((pictures) => {
    callback(undefined, pictures);
  })
  .catch((error) => {
    callback(error);
  });
}

picture.addPic = (picture, callback) => {
  console.log(picture);
  picture().insert({ link: picture.link }, '*').then((newPic) => {
    callback(undefined, newPic);
  })
  .catch((error) => {
    callback(error);
  });
}

picture.updatePic = (picture, callback) => {
  picture()
    .where({ id: picture.id })
    .update(picture, '*').then((updatePic) => {
      callback(undefined, updatePic);
    })
    .catch((error) => {
      callback(error);
    });
}

picture.deletePic = (id, callback) => {
  picture().where({ id: id }).del().then((row) => {
    callback(undefined, row);
  })
  .catch((error) => {
    callback(error);
  });
}
