const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '0c459b9dca5a4e54a65f2fded3c80fc7',
});

// Clarifai.MODERATION_MODEL defaults to the last onemptied,
// if one day it fails try replacing Clarifai.MODERATION_MODEL
// with this modelId
// Clarifai.MODERATION_MODEL that I know it works:
// modelId = 'd16f390eb32cad478c7ae150069bd2c6';
// versionId = 'aa8be956dbaa4b7a858826a84253cab9';
const handleApiCallModeration = (req, res) => {
  app.models
    .predict(Clarifai.MODERATION_MODEL, req.body.input)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json('Unable to work with API.'));
};

// Clarifai.FACE_DETECT_MODEL defaults to the last onemptied,
// if one day it fails try replacing Clarifai.MODERATION_MODEL
// with this modelId
// Clarifai.FACE_DETECT_MODEL that I know it works:
// modelId = "a403429f2ddf4b49b307e318f00e528b";
// versionId = "34ce21a40cc24b6b96ffee54aabff139";
const handleApiCallFaceDetect = (req, res) => {
  app.models
    .initModel({
      id: Clarifai.FACE_DETECT_MODEL,
    })
    .then((faceDetectModel) => {
      return faceDetectModel.predict(req.body.input);
    })
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

module.exports = {
  handleImageSubmit,
  handleApiCallModeration,
  handleApiCallFaceDetect,
};
