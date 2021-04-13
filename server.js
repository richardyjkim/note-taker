const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const fs = require('fs');
const note = require('./Develop/db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));

});

app.get('/api/notes', (req, res) => {
  res.json(note);
});


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});

