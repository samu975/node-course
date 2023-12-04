---
sidebar_position: 0
---

# What is authentication

## Definition
Authentication is the process of verifying that user or device allowing access to a system or resources.

In other words, when a user attempts to access information on a network, they must provide secret credentials to prove their identity.  

The most common method of authentication is an authentication using login and password. But with increasing of cybersecurity threats recent years, most organizations use and recommend additional authentication factors for layered security.  

Nowadays, authentication is common practice. Most people have used authentication to access their private information and devices at home and at work:
  - logging in to social network with a username and password
  - opening a phone with TouchID, FaceID or unique PIN

Of course, new methods of authentication are gaining traction to better secure personal, business, and government resources from unauthorized access.

## Authentication factors
There are three main categories of credentials used to authenticate or verify identity:
  - knowledge factor (the most common factor): verify identity by confirming users through confidential information they have, such as a login and password
  - possession factor: verify their identity with a unique object such as secret key
  - inherence factor: verify identity through inherent biometric characteristics of the user such a fingerprint, TouchID, FaceID, etc.

Other types of information, such as location data or device identity also can be used as authentication factors.

## Types of Authentication

### Single-Factor Authentication
Single-factor authentication (SFA) or one-factor authentication is the simplest form of authentication method. This method involves matching one credential to verify access to a system (i.e., a username and a password). SFA is considered low-security and recently was added to list of Bad Practices.
The main weakness of SFA is that it provides just one barrier, and cybercriminals only need to steal the credentials to gain access to the system. And practices such as password reuse, admin password sharing, and relying on default or otherwise weak passwords make it that much easier for hackers to guess or obtain them.

### Two-Factor Authentication
Two-factor authentication (2FA) provides a second layer of protection resources. 2FA requires something user can prove that he is who he is (e.g., a security token, TouchID).
this method is more secure because even if a user’s password is stolen, the hacker will have to provide a second form of authentication to gain access. 

### Three-Factor Authentication
Three-factor authentication (3FA) requires identity-confirming credentials from three separate authentication factors. 3FA is a more secure authentication process and adds a third layer of access protection to your accounts

### Multi-Factor Authentication
Any process that requires two or more factors of authentication known as multi-factor authentication (MFA). Two-factor and three-factor authentication are both related to multi-factor authentication.

### Single Sign-On Authentication
Single sign-on (SSO) authentication allows users to access multiple accounts and applications using just one set of credentials. As an example we can consider Google, which allow users to sign in to other applications using their Google credentials. 
Basically, applications outsource the authentication process to a trusted third party (such as Google), which has already confirmed the user’s identity.

### One-Time Password
A one-time password (OTP) is an auto-generated password that is valid for one login session and often used for MFA. For instance, a user will start to log using username and password, which then triggers the application to send an OTP to their registered phone or email. The user can use this code to complete the authentication. 

### Passwordless Authentication
This method doesn’t require any knowledge-based authentication factor. Usually, after entering ID, user will be prompted to authenticate through a registered device or token.
SSO and MFA usually use passwordless authentication to improve the user experience and strengthen security.

### Certificate-Based Authentication
Certificate-based authentication (CBA) uses a digital certificate to identify a user or device. This certificate, also known as a public-key certificate, is an electronic document that stores the public key data, including information about the key, its owner, and the digital signature verifying the identity. CBA is often used as part of a two-factor or multi-factor authentication process. 