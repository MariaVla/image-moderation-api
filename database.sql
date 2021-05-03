CREATEDB moderationApp;

CREATE TABLE users (
  id serial PRIMARY KEY, 
  name VARCHAR(100), 
  email text UNIQUE NOT NULL, 
  entries BIGINT DEFAULT 0, 
  joined TIMESTAMP NOT NULL
);

CREATE TABLE login (
  id serial PRIMARY KEY, 
  hash VARCHAR(100) NOT NULL, 
  email text UNIQUE NOT NULL
);

ALTER TABLE users
ADD age INT;

ALTER TABLE users
ADD pet VARCHAR(25);