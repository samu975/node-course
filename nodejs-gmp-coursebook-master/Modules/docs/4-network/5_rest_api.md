---
sidebar_position: 5
---

# REST API

In the upcoming modules, you will have the opportunity to build a REST API based on instructions provided. So, let's quickly refresh our understanding of REST API and its key principles.

## Introduction

REST (**RE**presentational **S**tate **T**ransfer) is an architectural style that defines a set of constraints
to be used for creating web services.

It was created as part of doctoral dissertation of Roy Fielding in 2000 with the goal of standardized communication between
Web Servers, but it revolutionized the whole Web 2.0 creating the API economy that we know today.
## Constraints

Let's take a look into the constraints for an API to be considered a REST API.

- [Client-Server Architecture](#client-server-architecture)
- [Stateless Interactions](#stateless-interactions)
- [Uniform interface](#uniform-interface)
- [Cacheability](#cacheability)
- [Layered system](#layered-system)
- [Code on demand](#code-on-demand)

### Client-Server Architecture

:::tip Definition
Client and server should be completely independent and separated from each other. Server doesn't need to know anything about how the client is built. Client doesn't need to know anything about any business rules that are created on the server.
:::

The key aspects of the client-server architecture are:
1. **Separation of Concerns**: The client and server have distinct responsibilities and concerns.
2. **Scalability**: The client-server architecture allows independent scaling of client and server components. For example the server can be scaled up across multiple machines to handle increased load.
3. **Loose Coupling**: The client and server are loosely coupled, meaning they can evolve and change independently without impacting each other. As long as the interface between the client and server remains consistent, updates or modifications to one component can be made without affecting the other.
4. **Interoperability**: Clients and servers can be developed using different technologies or run on different platforms.

### Stateless Interactions 

:::tip Definition
Each request from a client to a server must contain all the necessary information for the server to understand and process the request. The server does not rely on any previous requests or stored client context to fulfill the current request.
:::

The benefits of stateless interactions in REST APIs include scalability, simplicity, and improved reliability. Since the server does not need to store client-specific data or maintain session state, it can handle requests from any client without requiring additional server resources for managing sessions. Additionally, stateless interactions simplify the client's implementation, as it does not need to maintain and synchronize state with the server.

### Uniform interface

:::tip Definition
REST APIs should have a consistent and standardized interface (set of operations and conventions) which simplifies the client-server interaction.
:::

The uniform interface typically consists of four primary constraints:
1. **Resource-Based**: REST APIs expose resources, which are represented as nouns, such as "users", "products" or "orders" (pay attention that plural forms are used).  Resources are identified by unique URLs. For example, `/users` might represent the collection of users, `/users/123` - a specific user with the ID 123.
2. **CRUD Operations**: The uniform interface provides standard operations (Create, Read, Update, Delete) that map to the HTTP methods: `POST`, `GET`, `PUT/PATCH`, and `DELETE`, respectively. These methods correspond to operations that can be performed on resources.
3. **Stateless Requests**: Each request from the client to the server should contain all the necessary information for the server to understand and process the request. The server should not rely on any client-specific state or session. 
4. **Hypermedia as the Engine of Application State (HATEOAS)**: REST APIs include hypermedia links in the response to provide navigation and discoverability. These links allow clients to discover related resources and available actions without prior knowledge. For example, a response for a user might include links to view the user's details, update the user, or retrieve related resources like the user's orders.

By following the principles of the uniform interface, REST APIs become consistent, self-descriptive, and easy to consume. Clients can understand the structure of the API, the available resources, and the actions they can perform by following the standard conventions and leveraging hypermedia links.

### Cacheability

:::tip Definition

Responses from the server can be marked as cacheable or non-cacheable. If they are defined as cacheable ones, then the client can reuse the response data for equivalent requests in the future.

:::

By default responses are not cached, meaning that the server needs to recompute it for each request. However, there are some cases when the response for a particular request may not change frequently or at all. In this case, responses can be stored in cache and served directly from it for subsequent identical requests. It allows to improve performance significantly by reducing the need for redundant processing and network round trips.

REST APIs use cache headers to control caching behavior. These are the most commonly used cache headers:
- **[Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)**: allows the server to specify caching directives to the client. Some common directives include:
  - `max-age`: Indicates the maximum time in seconds that the response can be cached before it is considered stale.
  - `private`: Specifies that the response is intended for a specific user and should not be cached by shared caches.
  - `public`: Indicates that the response can be cached by both private and shared caches.
  - `no-cache`: Indicates that the response should not be served from the cache.
- **[Expires](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expires)**: specifies date and time after which the response is considered stale and should not be used from the cache. It is often used together with the Cache-Control header to provide additional caching instructions.
- **[ETag](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag)**: is used to uniquely identify a specific version of a resource representation.
- **[Last-Modified](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Last-Modified)**: indicates the date and time when the resource was last modified on the server. 

**Note:** Cached responses should be invalidated or refreshed when the corresponding resources change to maintain data consistency.

### Layered system

:::tip Definition
REST allows the usage of intermediaries, such as proxies, gateways, or load balancers, between the client and the server.
:::

These intermediaries can improve performance, security, and scalability. Each layer remains unaware of any internals of other layers, promoting loose coupling and system extensibility. For example, a client cannot tell whether it is connected directly to the end server or to an intermediary.

### Code on demand

:::tip Definition
Code on Demand is an optional constraint of the REST architectural style. It allows the server to dynamically send executable code (such as JavaScript) to the client as part of the API response. The client can then execute this code to enhance its functionality or behavior.
:::

This feature is typically used in scenarios where the server wants to provide additional functionality to the client without requiring prior knowledge or hardcoding everything into the client application.

For example, suppose a REST API provides a service that performs complex calculations or generates customized user interfaces. Instead of the client having to implement those functionalities themselves, the server can send executable code along with the response. The client then executes this code to perform the desired calculations or modify its user interface based on the provided logic.

Code on Demand can be beneficial for adding flexibility, reducing client complexity, and allowing the server to evolve independently without requiring client updates. However, it is an optional constraint in REST, and not all REST APIs implement Code on Demand. Its usage depends on specific requirements and design choices for a given API.
