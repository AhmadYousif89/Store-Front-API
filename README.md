![CircleCI](https://img.shields.io/circleci/build/github/AhmadYousif89/Tech_Store/main) ![test-passing-success](https://user-images.githubusercontent.com/90717578/159390995-332c826e-259f-4881-a7cb-835651909464.svg) ![npm type definitions](https://img.shields.io/npm/types/typescript) ![GitHub repo size](https://img.shields.io/github/repo-size/AhmadYousif89/Tech_Store) ![GitHub watchers](https://img.shields.io/github/watchers/AhmadYousif89/tech_store?style=social)

# Tech Store API

- This API project built on Nodejs framework for an online store company, It's main goal is to create a RESTful API that will serving as a backend server for the frontend application.

- The database schema and and API route information are in the [REQUIREMENT.md](https://github.com/AhmadYousif89/Tech_Store/blob/main/REQUIREMENTS.md)

### Getting started

---

- To use the API properly please follow these steps :

  #### Step 1: connect to the default postgres database as the server's root user postgres

  ```
  psql -U postgres

  ```

  #### Step 2: In psql run the following to create a user

  ```
  CREATE USER udacity WITH PASSWORD '123';
  ```

  #### Step 3: run the following to create the dev and test database

  ```
  CREATE DATABASE tech_store;
  ```

  ```
  CREATE DATABASE tech_store_test;
  ```

  #### Step 4: Connect to the databases and grant all privileges to the user you just created

  ```
  GRANT ALL PRIVILEGES ON DATABASE tech_store TO udacity;
  ```

  ```
  GRANT ALL PRIVILEGES ON DATABASE tech_store_test TO udacity;
  ```

### Packages

---

#### some of the packages used in this project.

- express

  ```
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

---

- `to start the server on localhost:3000 as default.`

  ```
  npm start
  ```

- `to build and complie the project code.`
  ```
  npm run build
  ```
- `to watch for any changes happens in the server during development phase.`
  ```
  npm run dev
  ```
- `to run prettier and format project code.`
  ```
  npm run prettier
  ```
- `to run es-lint and check for programmatic errors.`
  ```
  npm run lint
  ```
- `to start migration proccess and create our database schema.`
  ```
  npm run m-up
  ```
- `to start migration proccess and drop all tables.`
  ```
  npm run m-down
  ```
- `to start unit testing scenarios.`
  ```
  npm test
  ```
- `to run migration up process in test environment.`
  ```
  npm run test:m-up
  ```
- `to run migration down process in test environment.`
  ```
   npm run test:m-down
  ```

```Test
[![asciicast](https://asciinema.org/a/1Kd29CeKvr4mVFt5s0CLDtV6G.svg)](https://asciinema.org/a/1Kd29CeKvr4mVFt5s0CLDtV6G)
```

---

### ENV

---

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

---

### License

---

- [MIT](https://choosealicense.com/licenses/mit/)
