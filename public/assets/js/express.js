const express = require('express');
const path = require('path');
const apiRoutes = require('./apiRoutes.js');
const htmlRoutes = require('./htmlRoutes.js');
// let notes = require('../db/db.json');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/public', express.static(__dirname + '/public'));
app.use('/api', express.static('./apiRoutes.js'));
app.use('/', express.static('./htmlRoutes.js'));
app.get('/assets/js/index.js', (req, res) => {
  res.sendFile(path.join(__dirname, './index.js'));
});
app.get('/assets/css/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, './../css/styles.css'));
});

//Routes
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './../../index.html'));
// });

// app.get('/notes', (req, res) => {
//   res.sendFile(path.join(__dirname, './../../notes.html'));

// });



app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});