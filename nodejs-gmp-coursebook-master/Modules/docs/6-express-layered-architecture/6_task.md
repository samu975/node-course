---
sidebar_position: 5
custom_edit_url: null
---

# Practical task

We are going to create an Express application for online shop which sells different types of products (like e.g Amazon). We are going to implement functionality for managing carts, creating orders and products.

**The application has 4 primary entities:**
- `User` - can add some products to the cart and then order them ([example](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/6-express-layered-architecture/schemas/user.entity.ts)).
- `Product` - represents product information that user can order ([example](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/6-express-layered-architecture/schemas/product.entity.ts)).
- `Cart` - contains a list of products and their amount that user wants to order ([example](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/6-express-layered-architecture/schemas/cart.entity.ts)).
- `Order` - contains list of products from cart that user has ordered ([example](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/6-express-layered-architecture/schemas/order.entity.ts)).

**Relations between entities:**
- Each `User` can have only one non-deleted `Cart` at a time. Each `Cart` is attached to a specific `User`.
- One `User` can have multiple `Order`s. Each `Order` is attached to a specific `User`.
- `Cart` contains a list of products that user wants to order **with the amount** of those products specified.

### Acceptance criteria:

**Note:** TypeScript should be used.

1. API is implemented based on [swagger.yaml](https://git.epam.com/ld-global-coordinators/js-programs/nodejs-gmp-coursebook/-/blob/master/public-for-mentees/6-express-layered-architecture/swagger.yaml). Proper [HTTP status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) are returned in responses (not only 200 or 500).
2. Application is implemented following Three Layered Architecture. Layers are separated by file names. For example `xxx.repository.ts` contains functions to retrieve data (data access layer), `xxx.service.ts` contains services that implement business logic, `xxx.controller.ts` contains functions that manage status codes/responses returned (presentation layer).
3. Data is stored either in memory or on file system.
4. [joi](https://www.npmjs.com/package/joi) is used to validate data in `PUT` `/api/profile/cart`.
5. Simple authentication middleware is added to check if user with such id exists. User id is passed in `x-user-id` header.
6. Order entity has **copy of products**. _If you have only product id in order, it may lead to inconsistency. For example, if user creates an order and after that price is changed, the order price shouldn't be changed_.

**Additional (optional) tasks:**
1. For `DELETE` `/api/profile/cart` soft-delete approach is be used. _Make sure that client of your API will not know that soft-delete approach is used_.

### Evaluation criteria
- `60 - 69` - Acceptance criteria 1-3 are **partially** implemented.
- `70 - 79` - Acceptance criteria 1-3 are implemented.
- `80 - 89` - Acceptance criteria 1-6 are implemented.
- `90 - 100` - Acceptance criteria 1-6 are implemented and Additional task is done


