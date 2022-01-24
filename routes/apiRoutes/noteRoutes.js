const router = require('express').Router();
const { findById, createNewNote, deleteNote, filterByQuery } = require('../../lib/notes');
//let { notes } = require('../../db/db');
let notes = require('../../db/db').notes;

router.get('/notes', (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post('/notes', (req, res) => {
  const note = createNewNote(req.body, notes);
  res.json(note);
});

router.delete('/notes/:id', (req, res) => {
  const notesArray = deleteNote(req.params.id, notes);
  delete require.cache[require.resolve('../../db/db')];
  notes = require('../../db/db').notes;
  res.json(notesArray);
})

module.exports = router;