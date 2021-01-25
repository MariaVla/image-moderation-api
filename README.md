# image-moderation-api

`Express` server that connects to a `postgresql` database.
It uses `bcrypt` to store the passwords and `knex` to communicate with the database.

It uses the [Clarifai API](https://www.clarifai.com/) to know if the image is safe or has nudity or drugs and detect if there is a face
in the image.

This can be adapted to use others models from [Clarifai](https://www.clarifai.com/model-gallery).

## Database

![Database](/images/database-dark-mode2.png)

## Dependencies

- Node 14.5.0
- PostgreSQL 13

## Development

`$ git clone ...`

`$ yarn install`

`$ yarn start`

Enter the details for your own database in server.js

```
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'hostName',
    user: 'yourUsername',
    password: 'yourPassword',
    database: 'databaseName',
  },
});
```

## Deploy

The app lives in Heroku. Pushes to `main` will trigger a deploy.
