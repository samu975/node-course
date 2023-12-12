"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.getOrdersByUserId = exports.addOrder = void 0;
const generateId_1 = require("../helpers/generateId");
let orders = [];
const addOrder = (userId, items) => {
    const newOrder = {
        id: (0, generateId_1.generateId)(),
        userId: userId,
        items: items,
    };
    orders.push(newOrder);
    return newOrder;
};
exports.addOrder = addOrder;
const getOrdersByUserId = (userId) => {
    return orders.filter((order) => order.userId === userId);
};
exports.getOrdersByUserId = getOrdersByUserId;
const getOrderById = (id) => {
    return orders.find((order) => order.id === id);
};
exports.getOrderById = getOrderById;
const updateOrder = (order) => {
    const index = orders.findIndex((o) => o.id === order.id);
    orders[index] = order;
};
exports.updateOrder = updateOrder;
const deleteOrder = (id) => {
    const index = orders.findIndex((o) => o.id === id);
    orders.splice(index, 1);
};
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=order.repository.js.map