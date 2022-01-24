const fs = require('fs-extra');
const { findById, createNewNote, deleteNote, filterByQuery } = require('../lib/notes');
const { notes } = require('../db/db.json');
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId();

jest.mock('fs');
test('creates a note object', () => {
  const note = createNewNote({ title: 'Remember this one', text: 'And do not forget it' }, notes);

  expect(note.title).toBe('Remember this one');
  expect(note.text).toBe('And do not forget it');
  expect(typeof note.id).toBe('string');
});

test('filter by query', () => {
  const startingNotes = [
    {
      id: uid(),
      title: 'Noteable Item 1',
      text: 'some details'
    },
    {
      id: uid(),
      title: 'Noteable Item 2',
      text: 'other details'
    },
    {
      id: uid(),
      title: 'Noteable Item 3',
      text: 'some other details'
    }
  ];
  const query = {"title": "Noteable", "text": "other"};
  const result = filterByQuery(query, startingNotes)
  expect(result.length).toEqual(2);
});

test('finds note by id', () => {
  const id1 = uid();
  const id2 = uid();
  const startingNotes = [
    {
      id: id1,
      title: 'Noteable Item 1',
      text: 'details'
    },
    {
      id: id2,
      title: 'Noteable Item 2',
      species: 'details'
    }
  ];

  const result = findById(id2, startingNotes);
  expect(result.title).toBe('Noteable Item 2');
});


jest.mock('fs');
test('delete a note based on id', () => {
  const id1 = uid();
  const id2 = uid();
  const startingNotes = [
    {
      id: id1,
      title: 'Noteable Item 1',
      text: 'details'
    },
    {
      id: id2,
      title: 'Noteable Item 2',
      species: 'details'
    }
  ];

  const result = deleteNote(id1, startingNotes);

  expect(result.length).toEqual(1);
  expect(result[0].title).toBe('Noteable Item 2');
});