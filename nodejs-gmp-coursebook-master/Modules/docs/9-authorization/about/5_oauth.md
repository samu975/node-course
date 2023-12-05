---
sidebar_position: 4
---

# OAuth (Optional)
## Definition
Open Authorization or [OAuth 2.0](https://auth0.com/intro-to-iam/what-is-oauth-2/) is an authorization protocol designed to allow a website or an application to access resources hosted by other web apps on behalf of a user.

This protocol prevents the user from the entering his password out of the service provider: the whole process is curtailed to clicking the «I agree to provide access to ...» button. The main approach is to have one secure account, the user can use it for identity verification on other services, without disclosing his password. OAuth also can be used for authorization as well (it allows to provide the rights for the actions that the service client will use for access verification).

There are multiple trusted services such as Google, Amazon, etc. that provide OAuth. From Architecture point of view it allow us to design system using trusted service for authorization that relieves us of security responsibilities.

## Access token
An Access Token is a piece of data that represents the authorization to access resources on behalf of the end-user. OAuth 2.0 doesn’t define a specific format for Access Tokens. However, in some contexts, the JSON Web Token (JWT) format is often used.

## Roles
The idea of roles is part of the core specification of the OAuth 2.0. The OAuth 2.0 provide the following:
  - resource owner - the user or system that owns the protected resources and can grant access to them 
  - client - The client is the system that requires access to the protected resources
  - authorization server - the server that receives requests from the client for access token
  - resource server - the server that protects the user’s resources and receives access requests from the client

## Scopes
Scopes are an important part of OAuth 2.0. They are used to specify exactly the reason for which access to resources may be granted. Acceptable scope values, and which resources they relate to, are dependent on the resource server.

## Refresh token
Authorization server may also return not only the access token but refresh token as well. Refresh Tokens have long expiry times and may be used to get new access tokens when the previous expires.

## How Does OAuth 2.0 Work?
Before OAuth 2.0 can be used, the client should get its own credentials (client id and client secret) from the authorization server. Those credentials use to identify and authenticate client when requesting an access token.

The token request, exchange, and response follow this general flow:
  - client (mobile app, web app, desktop) requests authorization from the authorization server, supplying the client id and secret to as identification; it also provides the scopes and redirect URI to send the access token
  - client receives an authorization grant
  - client requests an access token through identity verification with the help of the authorization server and authorization grant provision
  - authorization server verifies the client by checking the authorization grant
  - client use access token to get access to the secure resources
  - provider checks the access token and, if valid, serves the request
    
## Advantages and Disadvantages

The following advantages of OAuth protocol should be mentioned specifically:
  - HTTP / HTTPS with the token indicated in the headers is using to get access to the resources, that allow to use oauth for different solutions such as mobile, sites
  - popularity - most companies use this protocol in their APIs
  - large amount of documentation
  - large amount of the ready-made solutions that can be used to fit your needs

The disadvantages:
  - there is no common format, as a result, each service requires its own implementation.
  - in the process of user verification, sometimes you have to make additional requests to get minimal user information
  - if a token is stolen, an attacker gains access to the secure data for a while
