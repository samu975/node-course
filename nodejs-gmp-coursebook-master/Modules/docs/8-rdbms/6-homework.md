---
sidebar_position: 99
custom_edit_url: null
---
# Practical task

In this task you will need to modify the application you created in Express and Layered Architecture module by moving data storage to Relational database.

**The application has 4 primary entities:**
- `User` - can add some products to the cart and then order them ([example](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/6-express-layered-architecture/schemas/user.entity.ts)).
- `Product` - represents product information that user can order ([example](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/6-express-layered-architecture/schemas/product.entity.ts)).
- `Cart` - contains a list of products and their amount that user wants to order ([example](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/6-express-layered-architecture/schemas/cart.entity.ts)).
- `Order` - contains list of products from cart that user has ordered ([example](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/6-express-layered-architecture/schemas/order.entity.ts)).

**Relations between entities:**
- Each `User` can have only one **non-deleted** `Cart` at a time. Each `Cart` is attached to a specific `User`.
- One `User` can have multiple `Order`s. Each `Order` is attached to a specific `User`.
- `Cart` contains a list of products that user wants to order **with the amount** of those products specified.

### Acceptance criteria

**Note:** TypeScript should be used.

1. Data is stored in PostgreSQL database. [Docker image](https://hub.docker.com/_/postgres) is used for local development (check [Node.js and database interactions section](./4-node-interactions-with-db.md) for an example of docker-compose file). 
2. ORM is used to query data (e.g [TypeORM](https://www.npmjs.com/package/typeorm), [Sequelize](https://www.npmjs.com/package/sequelize), [Mikro-ORM](https://www.npmjs.com/package/mikro-orm)).
3. Migrations are used to create and delete tables ([TypeORM](https://orkhan.gitbook.io/typeorm/docs/migrations), [Sequelize](https://sequelize.org/docs/v6/other-topics/migrations/), [Mikro-ORM](https://mikro-orm.io/docs/migrations)).

**Additional (optional) tasks:**
1. Seeds are used to populate database with test data, e.g products, orders ([TypeORM](https://dev.to/franciscomendes10866/how-to-seed-database-using-typeorm-seeding-4kd5), [Sequelize](https://sequelize.org/docs/v6/other-topics/migrations/#creating-the-first-seed), [Mikro-ORM](https://mikro-orm.io/docs/seeding))
2. If you are using Mikro-ORM, [type-safe relations](https://mikro-orm.io/docs/type-safe-relations) and collections are used.

### Evaluation criteria
- `60 - 69` - Acceptance criteria 1-2 are **partially** implemented.
- `70 - 79` - Acceptance criteria 1-2 are **partially** implemented without any issues.
- `80 - 89` - Acceptance criteria 1-3 are implemented.
- `90 - 100` - Acceptance criteria 1-3 are implemented and Additional tasks are done.