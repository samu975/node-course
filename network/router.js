const usersController = require('./usersController');
const hobbiesController = require('./hobbiesController');

function handleRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  const method = req.method;

  if (path.startsWith('/users')) {
    const segments = path.split('/').filter(Boolean);
    if (method === 'GET') {
      if (segments.length === 2) {
        const userId = segments[1];
        usersController.listUser(req, res, userId);
      } else {
        usersController.listUsers(req, res);
      }
    } else if (method === 'POST') {
      usersController.createUser(req, res);
    } else if (method === 'PUT' && segments.length === 2) {
      const userId = segments[1];
      usersController.updateUser(req, res, userId);
    } else if (method === 'DELETE' && segments.length === 2) {
      const userId = segments[1];
      usersController.deleteUser(req, res, userId);
    }
  }
  if (path.startsWith('/hobbies')) {
    const segments = path.split('/').filter(Boolean);
    if (method === 'GET') {
      if (segments.length === 2) {
        const userId = segments[1];
        hobbiesController.listUserHobbies(req, res, userId);
      }
    } else if (method === 'POST' && segments.length === 2) {
      const userId = segments[1];
      hobbiesController.addHobby(req, res, userId);
    } else if (method === 'DELETE' && segments.length === 3) {
      const userId = segments[1];
      const hobby = segments[2];
      hobbiesController.deleteHobby(req, res, userId, hobby);
    }
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
}

module.exports = { handleRequest };
