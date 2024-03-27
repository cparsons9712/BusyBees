<h1 align="center">

  Busy Bee's API
</h1>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center"> Guide to the API side of Busy Bees and running a local version of the PostgreSQL database</p>
    <p align="center">

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

<hr/>
<hr/>

## Routes
### Users
<hr/>

####  Return All Users
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
    },
]
```
####  Find user by email
##### Req
- method: 'GET'
- endpoint: '/api/users/:email'
##### RES
```
{
  "id": INT,
  "name": STRING,
  "email": STRING,
},
```
<hr/>

####  Create new User

> [!IMPORTANT]
> This endpoint does not start a session, it only creates a new instance in the table
##### Req
- method: 'POST'
- endpoint: '/api/users'
- Constraints:
  - Name:
    - Required
  - Email:
    - Required
    - Must be valid email
    - Must be unique
  - Password:
    - One uppercase letter
    - One lower case letter
    - one number
    - one symbol
    - at least 5 characters long
    - required
- Body:
```
{
  "name": STRING,
  "email": STRING,
  "password": STRING
},
```


##### RES
```
{
  "id": INT,
  "name": STRING,
  "email": STRING,
},
```
<hr/>

### Authentication
<hr/>

####  Sign up

##### Req
- method: 'POST'
- endpoint: '/api/auth/signup'
- Constraints:
  - Name:
    - Required
  - Email:
    - Required
    - Must be valid email
    - Must be unique
  - Password:
    - One uppercase letter
    - One lower case letter
    - one number
    - one symbol
    - at least 5 characters long
    - required
- Body:
```
{
  "name": STRING,
  "email": STRING,
  "password": STRING
},
```


##### RES
```
{
  "id": INT,
  "name": STRING,
  "email": STRING,
},
```
<hr/>

####  Login
##### Req
- method: 'POST'
- endpoint: '/api/auth/login'
- Constraints:
  - Email:
    - Required
  - Password:
    - Required
- Body:
```
{
  "email": STRING,
  "password": STRING
},
```

##### RES
```
{
  msg: 'Login Successful
},
```
<hr/>

####  Check current auth status
##### Req
- method: 'GET'
- endpoint: '/api/auth/status'


##### RES
```
{
  user: {
    id: INT,
    email: STRING,
    name: STRING
  }
},
```
<hr/>

####  LogOut

##### Req
- method: 'GET'
- endpoint: '/api/auth/logout'


##### RES
```
{
  msg: 'The user has been logged out'
},
```
<hr/>
<hr/>

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
$ npm run migration:generate --name=descripted_name_here

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


## Create a new feature

### Step 1: Create the Module
Modules in NestJS are used to organize related components such as controllers, services, and entities. You can create a new module using the NestJS CLI. Replace name with your module's name:

```
nest g module name
```
This command generates a module file name.module.ts in a name directory under your project's src folder.

### Step 2: Create the Entity
Entities in TypeORM are used to represent tables in your database. Each entity corresponds to a table, and instances of entities represent rows in that table.

Create an entity for your module. This example will create a simple User entity:

```
nest g class name/entities/user --no-spec
```

Open the created user.entity.ts file and define your entity. Here's a basic example:

```
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
}

```

### Step 3: Create the Service
Services contain your business logic and interact with the database through TypeORM.

Create a service within your module:

```
nest g service name --no-spec
```
This command generates a service file name.service.ts in your module directory. Open the service file and start adding your business logic. For example, to create a method for adding a new user:

```
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class NameService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(name: string, email: string): Promise<User> {
    const newUser = this.usersRepository.create({ name, email });
    return this.usersRepository.save(newUser);
  }
}
```
### Step 4: Create the Controller
Controllers handle incoming HTTP requests and delegate them to the services.

Generate a controller for your module:

```
nest g controller name --no-spec
```
This creates a controller file name.controller.ts in your module directory. Open it to define routes. Here's an example that includes a route for adding a new user:

```
import { Controller, Post, Body } from '@nestjs/common';
import { NameService } from './name.service';
import { User } from './entities/user.entity';

@Controller('name')
export class NameController {
  constructor(private readonly nameService: NameService) {}

  @Post()
  create(@Body() userData: { name: string; email: string }): Promise<User> {
    return this.nameService.createUser(userData.name, userData.email);
  }
}
```
### Step 5: Update the Module
Finally, update your module file to include the controller and service, and to integrate TypeORM for your entity. Open name.module.ts and modify it like this:

```
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NameService } from './name.service';
import { NameController } from './name.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [NameController],
  providers: [NameService],
})
export class NameModule {}
```

