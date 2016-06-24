const express = require('express');
const router = express.Router();
// const Picture = require('../../services/pictures'); not working for some reason...tbc
const knex = require('../../db/knex');

function picture() {
  return knex('pictures');
}

// routes
router.get('/pic/:id', getById);
router.get('/user', getAllbyUser);
router.post('/add', addPicture);
router.put('/update', updatePicture);
router.delete('/delete', deletePicture);

module.exports = router;

function getById(req, res, next) {
  picture().where({ id: req.params.id }).then((picture) => {
    res.send(picture);
  })
  .catch((error) => {
    res.status(400).send(error);
  });
}

function getAllbyUser(req, res, next) {
  picture().where({ author_id: req.user.sub }).then((pictures) => {
    res.send(pictures);
  })
  .catch((error) => {
    res.status(400).send(error);
  });
}

function addPicture(req, res, next) {
  picture().insert({ link: req.body.link, author_id: req.user.sub }, '*').then((newPic) => {
    res.send(newPic);
  })
  .catch((error) => {
    res.status(400).send(error);
  });
}

function updatePicture(req, res, next) {
  picture()
    .where({ id: req.body.id })
    .update(req.body, '*').then((updatePic) => {
      res.send(updatePic);
    })
    .catch((error) => {
      cres.status(400).send(error);
    });
}

function deletePicture(req, res, next) {
  picture().where({ id: req.params.id }).del().then((row) => {
    res.send(row);
  })
  .catch((error) => {
    res.status(400).send(error);
  });
}
