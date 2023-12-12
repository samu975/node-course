"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUserByEmail = exports.addUser = void 0;
const generateId_1 = require("../helpers/generateId");
const users = [];
const addUser = (user) => {
    const newUser = Object.assign(Object.assign({}, user), { id: (0, generateId_1.generateId)() });
    users.push(newUser);
};
exports.addUser = addUser;
const getUserByEmail = (email) => {
    return users.find((user) => user.email === email);
};
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => {
    return users.find((user) => user.id === id);
};
exports.getUserById = getUserById;
const updateUser = (user) => {
    const index = users.findIndex((u) => u.id === user.id);
    users[index] = user;
};
exports.updateUser = updateUser;
const deleteUser = (id) => {
    const index = users.findIndex((u) => u.id === id);
    users.splice(index, 1);
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.repository.js.map