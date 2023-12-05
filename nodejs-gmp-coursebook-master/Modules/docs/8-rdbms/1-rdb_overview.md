# What is a relational database

A relational database (RDB) is type of database that stores a collection of data items with pre-defined
relationships between them. These items are organized as a set of tables with columns and rows. Tables usually represent
some object that is connected to your business domain, i.e. you might have table `Users` to store all your users.
Each column in a table holds a certain kind of data and a field stores the actual value of an attribute.
There are many data types in RDB: strings, integers, decimals, binary and even json, so you can store any kind of data.

The rows in the table represent a record and contains all values from its columns.
Each row in a table should be marked with some unique identifier called a primary key. Like everyone has its own unique
passport number that helps to identify you, so every row in table has its own unique identifier.
By using primary keys we can build relations between objects, i.e. tax office may store information about you and uses your passport number
(or other unique identifier, depending on your country) to identify and check all your operations.
So basically there is a relation between records in different tables build by using unique identifiers.

You can think about RDB as a set of tables in your Excel document, each table represents a tab,
and you added some unique identifier to each row (primary key or PK). So let's imagine a common e-commerce
application, where users can buy some stuff. When you register, system creates a record in `Users` table, assigns
a unique key to you and stores all your data there, let it be your name and age for simplicity. When someone
makes a purchase, system may create a record and store it in `Purchases` table. To maintain a relation
and to track who actually made purchases, system stores your PK from `Users` table.

![RDB simple example](/img/rdb/rdb-example.PNG)

Thanks to these relationships, unlike in NoSQL where you need to consider the table structure and object compositions in advance because it impacts how you can retrieve data and build relationships, in RDB, data can be accessed in various ways without having to reorganize the database tables themselves.


## What is RDBMS
The software used to store, manage, query, and retrieve data stored in a relational database is called a relational database
management system (RDBMS). The RDBMS provides an interface between users and applications and the database, as well as
administrative functions for managing data storage, access, and performance. A RDBMS incorporates the relational-data model,
basics of which we have described above, normally including a Structured Query Language (SQL) application programming interface.
So just like there are several Web browsers on the market, each with some unique features but still they support JS, HTML and CSS,
the same situation with RDBMS. There are several of them, each has its own features, performance, maintainability costs
and can even have extended SQL syntax, like new operators etc. But they are all built on top of the relational model
and support common SQL syntax.

![most popular rdbms](/img/rdb/rdbms.PNG)

Here is the list of the most popular RDBMS, you might have heard of some of them.
- **MySQL** is a database by Oracle Corporation, first released in 1995. It's one of the most stable open-source databases available today.
  Facebook and Uber use it in their applications. YouTube uses MySQL to store all the metadata for the videos. While it is a good place to start,
  MySQL is not the best if you want advanced data protection features like throttling and masking.
  It is also not the best with semi-structured data like JSON.
- **PostgreSQL** is another open source database. It uses and extends SQL (hence the name), and is broadly extensible to a range of use cases beyond mere transactional data.
  It handles semi-structured data such as JSON and has great support for distributed SQL. The latter is useful when working with millions of transactions on the web.
- **Oracle** - developed in 1979 by the current CTO of Oracle, Larry Ellison, Oracle remains a popular SQL database especially for enterprise-grade RDBMSs.
  It is indeed quite advanced, offers wonderful features for both structured and semi-structured data, supports blockchain tables,
  facilitates lightning-fast transactions. However, it does have a major downside compared to the other two databases discussed so far:
  it is not open source, and it is not pocket-friendly.
- **SQL Server** is a popular Microsoft database offering in the market. SQL Server is a paid database;
  it garners corporate support due to the Microsoft brand name and the compatibility support for other Microsoft applications.

In this program we will stick to PostgresSQL, because it's open source, easy to install, yet powerful database with lots of demand on the market.

## Transactions and ACID
One of the greatest features of relational databases is transactions. A transaction is some set of database operations
that is treated as a "whole". It has to either complete successfully all its operations or not to make any changes at all.
Let`s consider the following example: you want to transfer 20$ to your friend, you open your bank app in your phone and transfer funds.
What happens under the hood? Probably, transfer consists of several operations, at first 20$ are withdrawn from your accounts,
and on the next step are added to your friends account. But what would happen if some error was thrown in application after 1st step?

![transaction example](/img/rdb/money-transfer-transaction.PNG)

Money were withdrawn, but not transferred, you and your friend are unhappy, and probably your bank hired developers who
don't know about transactions. This two operations should be wrapped into database transaction, so if such error was thrown
database would revert all changes, and you would have all your money.

All database transactions in any RDBMS are **ACID** compliant or Atomic, Consistent, Isolated and Durable to ensure data integrity.

**Atomicity** defines that all operations in transaction treated as one "unit", which either succeeds completely or
fails completely: if any of the statements constituting a transaction fails to complete, the entire transaction fails
and the database is left unchanged. In previous example transaction consists of two operations with different bank accounts
and its naturally that bank wants to roll back any changes if something goes wrong.

**Consistency** ensures that a transaction can only bring the database from one valid state to another.
Database can have some constraints in tables, i.e. unique columns, cascades, triggers, foreign keys etc. and
any data written to the database must be valid according to all defined rules.
This prevents database corruption by an illegal transaction.

**Isolation** helps to isolate one transaction from another, because often operations are run simultaneously one transaction
may affect results of another if changes are persisted immediately. In RDBMS changes usually can be seen only after transaction
is finished,so the effects of an incomplete transaction might not even be visible to other transactions.

**Durability** guarantees that once a transaction has been committed, it will remain committed even in the case of a system failure
(e.g., power outage or crash). This usually means that completed transactions are recorded not is some cache
but in non-volatile memory immediately, unlike from eventually consistent NoSql.

## When do I need RDB for my project

SQL is a good choice when working with related, structured data. Relational databases are efficient, flexible and easily accessed by 
any application. A benefit of a relational database is that when one user updates a specific record, every instance of the
database automatically refreshes, and that information is provided in real-time.

SQL and a relational database make it easy to handle a great deal of information, scale based on your needs and allow flexible 
access to data — only needing to update data once instead of changing multiple files, for instance. Thanks to ACID properties
it’s also best for assessing data integrity. Since each piece of information is stored in a single place, there’s no problem with former 
versions confusing the picture. However, SQL databases are not easily scaled horizontally. Unlike from NoSQL, which can
be sharded easily, most SQL databases require you to scale-up vertically (migrate to a larger, more expensive server) 
when you exceed the capacity requirements of your current server, or manually distribute data between several servers 
and process it in your application logic.
