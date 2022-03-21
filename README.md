# Tech Store API

- This a backend API build in Nodejs for an online store. Its main goal is to create a RESTful API that will be used by the frontend developer on the frontend.

- The database schema and and API route information are in the [REQUIREMENT.md](https://github.com/AhmadYousif89/Tech_Store/blob/main/REQUIREMENTS.md)

### Usage

- To use our API properly please follow these steps :

  1. connect to the default postgres database as the server's root user postgres

  ```
  $ psql -U postgres
  ```

  2. In psql run the following to create a user

  ```
  CREATE USER udacity WITH PASSWORD '123';
  ```

  3. run the following to create the dev and test database

  ```
  CREATE DATABASE tech_store;
  ```

  ```
  CREATE DATABASE tech_store_test;
  ```

  4. Connect to the databases and grant all privileges to our user `udacity`

  ```
  \c tech_store
  ```

  ```
  GRANT ALL PRIVILEGES ON DATABASE tech_store TO udacity;
  ```

  ```
  \c tech_store_test
  ```

  ```
  GRANT ALL PRIVILEGES ON DATABASE tech_store_test TO udacity;
  ```

### Packages

#### some of the packages used in this project.

- express

```python
npm i express
```

```
npm i -D @types/express
```

- typescript

```
npm i -D typescript
```

```
npm i -D ts-node
```

```
npm i -D @types/node
```

- db-migrate

```
npm i -g db-migrate
```

```
npm i db-migrate-pg
```

```
npm i -D @types/pg
```

- cors

```
npm i cors
```

```
npm i -D @types/cors
```

- bcrypt

```
npm -i -D bcrypt
```

```
npm -i -D @types/bcrypt
```

- dotenv

```
npm -i -D dotenv
```

- jsonwebtoken

```
npm i jsonwebtoken
```

```
npm i -D @types/jsonwebtoken
```

- prettier

```
npm i -D prettier
```

- eslint

```
npm i -D eslint
```

- jasmine

```
npm i -D jasmine
```

```
npm i -D jasmine-ts
```

```
npm i -D @types/jasmine
```

```
npm i -D jasmine-spec-reporter
```

- supertest

```
npm i supertest
```

```
npm i -D @types/supertest
```

### Scripts

- npm run start :
  - `this script will start our server on localhost on port 3000 as default and build and complie our code.`
- npm run m-up :
  - `this script will start migration proccess which will create our database schema.`
- npm run m-down :
  - `this script will start migration proccess which will drop all of our table.`
- npm run prettier :
  - `this script will run the prettier dependency.`
- npm run lint :
  - `this script will run the es-lint dependency.`
- npm run test :
  - `this script will start our unit testing scenario.`
- npm run test:m-up :
  - `this script will run migration up command but in test environment.`
- npm run test:m-down :
  - `this script will run migration down command but in test environment.`

##### ENV

- `ENV = dev`
- `PG_DB = tech_store`
- `PG_DB_TEST = tech_store_test`
- `PG_USER = udacity`
- `PG_PASSWORD = 123`
- `PG_HOST = 127.0.0.1`
- `PG_PORT = 5432`
- `SERVER_PORT = 3000`
- `SALT = 10`
- `PEPPER = pass-$1$2$3$-word`
- `SECRET_TOKEN = secret-$1$2$3$-token`

### License

[MIT](https://choosealicense.com/licenses/mit/)
