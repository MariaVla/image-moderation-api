const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '0c459b9dca5a4e54a65f2fded3c80fc7',
});

const handleApiCallModeration = (req, res) => {
  app.models
    .predict(Clarifai.MODERATION_MODEL, req.body.input)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json('Unable to work with API.'));
};

function handleImageSubmit(req, res, knex) {
  const { id } = req.body;
  knex('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json('unable to get entries'));
}

module.exports = { handleImageSubmit, handleApiCallModeration };
