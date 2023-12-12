"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUserByEmail = exports.createUser = void 0;
const userService = require("../services/user.service");
const createUser = (req, res) => {
    const user = userService.createUser(req.body);
    res.status(201).json(user);
};
exports.createUser = createUser;
const getUserByEmail = (req, res) => {
    const user = userService.getUserByEmail(req.params.email);
    if (!user) {
        res.status(404).send('User not found').end();
        return;
    }
    res.status(200).json(user);
};
exports.getUserByEmail = getUserByEmail;
const getUserById = (req, res) => {
    const user = userService.getUserById(req.params.id);
    if (!user) {
        res.status(404).send('User not found').end();
        return;
    }
    res.status(200).json(user);
};
exports.getUserById = getUserById;
const updateUser = (req, res) => {
    const user = userService.updateUser(req.body);
    res.status(200).json(user);
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    userService.deleteUser(req.params.id);
    res.status(204).end();
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map