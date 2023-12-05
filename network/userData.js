let users = [
  {
    id: 1,
    name: 'user1',
    email: 'user1@test.com',
    hobbies: ['books', 'sport', 'dancing'],
  },
  {
    id: 2,
    name: 'user2',
    email: 'user2@test.com',
    hobbies: ['series', 'sport'],
  },
];

function getUserWithHobbies(id) {
  const user = users.find((user) => user.id.toString() === id);
  return user;
}

function getUsers() {
  return users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  });
}

function getUserById(id) {
  const user = users.find((user) => user.id.toString() === id);
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

function addUser(userData) {
  const newId =
    users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
  const newUser = { id: newId, ...userData };
  users.push(newUser);
  return newUser;
}

function updateUser(id, updateData) {
  const userIndex = users.findIndex((user) => user.id === parseInt(id));
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updateData };
    return users[userIndex];
  }
  return null;
}

function removeUser(id) {
  const initialLength = users.length;
  users = users.filter((user) => user.id.toString() !== id);
  return initialLength !== users.length;
}

module.exports = {
  getUsers,
  addUser,
  updateUser,
  removeUser,
  getUserById,
  getUserWithHobbies,
};
