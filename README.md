# image-moderation-api (in progress...)

`Express` server with endpoints ? that connects to a `postgresql` database.
It uses `bcrypt` to store the passwords and `knex` to communicate with the database.

## Database

[insert diagram]

## Dependencies

- Node ?
- Postgresql ?

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
