const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 8080;
const mainDir = path.join(__dirname, "/public");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Routes
app.get('*', (req, res) => {
  res.sendFile(path.join(mainDir, 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(mainDir, 'notes.html'));
});

app.get('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(notes);
})

app.get('/api/notes/:id', (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  const note = notes.filter(obj => {
    return obj.id === req.params.id;
  })
  res.json(note);
})

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});