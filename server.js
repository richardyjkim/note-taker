const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const fs = require('fs');
const note = require('./Develop/db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));

// app.get
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get('/notes', (req, res) => {
  loadPage(res);

});

app.get('/api/notes', (req, res) => {
  res.json(note);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
})

// app.post
app.post('/api/notes', (req, res) => {
  let newNote = req.body;
  let notePath = path.join(__dirname, './Develop/db/db.json');
  note.push(newNote);
  fs.writeFile(notePath, JSON.stringify(note), err => {
    if (err) {
      return console.log(err)
    }
    console.log("Note successfully saved");
  })
  res.json(newNote);
  loadPage(res);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});

loadPage = (res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
}