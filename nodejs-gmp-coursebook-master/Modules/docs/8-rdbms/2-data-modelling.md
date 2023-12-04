# Data modelling

## Normalisation

Before you start creation of your database you need to understand what tables and what relations there will be.
Usually you can start from some very simple excel-like form of real data and apply normalisation techniques to build your model.
Normalisation is a database design technique that reduces data redundancy and eliminates undesirable characteristics like
Insertion, Update and Deletion Anomalies. Normalisation rules divides larger tables into smaller tables and links them using relationships.
The purpose of Normalisation in SQL is to eliminate redundant (repetitive) data and ensure data is stored logically.
There are 6 normal forms, however, in most practical applications, normalisation achieves its best in 3rd Normal Form.


Database Normalization can be easily understood with the help of a case study.
Assume, we need to store information about EPAM employees. At first lets write data in table without any normalization in database,
all information is stored in one table as shown below, and `project` column even has some nested data.

![zero normal form](/img/rdb/0-NF.PNG)

Notice, that project data is duplicated, and it will be hard to query it. Of course databases has json column and
it's technically possible to create such structure, but current model has update, insert and delete anomalies.

**Update anomaly** happens because information is duplicated in several rows. Everyone who works on the same project or office will
have the same information, and if we needed to update a project code, we would have to scan all rows and update the data.
If your database has 10 rows it`s not a problem, but what if it has millions of rows?

![update anomaly](/img/rdb/update-anomaly.PNG)

**Deletion Anomaly** happens when removing a row causes removal of more than one set of facts.  
For instance, if John Black deleted, and he was the only one person on a project,
then deleting that row would cause us to lose information about the project.

![deletion anomaly](/img/rdb/deletion-anomaly.PNG)

**Insert Anomaly** present because we cannot insert record until we know information for the entire row.
In our example we cannot record a new project or office until we have some developer information.
Why?  Because in order to create the record, we need provide all other employee data.

![insert anomaly](/img/rdb/insert-anomaly.PNG)


### 1 Normal form
To satisfy First normal form, each column of a table must have a single value.
Columns which contain sets of values or nested records are not allowed, each record needs to be unique.
Project column violates this rules, because it contains a nested record, also our rows may not be a unique, because several persons
can have the same name. A common technique is to move nested data into separate table, and link two tables using primary keys.
Also, we have added ID field to our Employees table, because names are not unique.

![1-NF](/img/rdb/1-NF.PNG)

### 2 Normal form
If a table has a single column primary key, it automatically satisfies 2NF, but if a table has a multi-column or composite
key then it may not satisfy 2NF. Our models have a single columns primary key, so let`s modify our example a little.
It's possible that some employees may work on more than one project at a time and can have
not billable positions, so following 1NF lets create separate table, because as we already know we need to avoid nested values.

![2-NF](/img/rdb/2-NF.PNG)

To identify each record we can create a composite key using employeeID and projectID column. Combinations of both columns
will always give a unique result so knowing projectId and employeeId we will always get one specific record. Now we need to check
that all other columns depends on full composite key, not on some part of it. `JoinDate` and `Billable` both depends on particular
employee and project, because different developers even on the same project may have different billable type. But `InternalProject`
depends only on `ProjectId`, it has nothing to do with `EmployeeId`, so this column is not dependent on full composite key.
What we should do is remove this column from table, and move it to another place, `Project` table is a perfect destination.
This will remove update anomaly from our table and if project type is changed we will update it in only 1 place and not throughout whole
`employee_project` table. After changes our model in 2NF will look like this.

![2-NF-final](/img/rdb/2-NF-final.PNG)


### 3 Normal form

The third normal form states that you should eliminate fields in a table that do not depend on the key.

- A Table is already in 2 NF
- Non-Primary key columns shouldn’t depend on the other non-Primary key columns
- There is no transitive functional dependency

In a simple words, values in a record that are not part of that record's key do not belong in the table. In general, anytime the contents
of a group of fields may apply to more than a single record in the table, consider placing those fields in a separate table.
Let's check our model, we have `Office Address` and `Office City` and here we have functional dependency.

![functional-dep](/img/rdb/functional-dep.PNG)

Office city rather depends on office address than on employeeId, and also you can check yourself that information of address and city
will be duplicated lots of time, and thats and update anomaly. So to make our model satisfy 3NF we need to move office information
from Employees table.

![3-NF](/img/rdb/3-NF.PNG)

Now there are no updates anomalies, no insert anomalies and no deletion anomalies.

:::caution

Adhering to the third normal form, while theoretically desirable, is not always practical. If you have a Customers table
and you want to eliminate all possible duplications, you must create separate tables for cities, ZIP codes,
customer classes, and any other factor that may be duplicated in multiple records. In theory, normalization is worth pursing.
However, many small tables may degrade performance or exceed open file and memory capacities.

:::

## Relationships
Now that you understand the modelling process and when you have your data held in clearly defined, compact tables,
you can connect or relate the data held in different tables. There are three types of relationships between the data you are
likely to encounter: one-to-one, one-to-many, and many-to-many. To be able to identify these relationships, you need to examine
the data and have an understanding of what business rules apply to the data and tables.

### One-to-one
A one-to-one (1:1) relationship means that each record in Table A relates to one, and only one, record in Table B,
and each record in Table B relates to one, and only one, record in Table A.
Look at the following example of tables from a company's Employees database:

![one-to-one](/img/rdb/one-to-one.PNG)

Let’s say you’re organizing employee information, and you also want to keep track of each employee’s computer.
Since each employee only gets one computer and those computers are not shared between employees, you could add fields to your Employee table
that hold information like the OS, year, RAM of each computer. However, that can get messy from a semantic standpoint —
does computer information really belong in a table about employees? That’s for you to decide,
but another option is to create a Computers table with a one-to-one relationship to the Employee table.
Relationship maintained by foreign key (FK) and `laptopId` points to one specific laptop. If we make a unique index from `laptopId`
it will become impossible to assign one computer to several employees.

### One-to-many
One-to-many relationships are the most common type of relationships between tables in a database.
In a one-to-many (sometimes called many-to-one) relationship, a record in one table corresponds to zero, one, or many records
in another table. Relationship is also maintained by FK column in one of the tables.
Let's take our previous example and say that now every person may have several laptops. All that we need to do is to
move FK column to `Laptops` table.

![one-to-many](/img/rdb/one-to-many.PNG)

Now, every employee can have zero, one or several laptops, but laptop can be own only by one employee.


### Many-to-many

A many-to-many relationship indicates that multiple records in a table are linked to multiple records in another table.
Those records may only be associated with a single record (or none at all) but the key is that they can and often are linked
to more than one. Many-to-many relation is implemented by creating a third table, known as a join table,
and create one-to-many relationships between it and your two starting tables.
Imagine that you need to store information about employees and theirs projects. There are lots of employees and projects,
one employee can work on several projects and one project usually has some team of developers. We have already had example
of many-to-many relationship for such business rules, check 2NF once more.

![many-to-many](/img/rdb/2-NF-final.PNG)

Here you can see join table and common technique is to create composite primary key using primary keys from main tables.
So we took `employeeId` and `projectId` for composite key,combination of these will always point us at one particular row.


## Indexes and keys

A _KEY_ in SQL is a value used to identify records in a table uniquely. An SQL KEY is a single column or combination of
multiple columns used to uniquely identify rows or tuples in the table. SQL Key is used to identify duplicate information,
and it also helps establish a relationship between multiple tables in the database.

:::note

Columns in a table that are NOT used to identify a record uniquely are called non-key columns.

:::

### What is a Primary Key (or PK)?

A primary is a single column value used to identify a database record uniquely.

It has following attributes:

- A primary key cannot be NULL
- A primary key value must be unique
- The primary key values should rarely be changed
- The primary key must be given a value when a new record is inserted.

### What is Composite Key?

A composite key is a primary key composed of multiple columns used to identify a record uniquely.

![composite-key](/img/rdb/composite-key.PNG)

In a given example we have two offices in the same city Kharkiv, but they are situated on a different streets. We cannot
also identify office only be street, because there are lots of streets with same name throughout country, so composite key
helps us uniquely identify one particular office.

### What is Foreign Key?

We have already used Foreign Keys (FK) during normalization process to build relations.

![foreign-key](/img/rdb/foreign-key.PNG)

Foreign Key references the primary key of another Table! It helps connect your Tables.

- A foreign key can have a different name from its primary key
- It ensures rows in one table have corresponding rows in another
- Unlike the Primary key, they do not have to be unique. Most often they aren’t
- Foreign keys can be null even though primary keys can not

![foreign-key2](/img/rdb/foreign-key2.PNG)

Why do you need a foreign key? Suppose, a novice inserts a record in `Hardware` such as

![foreign-key-integrity](/img/rdb/fk-integrity.PNG)

You will only be able to insert values into your foreign key that exist in the unique key in the parent table.
This helps in referential integrity.

### Indexes

Indexing is the way to get an unordered table into an order that will maximize the query’s efficiency while searching.
When there is no index, and you try to search something in database its engine has to scan through every row to find
all matching records. While nowadays hardware can be really performant still such operations are time-consuming,
especially if you have millions and millions of rows. Looking through every single row is not very efficient.

For example, the table below represents hardware list, that is completely unordered.
The database would have to search through all 10 rows in the order they appear in the table, from top to bottom, one at a time.
So to search for all of the potential instances of the `RAM` equals to 64, the database must look through the entire
table for all appearances of 64 in the `RAM` column.

![search-example](/img/rdb/searching-example.PNG)

What indexing does is sets up the column in a sorted order to assist in optimizing query performance.
The index causes the database to create a data structure,and this structure type is very likely a B-Tree.
While the advantages of the B-Tree are numerous, the main advantage for our purposes is that it is sortable.

![btree](/img/rdb/btree.PNG)

As you see B-Tree greatly reduces the number of comparisons. What it does under the hood is also stores pointers which
are simply reference information for the location of the additional information in memory.
Basically the index holds the column value and that particular row’s home address on the memory disk.
With that index, the query can search for only the rows in the column that have 15 value and then using the pointers
can go into the table to find the specific rows where that pointer lives.

:::caution

Keep in mind that indexes are separate datastructures, and they need additional disk and memory space. When new record is inserted
or indexed column value is updated B-Tree should be updated too. So you cannot simply throw index on every column in your
50-column table. Technically its possible of course, but performance will degrade over time as the numbers of rows in table increases.

Use indexes on the most "popular" columns, that are used in queries frequently.
:::