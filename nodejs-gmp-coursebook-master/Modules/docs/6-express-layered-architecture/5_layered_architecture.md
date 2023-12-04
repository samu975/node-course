---
sidebar_position: 5
---

# Layered Architecture

Before we begin our journey into the Software Architecture of Backend applications, can you try to answer several
questions about architecture? Why do we actually need it? What does architecture mean for you? Is it a properly chosen
framework, or something related to separating code into different modules? What will happen if you skip designing an
architecture for the project and will write our code in the way that first comes to your mind?

Let’s imagine that you need to create an endpoint POST /post. It should create a post that has several fields: `message`
, `tags`, `title`, and `attachments`. Also, it’s needed to send notifications to all followers about new posts and
recommend this user if there is a search by tags from his post.

If you create such an endpoint without thinking about any architecture, it might look something like this:

```ts
interface RequestBody {
  message: string;
  title: string;
  attachments: string[];
}

interface ResponseBody {
  error?: string;
  ok: boolean;
}

app.post('/post', async (req: Request<{}, any, RequestBody>, res: Response<ResponseBody>, next: NextFunction) => {
  const {id: userId} = req.user;
  const user = await UserModel.findOne({id: userId});
  
  if (req.body.message.length < 3 || req.body.message.length > 1000) {
    res
      .status(400)
      .send({
        error: 'Message length should be from 3 to 1000 characters',
        ok: false,
      });
  }
  
  if (req.body.title.length < 3 || req.body.title.length > 100) {
    res
      .status(400)
      .send({
        error: 'Title length should be from 3 to 100 characters',
        ok: false,
      });
  }
  
  if (req.body.attachments.length > 10) {
    res
      .status(400)
      .send({
        error: 'Too many attachaments',
        ok: false,
      });
  }
  
  const post = await PostModel.create({...req.body, authorId: userId, createdAt: new Date(), updatedAt: new Date()});
  const userFollowersEntities = await FollowingModel.find({followingId: userId});
  const userFollowersIds = userFollowersEntities.map(({userId}) => userId);
  const userFollowers = await UserModel.find({id: {$in: userFollowersIds}});
  
  const notifications = userFollowers.map(({email, name}) => ({
    to: email,
    text: `Dear ${name}. New post from ${user.name}`
  }));
  const sendNotificationsPromise = notifications.map(axios.post(`${notificationServiceUrl}/send-email`));
  await Promise.all(sendNotificationsPromise);
  
  await ReccomendationModel.create({tags: post.tags, userId});
  res.send({ok: true});
});
```

- req.user - this field is added by some authentication middleware
- object that has the word Model at the end are [Mongoose](https://mongoosejs.com/) model objects. They are used for
  making requests to a database
- [axios](https://github.com/axios/axios) is an HTTP client library. It is used just to make HTTP requests.

Does it look good? I think your answer is No. Most likely your suggestion is to separate that big handler into small
functions and just call them. Let’s do it:

```ts

function validation(req: Request<{}, any, RequestBody>, res: Response<ResponseBpdy>) {
  if (req.body.message.length < 3 || req.body.message.length > 1000) {
    res
      .status(400)
      .send({
        error: 'Message length should be from 3 to 1000 characters',
        ok: false,
      });
    return false;
  }
  
  if (req.body.title.length < 3 || req.body.title.length > 100) {
    res
      .status(400)
      .send({
        error: 'Title length should be from 3 to 100 characters',
        ok: false,
      });
    return false;
  }
  
  if (req.body.attachments.length > 10) {
    res
      .status(400)
      .send({
        error: 'Too many attachaments',
        ok: false,
      });
    return false;
  }
  return true;
}

async function getFollowers(req: Request<{}, any, RequestBody>) {
  const userFollowersEntities = await FollowingModel.find({followingId: req.user.userId});
  const userFollowersIds = userFollowersEntities.map(({userId}) => userId);
  return UserModel.find({id: {$in: userFollowersIds}});
}

async function sendNotifications(req: Request<{}, any, RequestBody>, userFollowers: User[]) {
  const user = await UserModel.findOne({id: req.user.userId});
  
  const notifications = userFollowers.map(({email, name}) => ({
    to: email,
    text: `Dear ${name}. New post from ${user.name}`
  }));
  const sendNotificationsPromise = notifications.map(axios.post(`${notificationServiceUrl}/send-email`));
  await Promise.all(sendNotificationsPromise);
}

app.post('/post', async (req: Request<{}, any, RequestBody>, res: Response<ResponseBody>, next: NextFunction) => {
  const {id: userId} = req.user;
  if (!validation(req, res)) {
    return;
  }
  const post = await PostModel.create({...req.body, authorId: userId, createdAt: new Date(), updatedAt: new Date()});
  
  const userFollowers = await getFollowers(req);
  await sendNotifications(req, userFollowers);
  await ReccomendationModel.create({tags: post.tags, userId});
  res.send({ok: true});
});
```

Much better, don’t you think so? But, can we do better? Imagine that you created a bunch of endpoints following the principle of separating a big controller into smaller ones. After a while the Software Architect on your project comes to you and says: ‘We need to switch from MongoDB to PostgreSQL due to performance issues. Also, our customer hates Express and we need to rewrite our application with Koa/Hapi/Fastify/Nest/whatever else.’. Now, take a look at our code, and find the functions that should be changed to satisfy new requirements from the Software Architect. How many functions will be affected? The answer is - **all of them.** That is the thing, our code became more readable and understandable, but it’s not ready to be changed.    

> If the codebase growth of your application slows down the time for delivering a single feature, then you have a **bad architecture**. The idea of **good architecture** is to be changeable and requirements that are often changed shouldn't affect development speed. 

## Three layered architecture

There are plenty of different architectural approaches. Some of them are perfectly suited for large applications, others
for small ones. The type of our application might also affect the most suitable architecture approach. For example, if
you use a serverless approach or your application is just some job that is being invocated once in a while, then you
might choose different architecture for them. We will not discuss all of them, we will provide a brief overview of the
most popular ones which can be used for most parts of applications.

The most popular approach for module separation in Backend applications is three-layered architecture. The idea of this
approach is to divide your application code into 3 layers: presentation layer, business logic or service layer, and data
access layer.

### Presentation Layer

The highest layer. This layer should contain logic related to a presentation of our application to a client. For
example, this layer can have logic related to the protocol that was chosen for the application. This layer knows what
HTTP request, response, header, body, socket, internet, and so on are.

### Business Logic Layer

Or in other words - Service layer. The middle layer. All business logic related to our application should be in this layer. This layer
knows about our application entities such as user, order, comment, post, and so on. It doesn't care what protocol is
used for transferring data to a client, or whether data will be sent in a body or in a header.

### Data Access Layer

The lowest layer. All code related to storing our data somewhere should be in this layer. This layer knows what database
is used, SQL, joins, aggregation functions, and so on. It doesn’t know anything about the protocol, business logic, or
some services that are used in our application.

There are several rules for these layers:

- Each layer is independent
- One layer shouldn’t know about the internal implementation of other layers
- The higher layer should depend on a lower one (not vice versa)

## Examples

Now, let’s try to rewrite our code by using three-layered architecture. Let’s start with the **Data Access** layer. It’s a
good idea to create a separate module for working with DB.

```ts
function createPost({title, message, attachments, authorId}: Post) {
  return PostModel.create({title, message, attachments, authorId, createdAt: new Date(), updatedAt: new Date()});
}

function createRecommendation(userId: number, tags: string[]) {
  return ReccomendationModel.create({tags: post.tags, userId});
}

function getUserById(userId: number) {
  return UserModel.findOne({id: userId});
}

function getUsersByIds(userIds: number[]) {
  return UserModel.find({id: {$in: userIds}});
}

async function getUserFollowers(userId: number) {
  const userFollowersEntities = await FollowingModel.find({followingId: userId});
  const userFollowersIds = userFollowersEntities.map(({userId}) => userId);
  return getUsersByIds(userFollowersIds);
}
```

This module doesn’t know anything about services that will use it. We removed `req` object from the arguments, and if the
framework will be changed, this code will remain the same. **There is no dependency on higher-level modules.** If it’s
needed to change the database that is being used in the application, we will need to change all these methods, but
the communication interface should remain the same, which means that function names, their arguments, and returning
values shouldn’t be changed. Other layers don’t care about the internal implementation of the Data Access layer and
what database is used, but they do care about how they use it. That’s a simple example and in real applications, all
entities might have their own files (such as user.db.js, post.db.js, recommendation.db.js, etc.) and the logic inside
might be much more complex.

Let’s rewrite our **Service** layer.

```ts
// notification.service.js
async function sendNotifications(userName: string, userFollowers: User[]) {
  const notifications = userFollowers.map(({email, name}) => ({
    to: email,
    text: `Dear ${name}. New post from ${userName}`
  }));
  const sendNotificationsPromise = notifications.map(axios.post(`${notificationServiceUrl}/send-email`));
  await Promise.all(sendNotificationsPromise);
}

// post.service.js
async function createPost(userId: string, {title, message, attachments}: Partial<Post>) {
  const post = await createPost({title, message, attachments, authorId: userId});
  
  const userFollowers = await getUserFollowers(userId);
  const user = await getUserById(userId);
  await sendNotifications(user.name, userFollowers);
  await createRecommendation(userId, post.tags);
}
```

We created two services: notification and post. In these services, we might call **Data Access** layer methods which were
listed before. Here we don’t know either what framework is used or which database stores our data (or even several of
them).

And the last one is the **Presentation** layer:

```ts
// post.validataion.js
function validation(req: Request<{}, any, RequestBody>, res: Response<ResponseBody>, next: NextFunction) {
  if (req.body.message.length < 3 || req.body.message.length > 1000) {
    res
      .status(400)
      .send({
        error: 'Message length should be from 3 to 1000 characters',
      });
    return;
  }
  
  if (req.body.title.length < 3 || req.body.title.length > 100) {
    res
      .status(400)
      .send({
        error: 'Title length should be from 3 to 100 characters',
      });
    return;
  }
  
  if (req.body.attachments.length > 10) {
    res
      .status(400)
      .send({
        error: 'Too many attachaments',
      });
    return;
  }
  next();
}

// post.controller.js
app.post('/post', validation, async (req, res, next) => {
  const {id: userId} = req.user;
  await createPost(userId, req.body);
  res.send({ok: true});
});
```

This layer is responsible for the calling methods of the **Service layer**. It also might have logic related to input validation (in the example above we've created a separate middleware for that). This layer doesn’t know what will happen during
post-creation, what database is used, and what other services will be called. But, it does know that HTTP is used as a
communication protocol, which data format it might receive, and what format should be used in response. If your customer
decides to switch to WebSockets, RPC, or even SMTP (email protocol) only logic inside this layer should be changed.

As was already mentioned, it’s a simple example of three-layered architecture, but the idea will remain the same:
following principles and layer separation. In more complex applications you might need to have some intermediate
mappers to map objects from a format that Business logic knows to the one that can be transferred to a client, error
handlers to map exceptions on the database layer to some HTTP status codes that can be sent in response.
