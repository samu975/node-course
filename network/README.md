To start de server write npm run start:network

## Endpoints

### Users:

- GET: http://localhost:3001/users/
  List all users
- GET: http://localhost:3001/users/:userId Get User
- POST: http://localhost:3001/users/ create new user. In the body have to send name - string, email - string and hobbies - array of strings.
- PUT: http://localhost:3001/users/:userId update partial user info
- DELETE: http://localhost:3001/users/:userId delete user

### Hobies:

- GET: http://localhost:3001/hobbies/:userId Get hobbies for a user.
- POST: http://localhost:3001/hobbies/:userId Create a new hobbie for a user; the body have to send hobbie - string.
- DELETEhttp://localhost:3001/hobbies/:userId/hobbie Delete a hobbie for user.
