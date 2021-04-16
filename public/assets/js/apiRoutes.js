const fs = require('fs');
const path = require('path');
// const { v4: uuidv4 } = require('uuid');
const express = require('express');

const router = express.Router();

const dbPath = path.join(__dirname, './../../../db/db.json');

router.get('/notes', (req, res) => {
  fs.readFile(dbPath, (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  })
})

module.exports = router;