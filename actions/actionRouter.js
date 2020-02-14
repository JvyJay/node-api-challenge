const express = require('express');
const router = express.Router();
const Actions = require('../data/helpers/actionModel');

router.get(`/`, (req, res) => {
  Actions.get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMsg: "Can't retrieve actions" });
    });
});

router.get(`/:id`, (req, res) => {
  Actions.get(req.params.id).then(action => {
    if (action) {
      res.status(200).json(action);
    } else {
      res
        .status(404)
        .json({ errorMsg: "The action with this ID doesn't exist" });
    }
  });
});

router.delete(`/:id`, (req, res) => {
  Actions.remove(req.params.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMsg: 'Error removing action' });
    });
});

router.put(`/:id`, (req, res) => {
  Actions.update(req.params.id, req.body)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMsg: 'Error updating action' });
    });
});

router.post(`/`, (req, res) => {
  const content = req.body;
  Actions.insert(content)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMsg: 'Error adding action' });
    });
});

module.exports = router;
