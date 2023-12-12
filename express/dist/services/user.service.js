"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUserByEmail = exports.createUser = void 0;
const UserRepository = require("../repositories/user.repository");
const createUser = (userData) => {
    UserRepository.addUser(userData);
    return userData;
};
exports.createUser = createUser;
const getUserByEmail = (email) => {
    return UserRepository.getUserByEmail(email);
};
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => {
    return UserRepository.getUserById(id);
};
exports.getUserById = getUserById;
const updateUser = (userData) => {
    UserRepository.updateUser(userData);
};
exports.updateUser = updateUser;
const deleteUser = (id) => {
    UserRepository.deleteUser(id);
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.service.js.map