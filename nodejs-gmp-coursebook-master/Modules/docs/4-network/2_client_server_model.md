---
sidebar_position: 2
---

# Client-Server Model
As an engineer, you likely encounter the Client-Server model frequently in your work. Let's take a moment to revisit its fundamental definitions and refresh our understanding of key concepts.

**The client** represents an application that makes requests to the server. It could be a web or mobile application as well as any other component that interacts with the server. The client is responsible for initiating requests and processing the response. It's important to note that the term "client" is not limited to UI-based applications. In the microservices world, a client can refer to a backend application as well.

**The server** is the central component that receives requests from clients, processes them, and generates responses. It stores and manages resources, executes business logic, and handles data storage and retrieval. The server is responsible for processing client requests, performing necessary computations or database operations, and returning the appropriate responses.

![Client-Server Communication with different technologies](img/rest-client-server-dark.svg#dark-mode-only)
![Client-Server Communication with different technologies](img/rest-client-server.svg#light-mode-only)

## Stateful vs Stateless architecture

### Stateful

In a stateful architecture, the server maintains the state or context of a client's interactions.

- The server retains information about the client's session or past interactions, which allows it to maintain continuity across multiple requests.
- The server can store session data, authentication tokens or any other relevant information.
- This approach often requires the server to allocate resources to manage and store the client's state, which may impact scalability and resource utilization.

#### Example

Let's imagine a scenario where we have a website dedicated to pet management, allowing users to store and organize information about their pets in one central location.

Here's how the session management is implemented if it is stateful application:
- When the user performs an action for the first time, the server creates a unique session identifier for the user.
- This identifier is stored on the server and associated with the user's session. As the user continues to browse and interact with the website, each request they make includes the session identifier.
- The server uses it to authenticate requests.
- The session remains active until the user logs out, closes the browser, or a certain period of inactivity occurs. 

In the picture below the client sends a POST request to update the animal with session identifier (1). Servers checks if there is a session for that user (2) and if true - acknowledges it (3). Server updates animal entity (4-5) and sends the response back to client (6).

![Stateful example](img/rest-stateful.svg#light-mode-only)
![Stateful example](img/rest-stateful-dark.svg#dark-mode-only)

### Stateless

In a stateless architecture, the server does not retain any information about the client's past interactions or session state.

- Each client request is self-contained and includes all the necessary information for the server to process it without relying on previous requests.
- The server treats each request independently and does not maintain any client-specific state between requests.
- Stateless architectures are typically more scalable and easier to manage as they don't require server resources for maintaining session information.
- To maintain client context on server, clients often include relevant information (such as tokens, session IDs, or authentication credentials) in each request.

#### Example

Unlike in the previous example, there is no state stored on the server. Server treats client requests like a "new" ones each time. So the client should provide all information needed to a server to be able to process the request. 

In the picture below client sends a `PUT` request indicating which resource it would like to update e.g. `/animals/8`. It provides the body with full information to update (1). Server performs actions needed in a database for a specific animal (2-3) and sends the response back to client (4).

![Stateless example](img/rest-stateless.svg#light-mode-only)
![Stateless example](img/rest-stateless-dark.svg#dark-mode-only)

It's important to note that stateless interactions do not mean that the server cannot maintain any state at all. The server can still have its internal state, such as databases or caches, to store and retrieve data. However, the client is responsible for providing all the necessary contextual information within each request, allowing the server to process it independently without relying on previous interactions.