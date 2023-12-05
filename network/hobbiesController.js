const hobbiesData = require('./hobbiesData');

function addHobby(req, res, userId) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const hobby = JSON.parse(body);
      const updatedUser = hobbiesData.addHobby(userId, hobby);

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

function deleteHobby(req, res, userId, hobby) {
  const result = hobbiesData.deleteHobby(userId, hobby);

  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hobby deleted' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User or hobby not found' }));
  }
}

function listUserHobbies(req, res, userId) {
  const hobbies = hobbiesData.getUserHobbies(userId);
  if (hobbies) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(hobbies));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
  }
}

module.exports = {
  addHobby,
  deleteHobby,
  listUserHobbies,
};
