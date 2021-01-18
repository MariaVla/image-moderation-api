const express = require('express');
const bcrypt = require('bcrypt');
var cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', function (req, res) {
  // TODO majo: get all users?
  res.send('This is working');
});

app.post('/signin', (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);
  // TODO majo
  res.json('ok');
});

app.post('/register', (req, res) => {
  // TODO majo
  res.json('register');
});

app.get('/profile/:id', (req, res) => {
  // TODO majo
  res.json('/profile/:id');
});

app.put('/image', (req, res) => {
  // TODO majo
  res.json('/image');
});

app.get('*', (req, res) => {
  res.json('not exits');
});

app.listen(3000);
