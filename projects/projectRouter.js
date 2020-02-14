const express = require('express');
const router = express.Router();
const Projects = require('../data/helpers/projectModel.js');
const Actions = require('../data/helpers/actionModel.js');

router.get(`/`, (req, res) => {
  Projects.get()
    .then(proj => {
      res.status(200).json(proj);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMsg: "Can't retrieve projects" });
    });
});

router.get(`/:id`, (req, res) => {
  Projects.get(req.params.id)
    .then(proj => {
      if (proj) {
        res.status(200).json(proj);
      } else {
        res.status(404).json({ msg: "The project with this ID doesn't exist" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMsg: 'Error retrieving project' });
    });
});

router.delete(`/:id`, (req, res) => {
  Projects.remove(req.params.id)
    .then(proj => {
      res.status(200).json(proj);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMsg: 'Error removing project' });
    });
});

router.put(`/:id`, (req, res) => {
  Projects.update(req.params.id, req.body)
    .then(proj => {
      res.status(200).json(proj);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMsg: 'Error updating project' });
    });
});

router.post('/:id/actions', (req, res) => {
  const task = req.body;
  const projId = req.params.id;
  task.project_id = projId;

  Actions.insert(task)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMsg: 'Could not add task' });
    });
});

router.post('/', (req, res) => {
  Projects.insert(req.body)
    .then(proj => {
      res.status(200).json(proj);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMsg: 'Error adding project' });
    });
});

module.exports = router;
