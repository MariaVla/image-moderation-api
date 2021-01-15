const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', function (req, res) {
  res.send('This is working');
});

app.post('/signin', (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);
  res.json('ok');
});

app.post('/register', (req, res) => {
  res.json('register');
});

app.get('/profile/:id', (req, res) => {
  res.json('/profile/:id');
});

app.put('/image', (req, res) => {
  res.json('/image');
});

app.get('*', (req, res) => {
  res.json('not exits');
});

app.listen(3000);
