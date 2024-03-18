<h1 align="center">

  Busy Bee's API
</h1>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center"> Guide to the API side of Busy Bees and running a local version of the PostgreSQL database</p>
    <p align="center">

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Routes
### Users

####  Return all users
##### Req
- method: 'GET'
- endpoint: '/api/users'
##### RES
```
[
    {
        "id": INT,
        "name": STRING,
        "email": STRING,
        "password": STRING
    },
]
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## PSQL Commands

```bash
# Check id postgres is online
$ sudo service postgresql status

# Get postgres online
$ sudo service postgresql start

# open postgres terminal command tool (psql)
$ sudo -u postgres psql

# See a list of avaliable databases
$ \l

# Create a new database
$ CREATE DATABASE chosenNameHere

# delete a database
$ DROP DATABASE chosenNameHere

# connect to a database
$ \c chosenNameHere

# display all tables in database that you are connected to
$ \dt

# Make a table in connected database
$ CREATE TABLE chosenNameHere(columnName columnDataType, nextColumn ..)

# check all the records in connected database
$ SELECT * FROM tableName

# Delete a table
$ DROP TABLE tableName
```

## Migration Commands
```bash


# Makes files of sql commands from code changes that will alter database when run
$ npm run migration:generate

# Make sure the dist folder is up to date
$ npm run build

# Run commands in new migration files to alter the database
$ npm run migration:run
```

### If you want to reset a table

```bash
- In terminal dedicated to database -

# open command line tool
$ sudo -u postgres psql

# Check names of databases you can move into
$ \l

# move into database for busyBees
$ \c busybees

# check names of existing tables
$ \dt

# delete the table
$ DROP TABLE changedTableName

# Makes file that reflects the changes you made to the table
$ npm run migration:generate --name=fileNameHere

# Run commands to recreate the table with the changes
$ npm run migration:run
```


## Helpful Resources

- [TypeORM Migrations in NestJS & Postgres](https://dev.to/amirfakour/using-typeorm-migration-in-nestjs-with-postgres-database-3c75)
- [Nest.js Docs](https://nestjs.com/)
- [TypeORM docs](https://typeorm.io/)
- [PostgreSQL docs](https://www.postgresql.org/docs/current/)
