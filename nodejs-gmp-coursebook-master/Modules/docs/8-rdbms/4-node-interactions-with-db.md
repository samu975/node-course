# Node.js and database interactions

## Local installation
Before we start we need some local instance of PostgreSQL. The easiest way is to run a Docker container with PostgreSQL image.

**Note:** At this point we will not dive deep into the way how Docker works. As it is mentioned above - that's the quickest and the easiest way to run a database. Just follow the instructions below. You will learn more about Docker in [Deployment and automation tools module](../10-deploy-and-tools/7_docker_and_tools.md).

If you don't have Docker installed on your machine, go to [Docker Desktop](https://www.docker.com/products/docker-desktop/) and install it for your OS. Next, create a file in your project named `docker-compose.yml` and place the following content into it:

```yml
version: '3'
services:
  postgres-db:
    image: "postgres:12"
    container_name: "node-gmp-db"
    environment:
      - POSTGRES_USER=node_gmp
      - POSTGRES_PASSWORD=password123
      - POSTGRES_DB=node_gmp
    restart: always
    ports:
      - '5432:5432'
```

After that open terminal in this folder and run `docker-compose up -d` command. You can connect to this instance using any DB client, i.e. [DBeaver](https://dbeaver.io/) or [pgAdmin](https://www.pgadmin.org/).
Host is `localhost`, DB name and user are `node_gmp`, password is `password123`.

![connection_example](/img/rdb/docker-connection.PNG)

## Node postgres module
node-postgres is a collection of node.js modules for interfacing with PostgreSQL database. It has support for callbacks,
promises, async/await, connection pooling, prepared statements, cursors, streaming results, C/C++ bindings,
rich type parsing, and more.
It's a library for low level interactions, so you can have a full control over your database and queries, however it also requires
more effort to control everything. To use it  install `pg` npm package
```bash
npm install pg
```
After that you can import module and create Client instance for interaction with DB;

```js
import pg from 'pg';

const client = new pg.Client({
    host: 'localhost',
    port: 5432,
    user: 'node_gmp',
    password: 'password123',
    database: 'node_gmp'
})

await client.connect();
```
Here we used configuration object which was passed to `Client` constructor. We specified DB host, port, user and password
for our instance of PostgreSQL which is running inside docker container.

Now we can use ` query ` method to execute any sql operation. Let's first create two tables from previous example:

```js
await client.query(`
    CREATE TABLE IF NOT EXISTS Employee ( 
        id serial PRIMARY KEY,
        name character varying NOT NULL,
        joinDate TIMESTAMP WITH TIME ZONE NOT NULL);`);

await client.query(`
    CREATE TABLE IF NOT EXISTS Hardware (
        "Serial" character varying PRIMARY KEY,
        os character varying NOT NULL,
        year integer NOT NULL,
        ram integer NOT NULL,
        employeeId integer,
        CONSTRAINT fk_employee FOREIGN KEY(employeeId) REFERENCES Employee(id)
);`)
```

Query method supports not only raw text sql but also parameterized input. If you are passing parameters to your queries
you will want to avoid string concatenating parameters into the query text directly. This can (and often does)
lead to sql injection vulnerabilities. node-postgres supports parameterized queries, passing your query text unaltered
as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with
parameter substitution code within the server itself.   
Let's insert some records into our tables.

```js
await client.query(`
    INSERT INTO Employee (name, joinDate) 
    VALUES 
    ('John Wick', '2021-01-14'),
    ('Alex Green', '2019-04-14') 
`);

//we pass only Serial, os,year,ram column values, employeeId is empty
await client.query(`
    INSERT INTO Hardware 
    VALUES 
    ('serialNum1', 'MAC',2019,18),
    ('serialNum2', 'Windows', 2019, 36)`);
```

We created 2 records in `Employee` table and 2 records in `Hardware` table. But they are not linked yet, laptops are not assigned
to anyone, because we did not know id of new records beforehand. So now lets try to assign machines to employees.
```js
const employee = await client.query(
    `SELECT id from Employee where name = $1`,
    ['John Wick']
);

console.log(employee.rows); // [ { id: 1 } ]

await client.query(
        `UPDATE Hardware SET employeeId = $1 where "Serial" = $2`,
        [employee.rows[0].id, 'serialNum1']
);
```
First we execute request to get employee id, we use parameter as the best practice. An object is returned and data is located
in `rows` property. Only `id` property is present because we selected only this column in query. Then we simply execute
update statement and set employee id with this value.
Now we can select employee and his laptop in one query if we need
```js
const result = await client.query(
    `SELECT * from Employee JOIN Hardware ON id = employeeId`,
);

console.log(result.rows)
/*
[                                      
  {                                    
    id: 1,                             
    name: 'John Wick',                 
    joindate: 2021-01-14T00:00:00.000Z,
    Serial: 'serialNum1',              
    os: 'MAC',                         
    year: 2019,                        
    ram: 18,                           
    employeeid: 1                      
  }                                    
]    
 */
```

## ORM

In previous examples we were using SQL to manipulate data in database. But such approach has its own disadvantages.
First of all you need to manually type lots of queries, and they may be really long. Also, you are using syntax which is
specific to one particular RDBMS, so if you had had to switch to another it would have become a problem. Another problem is when you
need to build query programmatically, i.e. when you need to apply some filters from user input. You would need to start
concatenating string with sql parts, then apply arguments in right order, all this not only looks bad in code but also a place
for potential bugs or SQL injections. Another point is that response from queries often is not structured, it`s a plain array/object
(look in previous JOIN call), while it would be nice to have nested objects with theirs relation.

ORM solves most of these problems.
Object-relational mapping lets people interact with databases using their programming languages  rather than
forcing them to use SQL. Developers can use tools called object-relational mappers. They show the data in a structured way
that helps users understand the content and layout of a database without using SQL. One of the major benefits is that it
saves time compared to entering SQL queries.

An object-relational mapper works as a translator that converts code from one form to another. The tool creates objects
representing a virtual map of the database. The user can then interact with the objects rather than directly engaging with code.
On the example below you can see how MikroORM is used to query two tables.

```ts
import { Entity, LoadStrategy, OneToMany, ManyToOne } from '@mikro-orm/core';

@Entity()
export class Author {
 @OneToMany(() => Book, b => b.author)
 books = new Collection<Book>(this);
}

@Entity()
export class Book {
 @ManyToOne()
 author: Author;
}

const authorRepository = orm.em.getRepository(Author);
const jon1 = await authorRepository.findOne(1); // Select * from Author where id = 1 limit 1
const jon2 = await authorRepository.findOne({ name: 'Jon Snow' }); //Select * from Author where name='Jon Snow' limit 1
const jon3WithBook = await authorRepository.find({ name: 'Jon Snow' }, { populate: ['books'] }); 
// Select * from Author where name='Jon Snow'
// Select * from Book where authorId in (ids from previous call)
// each author  will have book property in result
```

Using typescript we have all types safety features, and we can define all our models using decorators. We need to define them one time,
and then we are able to execute queries from our code and even create database from them.

:::caution

Everything has its own price. You need to understand that ORM is a layer between your code and Database and in the end
it still uses SQL to execute queries. So technically it's may affect application performance. Also, it can generate not
optimized SQL, or trigger some unnecessary sql requests. And when you need to write huge and complex SQL request you
may face that it's simply impossible to use ORM for that, and you will be forced to use raw SQL query.

:::
