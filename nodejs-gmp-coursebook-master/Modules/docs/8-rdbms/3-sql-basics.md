# SQL basics
There is special language to manipulate data in RDB - SQL. Structured Query Language(SQL) is the database language by the
use of which we can perform certain operations on the existing database, and also we can use this language to create a database.
SQL uses certain commands like Create, Drop, Insert, etc. to carry out the required tasks.

These SQL commands are mainly categorized into four categories as:

- DDL – Data Definition Language
- DQl – Data Query Language
- DML – Data Manipulation Language
- DCL – Data Control Language

## DDL (Data Definition Language)

DDL or Data Definition Language actually consists of the SQL commands that can be used to define the database schema.
It simply deals with descriptions of the database schema and is used to create and modify the structure of database
objects in the database. DDL is a set of SQL commands used to create, modify, and delete database structures but not data.

### Create
This command is used to create the database or its objects (like table, index, function, views, store procedure, and triggers).
:::note

The syntax for creating entities may vary among different databases. Therefore: Check the syntax for your database.
We will use PostgreSQL syntax in next examples;

:::
To create database:
```sql
CREATE DATABASE test;
```

To create index on `Name` column of Employee table ([docs](https://www.postgresql.org/docs/current/sql-createindex.html)):
```sql
CREATE INDEX idx_name
ON Employee (Name);
```

To create table:
```sql
CREATE TABLE [IF NOT EXISTS] table_name (
   column1 datatype(length) column_contraint,
   column2 datatype(length) column_contraint,
   column3 datatype(length) column_contraint,
   table_constraints
);
```

Let's create some tables from our previous examples. To create `Employee` and `Hardware` tables with relation
we need to execute next commands:

```sql
CREATE TABLE Employee (
    id serial PRIMARY KEY,
    name character varying NOT NULL,
    joinDate TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE Harware (
    "Serial" character varying PRIMARY KEY,
    os character varying NOT NULL,
    year integer NOT NULL,
    ram integer NOT NULL,
    employeeId integer,
    CONSTRAINT fk_employee FOREIGN KEY(employeeId) REFERENCES Employee(id)
);
```

Note how we marked foreign and primary keys in each table and applied `NOT NULL` constraints on columns. It means
that if we won't provide some values database will throw an error, another good way to maintain data integrity. Also, we
have to use quotes with `Serial` column name, because serial is a datatype, so it's a reserved word.

:::tip
Useful links:

Datatype can be found [here](https://www.postgresql.org/docs/current/datatype.html).  
Constraints can be found [here](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-EXCLUSION)  
Article about foreign key constraints is highly recommended for reading: [link](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-foreign-key/)

:::

### Drop

DROP is a DDL command used to delete/remove the database objects from the SQL database. We can easily remove the entire
table, view, or index from the database using this DDL command.


To drop database:
```sql
DROP DATABASE database_name;
```

Suppose, you want to delete the Employee table from the SQL database. To do this, you have to write the following DDL command:
```sql
DROP TABLE Employee;
```

To delete index:
```sql
DROP INDEX index_name;  
```

### Alter
ALTER is a DDL command which changes or modifies the existing structure of the database, and it also changes
the schema of database objects. We can also add and drop constraints of the table using the ALTER command.

Suppose, you want to add the 'Surname' column in the existing Employee table. To do this, you have to write the following DDL command:
```sql
ALTER TABLE Employee ADD Surname varchar;  
```

If you want to remove some column from the existing Employee table, you can use following DDL command:
```sql
ALTER TABLE Employee DROP Surname;  
```


## DML (Data Manipulation Language)
DML is an abbreviation of **Data Manipulation Language**.
The DML commands in Structured Query Language change the data present in the SQL database.
We can easily access, store, modify, update and delete the existing records from the database using DML commands.

Following are the four main DML commands in SQL:

- SELECT Command
- INSERT Command
- UPDATE Command
- DELETE Command

### Insert
INSERT is a data manipulation command in SQL, which allows users to insert data in database tables and has next syntax:
```sql
INSERT INTO TABLE_NAME ( column_Name1 , column_Name2 , column_Name3 , .... column_NameN )  VALUES (value_1, value_2, value_3, .... value_N ) ;
```

Let`s say we need to insert record to Hardware table from our previous examples. For this you need to execute such command:
```sql
INSERT INTO Hardware ("Serial", os, ram) VALUES ('1dfg124sd2a', 'MAC', 32);  
```

You can insert multiple records in one query:
```sql
INSERT INTO Hardware ("Serial", os, ram) VALUES 
    ('1dfg124sd2a', 'MAC', 32),
    ('aa45g5dd71a', 'Windows', 64),
    ('gh26s2h61sd', 'Windows', 16);  
```

### Select
SELECT is one of the most frequently used commands in SQL. The SELECT command shows the
records of the specified table. It also shows the particular record of a particular column by using the WHERE clause.
```sql
SELECT column_Name_1, column_Name_2, ….., column_Name_N FROM Name_of_table;  
```
Here, column_Name_1, column_Name_2, ….., column_Name_N are the names of those columns whose data we want to retrieve from the table.
If we want to retrieve the data from all the columns of the table, we have to use the following SELECT command:

```sql
SELECT * from Table
```
We can apply some filters using `WHERE` keyword. Let's say we want to retrieve all hardware which has 16 or more gigs of RAM.
```sql
SELECT * from Hardware WHERE ram >= 16
```

There are lots of other keywords that can be used in `SELECT`, i.e. `GROUP BY`, `LIMIT`, `OFFSET`,`ORDER BY` but they are
not in scope of this course. If you would like to learn full power of SQL check some other courses and check [docs](https://www.postgresql.org/docs/current/sql-select.html)

### Update
UPDATE is a command in SAL, which allows users to update or modify the existing data in database tables and has next syntax:
```sql
UPDATE Table_name SET [column_name1= value_1, ….., column_nameN = value_N] WHERE CONDITION;  
```
Here, 'UPDATE', 'SET', and 'WHERE' are the SQL keywords, and 'Table_name' is the name of the table whose values you want to update.

If you need to update someone's office in `Employee` table you can execute such query
```sql
UPDATE Employee SET office_id = 2 WHERE id = 2;  
```

You can update multiple columns in one query:
```sql
UPDATE Employee SET office_id = 2, Name = 'Bilbo Beggins' WHERE id = 2;  
```

### Delete
DELETE is a DML command which allows SQL users to remove single or multiple existing records from the database tables.
We use the WHERE clause with the DELETE command to select specific rows from the table. Syntax of DELETE Command:

```sql
DELETE FROM Table_Name WHERE condition;
```

Suppose, you want to delete that hardware from the `Hardware` table which serial number is 'serial123'. To do this, you have to write
the following DML DELETE command:
```sql
Delete from Hardware where "serial" = 'serial123';
```

## How to query relations
In lots of situations you will want to get information from several tables in one request. I.e. we would like to get
information about employee and his hardware, or about all projects of employee. There is `JOIN` operator in SQL that is used
in such situation. A `JOIN` clause is used to combine rows from two or more tables, based on a related column between them.
There are 4 different types of the JOINs in SQL:

- `(INNER) JOIN`: Returns records that have matching values in both tables
- `LEFT JOIN`: Returns all records from the left table, and the matched records from the right table
- `RIGHT JOIN`: Returns all records from the right table, and the matched records from the left table
- `FULL JOIN`: Returns all records when there is a match in either left or right table

![joins](/img/rdb/joins_schema.png)

Let's figure out differences using some example. We have 2 tables with employees data and hardware data, which are 1:m related.

![employee_hardware](/img/rdb/joins-base-tables.PNG)

Let's execute `INNER JOIN` command and see what data will be returned
```sql
SELECT * from Employee INNER JOIN Hardware ON Employee.id = Hardware.employeeId
```
![inner_join](/img/rdb/inner-join.PNG)
As you can see we selected only users who have some hardware (who have record in employeeId column). Employee with ID 4
is not present in result, because he has no matching records is second table. User with id 3 present 2 times, because he has
2 laptops.

But let's say you want to select every employee, even if he doesn't have any laptop yet. For this we can use `LEFT JOIN`:
```sql
SELECT * from Employee LEFT JOIN Hardware ON Employee.id = Hardware.employeeId
```
![left_join](/img/rdb/left-join.PNG)
Now every employee is present in result, and if he does not have any hardware there will be `NULL` values

`RIGHT JOIN` works in the same was as `LEFT JOIN` but select every record from right table, and corresponding from the left, i.e.
```sql
SELECT * from Employee RIGHT JOIN Hardware ON Employee.id = Hardware.employeeId
```
![right_join](/img/rdb/right-join.PNG)

And if you want to select all records from both tables, you can use `FULL JOIN`:
```sql
SELECT * from Employee FULL JOIN Hardware ON Employee.id = Hardware.employeeId
```
![full_join](/img/rdb/full-join.PNG)

## Transactions
As we discussed previously, transaction is a unit of work that is performed against a database. Transactions are units
or sequences of sql commands accomplished in a logical order, whether in a manual fashion by a user or automatically by
some sort of database program.

Practically, you will club many SQL queries into a group, and you will execute all of them together as a part of a transaction.

In PostgreSQL, a transaction is set up by surrounding the SQL commands of the transaction with `BEGIN` and `COMMIT` commands.
Let`s create a transaction for our very first example, when Bob is trying to transfer 100$ to his friend Alice.

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100.00
    WHERE name = 'Bob';
    
UPDATE accounts SET balance = balance + 100.00
    WHERE name = 'Alice';

COMMIT;
```

If, partway through the transaction, we decide we do not want to commit (perhaps we just noticed that Alice's
balance went negative) or something goes wrong in application, we (node driver) can issue the command ROLLBACK
instead of COMMIT, and all our updates so far will be canceled.