const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const imageSubmit = require('./controllers/image');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: '',
    password: '',
    database: 'moderationApp',
  },
});

const saltRounds = 10; // for bcrypt
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', function (req, res) {
  // knex
  //   .select('*')
  //   .from('users')
  //   .then((data) => console.log(data));
  res.send('This is working');
});

app.post('/signin', (req, res) => signin.handleSignin(req, res, knex, bcrypt));

app.post('/register', (req, res) =>
  register.handleRegister(req, res, knex, bcrypt, saltRounds)
);

app.get('/profile/:id', (req, res) => res.send('Work in progress.'));

app.put('/image', (req, res) => imageSubmit.handleImageSubmit(req, res, knex));

app.get('*', (req, res) => res.json('not found'));

app.listen(3000);
