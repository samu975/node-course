---
sidebar_position: 2
---

# Why do we need a framework?

What is a framework? According to [Wikipedia](https://en.wikipedia.org/wiki/Software_framework), *framework - is an abstraction in which software, providing generic functionality, can be selectively changed by additional user-written code, thus providing application-specific software*. In other words, framework provides a developer with some tools and dictates how to use these tools properly.

Before answering the question of why a framework is needed, let’s take a look at the example of starting a simple HTTP server without using frameworks.

```js
const http = require('http');

const server = http.createServer({}, (req, res) => {
    res.write('Hello World');
    res.end();
});

server.listen({ port: 3000 }, () => {
    console.log('Server is started');
})
```

For now, it looks fine, but let’s add some logic to this server. For example, let’s create two endpoints `POST /users` for creating a user and `GET /users/:id` for getting a user by id:

```js
const http = require('http');
const userService = require('./user.service');

const server = http.createServer({}, (req, res) => {
    if (req.method === 'GET' && req.url.startsWith('/users/')) {
        const [, userId] = req.url.match(/^\/users\/(.+)$/);
        const user = userService.getUserById(userId) || {};
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(user));
        res.end();
        return;
    }
    if (req.method === 'POST' && req.url === '/users') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const user = userService.createUser(JSON.parse(body));
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(user));
            res.end();
        })
        return;
    }
    res.writeHead(404, {});
    res.write('There is no such endpoint');
    res.end();
});

server.listen({ port: 3000 }, () => {
    console.log('Server is started');
})
```

Quite verbose, isn’t it? What if we need to add logging, authentication, authorization, etc? To reduce complexity we can create additional methods for routing, sending JSON data, and other common cases. But before you do it, take a look at the same web server but written using the Express framework:

```js
const express = require('express');
const userService = require('./user.service');

const app = express();

app.use(express.json());

app.get('/users/:id', (req, res) => {
    const user = userService.getUserById(req.params.id) || {};
    res.json(user);
});
app.post('/users', (req, res) => {
    const user = userService.createUser(req.body);
    res.json(user)
})

app.listen({ port: 3000 }, () => {
    console.log('Server is started');
})
```

Now it’s much better. By using Express we reduced amount of lines of code, but more important is that now it looks more declarative and readable than it was before.
