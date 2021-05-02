const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const imageSubmit = require('./controllers/image');
const profile = require('./controllers/profile');
const auth = require('./controllers/authorization');

const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString:
      process.env.DATABASE_URL || 'postgres://@localhost:5432/moderationApp',
    ssl: process.env.DATABASE_URL
      ? {
          rejectUnauthorized: false,
        }
      : false,
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
app.post('/signin', signin.signInAuthentication(knex, bcrypt));

// Option 2
app.post('/register', (req, res) =>
  register.handleRegister(req, res, knex, bcrypt, saltRounds)
);

app.put('/image', auth.requireAuth, (req, res) =>
  imageSubmit.handleImageSubmit(req, res, knex)
);
app.post('/imageurl', auth.requireAuth, (req, res) =>
  imageSubmit.handleApiCallModeration(req, res)
);
app.post('/imageurlfacedetect', auth.requireAuth, (req, res) =>
  imageSubmit.handleApiCallFaceDetect(req, res)
);

app.get('/profile/:id', auth.requireAuth, (req, res) =>
  profile.handleProfileGet(req, res, knex)
);
app.post('/profile/:id', auth.requireAuth, (req, res) =>
  profile.handleProfileUpdate(req, res, knex)
);

app.get('*', (req, res) => res.json('not found'));

app.listen(process.env.PORT || 3000, () =>
  console.log(`App is running in port: ${process.env.PORT || 3000}`)
);
