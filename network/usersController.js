const usersData = require('./userData');

function validateUserData(data) {
  const hasName = typeof data.name === 'string' && data.name.trim() !== '';
  const hasEmail = typeof data.email === 'string' && data.email.trim() !== '';
  const hasValidHobbies =
    Array.isArray(data.hobbies) &&
    data.hobbies.every((hobby) => typeof hobby === 'string');

  return hasName && hasEmail && hasValidHobbies;
}

function listUsers(req, res) {
  const users = usersData.getUsers();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
}

function listUser(req, res, id) {
  const user = usersData.getUserById(id);
  if (user) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
  }
}

function createUser(req, res) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const userData = JSON.parse(body);

      if (!validateUserData(userData)) {
        throw new Error('Invalid user data');
      }

      const newUser = usersData.addUser(userData);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error.message }));
    }
  });
}

function updateUser(req, res, id) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const updateData = JSON.parse(body);

      const updatedUser = usersData.updateUser(id, updateData);
      if (updatedUser) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedUser));
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error.message }));
    }
  });
}

function deleteUser(req, res, id) {
  const wasDeleted = usersData.removeUser(id);

  if (wasDeleted) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User deleted' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
  }
}

module.exports = {
  listUsers,
  listUser,
  createUser,
  updateUser,
  deleteUser,
};
