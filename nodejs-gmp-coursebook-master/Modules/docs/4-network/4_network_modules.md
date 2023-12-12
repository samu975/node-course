---
sidebar_position: 4
---

# Network modules

Node.js provides several built-in modules for working with network-related operations. In this section we will review some commonly used ones.

## http

The [http](https://nodejs.org/api/http.html) module is a core module in Node.js that provides functionality for creating HTTP servers and making HTTP requests. It enables you to build networking applications, handle incoming requests, and communicate with other web servers.

### Create HTTP server

Create an HTTP server that listens on port 3000. The server responds with a 200 OK status code and the message "Hello, World!".

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!');
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### Make HTTP GET request

Make an HTTP GET request to www.example.com. The response status code, headers, and data are logged to the console.

```js
const http = require('http');

const options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/',
  method: 'GET',
};

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log('Response Headers:', res.headers);

  res.on('data', (chunk) => {
    console.log(`Received Data: ${chunk}`);
  });

  res.on('end', () => {
    console.log('Request Complete');
  });
});

req.on('error', (error) => {
  console.error(`Request Error: ${error.message}`);
});

req.end();
```

### Process HTTP POST request

In this example, the server checks if the request method is POST. If it is, the server receives the data in chunks and logs it to the console. It responds with "Data Received". For any other request method, it responds with a 404 Not Found status.

```js
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      console.log(`Received Data: ${body}`);
      res.end('Data Received');
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## https

The [https](https://nodejs.org/api/https.html) module extends the http module to provide support for HTTPS (HTTP over SSL/TLS) connections. It allows to create HTTPS server or make secure HTTPS requests.

### Create HTTPS server

The example demonstrates an HTTPS server that requires client authentication. The `options` object includes the private key, certificate, and a certificate authority (CA) certificate. The server's `requestCert` option is set to `true` to request client certificates, and `rejectUnauthorized` is set to `true` to reject requests without a valid client certificate. The client certificate is logged, and the server responds with a 200 OK status code and the message "Hello, World!".

```js
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('privatekey.pem'),
  cert: fs.readFileSync('certificate.pem'),
  ca: fs.readFileSync('ca.pem'), // certificate authority
  requestCert: true,
  rejectUnauthorized: true
};

const server = https.createServer(options, (req, res) => {
  const cert = req.socket.getPeerCertificate();
  console.log('Client Certificate:', cert);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!');
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

The `options` object includes the private key, certificate, and a certificate authority (CA) certificate. The server's `requestCert` option is set to `true` to request client certificates, and `rejectUnauthorized` is set to true to reject requests without a valid client certificate.

## net

The [net](https://nodejs.org/api/net.html) module provides API for creating TCP servers and establishing raw TCP connections. It is a lower-level module that can be used to implement custom protocols or handle specific network scenarios where higher-level modules like http or https are not suitable.

### Create a TCP Server

Create a TCP server using net.createServer(). The server listens on port 3000 and handles incoming connections. You can define event handlers for events like data (to handle incoming data) and end (to handle connection termination).

```js
const net = require('net');

const server = net.createServer((socket) => {
  // Handle connection
  socket.on('data', (data) => {
    // Handle incoming data
  });

  socket.on('end', () => {
    // Handle connection termination
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### Create a TCP Client

Create a TCP client using `net.createConnection()`. The client connects to a server running on port 3000 and sends data. You can define event handlers for events like data (to handle incoming data) and end (to handle disconnection).

```js
const net = require('net');

const client = net.createConnection({ port: 3000 }, () => {
  console.log('Connected to server!');
  client.write('Hello, server!');
});

client.on('data', (data) => {
  console.log('Received data:', data.toString());
  client.end();
});

client.on('end', () => {
  console.log('Disconnected from server');
});
```
## dns

The [dns](https://nodejs.org/api/dns.html) module provides API to perform DNS (Domain Name System) lookups and reverse lookups. It allows you to resolve domain names to IP addresses and vice versa.

### DNS lookup

Perform a DNS lookup using the `dns.lookup()` method. It takes a domain name as an argument and returns the IP address. The address variable will hold the IP address of `www.example.com`.

```js
const dns = require('dns');

dns.lookup('www.example.com', (err, address, family) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('IP Address:', address);
});

/*
IP Address: 93.184.216.34
*/
```

### Resolve DNS

Resolve a domain name to multiple IP addresses using the `dns.resolve()` method. It takes a domain name as an argument and returns an array of IP addresses associated with that domain.

```js
const dns = require('dns');

dns.resolve('www.example.com', (err, addresses) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('IP Addresses:', addresses);
});

/*
IP Addresses: [ '93.184.216.34' ]
*/
```

## url

The [url](https://nodejs.org/api/url.html) module provides utilities for working with URLs. It allows you to parse, format, and manipulate URL strings.

### URL Parsing

Parse a URL using the URL class from the url module. It creates a `parsedUrl` object that represents the parsed URL, and you can access its various components such as protocol, host, port, path, query parameters, and fragment.

```js
const url = require('url');

const urlString = 'https://www.example.com:8080/path?param1=value1&param2=value2#fragment';

const parsedUrl = new URL(urlString);

console.log('Protocol:', parsedUrl.protocol);
console.log('Host:', parsedUrl.host);
console.log('Port:', parsedUrl.port);
console.log('Path:', parsedUrl.pathname);
console.log('Query:', parsedUrl.searchParams.toString());
console.log('Fragment:', parsedUrl.hash);

/*
Protocol: https:
Host: www.example.com:8080
Port: 8080
Path: /path
Query: param1=value1&param2=value2
Fragment: #fragment
*/
```

### URL Formatting

Format a URL using the `url.format()` method. It takes a URL object and returns a formatted URL string. You can provide properties like protocol, host, pathname, search (query parameters), and hash.

```js
const url = require('url');

const urlObject = {
  protocol: 'https:',
  host: 'www.example.com',
  pathname: '/path',
  search: '?param1=value1&param2=value2',
  hash: '#fragment'
};

const formattedUrl = url.format(urlObject);

console.log('Formatted URL:', formattedUrl);

/*
Formatted URL: https://www.example.com/path?param1=value1&param2=value2#fragment
*/
```

## querystring

The [querystring](https://nodejs.org/api/querystring.html) module provides utilities to parse and stringify query strings. It allows you to parse URL query parameters and generate query strings for HTTP requests.

### Parse a Query String

Parse a query string using the `querystring.parse()` method. It takes a query string as input and returns an object representing the parsed key-value pairs.

```js
const querystring = require('querystring');

const queryString = 'param1=value1&param2=value2&param3=value3';

const parsedQuery = querystring.parse(queryString);

console.log('Parsed Query:', parsedQuery);

/*
Parsed Query: [Object: null prototype] {
  param1: 'value1',
  param2: 'value2',
  param3: 'value3'
}
*/
```

### Stringify an Object into a Query String

Stringify an object into a query string using the `querystring.stringify()` method. It takes an object as input and returns a formatted query string.

```js
const querystring = require('querystring');

const obj = {
  param1: 'value1',
  param2: 'value2',
  param3: 'value3'
};

const queryString = querystring.stringify(obj);

console.log('Query String:', queryString);

/*
Query String: param1=value1&param2=value2&param3=value3
/*
```

### Encode and decoding URL

Perform URL encoding and decoding using the `querystring.escape()` and `querystring.unescape()` methods. `escape()` encodes special characters, while `unescape()` decodes an encoded value.

```js
const querystring = require('querystring');

const encodedValue = querystring.escape('Special Characters: ?, =, &');
console.log('Encoded Value:', encodedValue);

const decodedValue = querystring.unescape(encodedValue);
console.log('Decoded Value:', decodedValue);

/*
Encoded Value: Special%20Characters%3A%20%3F%2C%20%3D%2C%20%26
Decoded Value: Special Characters: ?, =, &
*/
```