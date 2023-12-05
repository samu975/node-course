---
sidebar_position: 3
---

# JSON Web Token
## Definition
JSON Web Token (JWT) is an open standard that provide compact and self-contained way for securely information between components of the system as a JSON object that is digitally signed. JWT can be signed using a secret or a public/private key pair.

Authentication is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token.

## Token structure
JWT consist of three parts separated by `.`:
 - Header
 - Payload
 - Signature

The header is json object that consists of two parts: the token type (JWT), and the signing algorithm being used:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

The second part of the token is the payload, which contains the claims. Claims are statements about an entity (user, client) and additional data. There are three types of claims: 
  - registered - set of [predefined claims](https://www.rfc-editor.org/rfc/rfc7519#section-4.1) which are not mandatory but recommended, such as iss (issuer), exp (expiration time), sub (subject)
  - public - can be defined at will by those using JWTs
  - private - custom claims created to share information between components of the system

As example, we can discover the following payload:

```json
{
  "iss": "CloudX Team", // the principal that issued the JWT
  "sub": "auth",        // the principal that is the subject of the JWT
  "exp": 1505467756869, //  the expiration time after which the JWT MUST NOT be accepted for processing
  "userId": "b08f86fa-35ba-57f3-8f1b-ads3904660bd",
  "displayName": "John Doe",
  "role": "admin"
}
````

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that. For NodeJS we can use `jsonwebtoken` module:

```js
const jwt = require('jsonwebtoken');
const TOKEN_KEY = process.env.TOKEN_KEY; // secret key that use to sign token

const token = jwt.sign(
    {
        userId: "b08f86fa-35ba-57f3-8f1b-ads3904660bd",
        "displayName": "John Doe",
        "role": "admin"
    },
    TOKEN_KEY,
    {
        expiresIn: "2h",
    }
);

```

As you can see, wee use `process.env.TOKEN_KEY` to provide secret key that we use to sign the token. This key also will be used to get data from the token and verify if this token valid:
```js
const jwt = require('jsonwebtoken');
const TOKEN_KEY = process.env.TOKEN_KEY; 

// invalid token - synchronous
try {
  var payload = jwt.verify(token, TOKEN_KEY);
} catch(err) {
  console.error(`Token is invalid`);
}
```
