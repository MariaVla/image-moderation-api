const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const imageSubmit = require('./controllers/image');

const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    // For dev database connection
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
  res.send('This is working');
});

// Option 1
app.post('/signin', signin.handleSignin(knex, bcrypt));

// Option 2
app.post('/register', (req, res) =>
  register.handleRegister(req, res, knex, bcrypt, saltRounds)
);

app.put('/image', (req, res) => imageSubmit.handleImageSubmit(req, res, knex));
app.post('/imageurl', (req, res) =>
  imageSubmit.handleApiCallModeration(req, res)
);
app.post('/imageurlfacedetect', (req, res) =>
  imageSubmit.handleApiCallFaceDetect(req, res)
);

app.get('/profile/:id', (req, res) => res.send('Work in progress.'));

app.get('*', (req, res) => res.json('not found'));

app.listen(process.env.PORT || 3000, () =>
  console.log(`App is running in port: ${process.env.PORT || 3000}`)
);
