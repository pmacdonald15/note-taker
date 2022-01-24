const fs = require('fs-extra');
const path = require('path');
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId();

function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if (query.title) {
    filteredResults = filteredResults.filter(note => note.title.includes(query.title));
  } 
  if (query.text) {
    filteredResults = filteredResults.filter(note => note.text.includes(query.text));
  }
  return filteredResults;
}

function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
}

function createNewNote(body, notesArray) {
  const id = { id: uid() };
  const note = Object.assign(id, body);
  notesArray.push(note);

  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

function deleteNote(id, notesArray) {
  let remainingNotes = [];
  for (let i = 0; i < notesArray.length; i++) {
    if (notesArray[i].id !== id) {
      remainingNotes.push(notesArray[i]);
    }
  }


  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ notes: remainingNotes }, null, 2)
  );
  return remainingNotes;
}

module.exports = { findById, createNewNote, deleteNote, filterByQuery };