---
sidebar_position: 2
---

# Basic authentication
Basic authentication is an authentication scheme built into the HTTP protocol and usually implemented on the web-server side.
When using basic authentication, the client include  the authorization header of each request it makes. This header should start with `Basic` word followed by a space and a base64-encoded string username:password.

As an example, we can consider user  with login `testuser` and password `testpassword`. To make HTTP request with basic authentication, we need to encode string `testuser:testpassword` to base64 and add it to authorization header like this:

```http request
Authorization: Basic dGVzdHVzZXI6dGVzdHBhc3N3b3Jk
```

When server receive the request, there are should be function responsible for verification access. This function will extract authorization token, decode it, extract user and password and verify if the provided user has exact same password saved in database. If verification is failed, server will send response with 401 HTTP code.

Basic authentication strategy not recommended for production code and usually is using for development purposes, as example, for the dev team when they work on new pages, features and only for dev/staging environments
