# image-moderation-api

`Express` server that connects to a `postgresql` database.
It uses `bcrypt` to store the passwords and `knex` to communicate with the database.

It uses the [Clarifai API](https://www.clarifai.com/) to know if the image is safe or has nudity or drugs and detect if there is a face
in the image.

This can be adapted to use others models from [Clarifai](https://www.clarifai.com/model-gallery).

You need to make and account and get an API key.

## Database

![Database](/images/database-dark-mode2.png)

## Prerequisites

- Node 14.5.0
- PostgreSQL 13
- Redis 6.0.9

## Development

`$ git clone ...`

`$ yarn install`

`$ yarn start`

For this to work locally you need to, have Redis running and you need to create a database in postgresql. For this, you can execute the SQL queries in `database.sql`. After creating the database, you need to add your information in `server.js`.

For Heroku, we are going to use `process.env.DATABASE_URL`.

```
const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString:
      process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/databaseName',
    ssl: process.env.DATABASE_URL
      ? {
          rejectUnauthorized: false,
        }
      : false,
  },
});
```

Make a `.env` file from `.env.sample` and add complete the keys.

## Deploy

The app lives in Heroku. Pushes to `main` will trigger a deploy.

## TODO

- Deploy sessions branch and make it function in Heroku with Redis.
- Implement Sign Out.
