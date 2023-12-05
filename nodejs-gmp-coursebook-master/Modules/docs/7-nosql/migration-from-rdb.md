---
sidebar_position: 11
title: NoSQL. Migration from RDB
sidebar_label: Migration from RDB
pagination_label: Databases. NoSQL - Migration from RDB
---

# Migration from RDB

Migration from RDB to NoSQL is a quite extensive topic.
It must be done carefully, through planning and strategy development.
People who made that decision should have effective knowledge and a deep understanding of why it should be done.
They need to define specific problems and suggest solutions.
It is also essential to be aware of the migration tools and the general steps to be taken.

Switching between database types would require changes only in the application's "data access" layer. 
So, you have to learn the differences in data access. 
Whether you need to use ORM and ODM and know how they differ to understand how much code will need to be changed.
If the application architecture is properly designed, there will be no trouble with it.

## Steps

Typically, steps may be defined as follows:
- Ananlyze current SQL schema and data model
- Compare and choose NoSQL database
- Choose migration method
- Modify data access layer and schema
- Do production database ***Backup*** 
- Start migration procedure
- Test new system. Can include data access times, query performance and overall system reliability
- Monitor and optimize performance
- Plan for ongoing maintenance

## Migration methods

The choice of method depends on the project, its stage and environment.
- Write own migration script to transform your source data
- Use third-party tools to migrate. Need to find and compare appropriate tools
- Use RDB and NoSQL DB parallelly and incrementally transferring data