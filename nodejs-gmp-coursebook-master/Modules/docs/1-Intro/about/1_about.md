---
title: About Node.js
---

# About Node.js

Before diving in, let's address a fundamental question: **What is Node.js?**

If you are taking this course, chances are you use JavaScript to create interactive user interfaces, manipulate and render content, implement server interactions, and develop single-page applications. JavaScript typically runs in a browser, enabling you to interact with a web page after it is loaded. However, JavaScript is not limited to the browser environment. With Node.js, you can run JavaScript on a server or other environments, too.

## What is Node.js

[Node.js](https://nodejs.org/en/) is an open-source, cross-platform runtime environment for executing JavaScript code outside a browser. Node.js is completely open-source and it can run on all three major operating systems (Mac OS, Windows, and Linux). Node.js alternatives are [Deno](https://deno.land/), [Bun](https://bun.sh/).

:::note
Remember that NodeJS is not a framework, and it's not a programming language - it's cross-platform runtime environment ([RTE](https://en.wikipedia.org/wiki/Runtime_system)). 
:::

## Node.js specifics
Node.js runs on the [V8 JavaScript engine](3_engine.md) (written in C++), which is the same engine that powers Google Chrome, except that it functions outside the browser. Another aspect of Node.js, according to the official website, is that it implements an event-driven, non-blocking I/O model that makes it lightweight and efficient.

### Single-threaded
Since JavaScript is single-threaded, Node.js operates in a single process as well and doesn't create a new thread for each request, which is different from how [Java](https://www.java.com/en/download/help/whatis_java.html) or [Python](https://www.python.org/) typically handle it. Node.js utilizes the [single threaded](https://en.wikipedia.org/wiki/Thread_(computing)) event loop model to handle multiple concurrent clients without creating multiple threads. This approach eliminates the performance cost of thread context switching and minimizes the risk of errors caused by incorrect thread synchronization, which can be difficult to troubleshoot. Tasks in Node.js begin the execution without waiting for other tasks to complete. At any given time, only one task is being executed

### Non-blocking I/O model

Node.js has a collection of [asynchronous I/O](https://en.wikipedia.org/wiki/Asynchronous_I/O) primitives in its standard library that prevent JavaScript code from blocking. For instance, when reading and editing local files or communicating with an API via an HTTP request, Node.js avoids tying up the thread and wasting CPU cycles on waiting. Instead, Node.js will resume operations when a response is received. This enables Node.js to process thousands of concurrent connections with a single server without the management overhead of thread concurrency, which can be a major source of bugs.

### JavaScript everywhere paradigm
Node.js represents the "JavaScript everywhere" philosophy or Full-Stack JavaScript, allowing developers who create JavaScript code for the browser to also build server-side code without acquiring new language skills.

### New ECMAScript standards
Node.js seamlessly implements the new ECMAScript standards. Unlike browsers, which require updates for compliance with the [TC39](https://tc39.es/) standards, Node.js developers can choose any ECMAScript version that they prefer. Additionally, developers can enable specific experimental features using flags.

### Package ecosystem
According to the official Node.js website, another important aspect of Node.js is the npm package ecosystem, which is the world's most extensive collection of open-source libraries. The community of open-source enthusiasts has created more than one million npm packages, which extend the capabilities of Node.js.

### Unified API
Node.js adopted popular server-side development patterns, making it highly compatible with JSON-compatible databases or web browsers. This compatibility creates a unified JavaScript development stack.

## Node.js use cases
Node.js is specifically designed for creating scalable network applications and is primarily used for server-side applications. It can be installed on almost any device and has versatile functionality, allowing developers to build applications for a range of purposes, from running applications on your PC to your tablet, smartphone, or microcomputer.

What kind of applications and functionalities can developers build using Node.js? Below is a list of the main types of applications, each with a real-world example:
- Data streaming applications, such as real-time stock trade platforms or real-time collaboration tools.
- Data-Intensive Real-Time (DIRT) Applications, such as image processing and web crawling.
- Single-page applications like Google Maps and Netflix.
- Static file servers.
- Applications based on microservice and serverless architecture.
- Internet of Things (IoT) solutions.
- Web Application frameworks such as [Socket.io](https://socket.io/) for building chat applications.
- Servers for HTML5 multiplayer games.

## Node.js Frameworks and Tools
Thousands of libraries have been built upon Node.js by the community over the years to enhance productivity and streamline development. Several of these libraries have become popular ones. Here's a list of some worth knowing or learning ones:
- [Express](https://expressjs.com/): This framework provides a simple yet powerful way to create a web server. Its minimalist approach is unopinionated, focused on the core features of a server, making it a key player in this space.
- [NestJS](https://nestjs.com/):  TypeScript-based progressive Node.js framework for building enterprise-grade, efficient, reliable, and scalable server-side applications.
- [hapi](https://hapi.dev/): A rich framework for building applications and services that enables developers to focus on writing reusable application logic instead of spending time building infrastructure.
- [koa](https://koajs.com/): Built by the same team behind Express, it aims to be even simpler and smaller while building on years of knowledge.
- [Fastify](https://www.fastify.io/):  A fast and low-overhead web framework with a wide range of powerful plugins and a robust community providing an excellent developer experience.
- [AdonisJS](https://adonisjs.com/): A TypeScript-based fully featured framework highly focused on developer ergonomics, stability, and confidence. Adonis is one of the fastest Node.js web frameworks.
- [Egg.js](https://www.eggjs.org/): A framework to build better enterprise frameworks and apps with Node.js & Koa.
- [Loopback.io](https://loopback.io/): Makes it easy to build modern applications that require complex integrations.
- [Micro](https://github.com/vercel/micro): Provides a very lightweight server to create asynchronous HTTP microservices.
- [Socket.io](https://socket.io/): A real-time communication engine for building network applications.

