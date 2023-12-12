const usersData = require('./userData');

function addHobby(userId, hobby) {
  const user = usersData.getUserWithHobbies(userId);
  if (user) {
    user.hobbies.push(hobby);
    return user;
  }
  return null;
}

function deleteHobby(userId, hobby) {
  const user = usersData.getUserWithHobbies(userId);
  if (user && user.hobbies.includes(hobby)) {
    user.hobbies = user.hobbies.filter((h) => h !== hobby);
    return true;
  }
  return false;
}

function getUserHobbies(userId) {
  const user = usersData.getUserWithHobbies(userId);
  if (user) {
    return user.hobbies;
  }
  return null;
}

module.exports = {
  addHobby,
  deleteHobby,
  getUserHobbies,
};
