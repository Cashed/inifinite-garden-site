const express = require('express');
const router = express.Router();
const Picture = require('../../services/pictures');

// routes
router.get('/pic/:id', getById);
router.get('/user/:id', getAllbyUser);
router.post('/add', addPicture);
router.put('/update', updatePicture);
router.delete('/delete', deletePicture);

module.exports = router;

function getById(req, res, next) {
  Picture.getById(req.params.id, (error, pic) => {
    if (error) {
      res.status(400).send(error);
    }
    else if (pic) {
      res.send(pic);
    }
    else {
      res.sendStatus(404);
    }
  });
}

function getAllbyUser(req, res, next) {
  Picture.getAllbyUser(req.params.id, (error, pics) => {
    if (error) {
      res.status(400).send(error);
    }
    else if (pics) {
      res.send(pics);
    }
    else {
      res.sendStatus(404);
    }
  });
}

function addPicture(req, res, next) {
  Picture.addPic(req.body, (error, newPic) => {
    if (error) {
      res.status(400).send(error);
    }
    else {
      res.send(newPic);
    }
  });
}

function updatePicture(req, res, next) {
  Picture.updatePic(req.body, (error, updatePic) => {
    if (error) {
      res.status(400).send(error);
    }
    else {
      res.send(updatePic);
    }
  });
}

function deletePicture(req, res, next) {
  Picture.deletePic(req.params.id, (error, row) => {
    if (error) {
      res.status(400).send(error);
    }
    else {
      res.send(row);
    }
  });
}
