const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  const notes = getAllNotes();
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const notes = getAllNotes();
  const note = notes.filter(obj => {
    return obj.id === req.params.id;
  });
  res.json(note);
});

app.post('/api/notes', (req, res) => {
  const notes = getAllNotes();
  let newNote = req.body;
  const newNoteId = uuidv4();
  newNote.id = newNoteId;
  notes.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
})

app.delete('/api/notes/:id', (req, res) => {
  const notes = getAllNotes();
  const noteId = req.params.id;
  const newNotes = notes.filter(obj => {
    return obj.id !== noteId;
  });
  fs.writeFileSync("./db/db.json", JSON.stringify(newNotes));
  res.json(newNotes);
})


function getAllNotes() {
  const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  console.log(notes);
  return notes;
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});