"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.getOrdersByUserId = exports.createOrderFromCart = void 0;
const orderService = require("../services/order.service");
const createOrderFromCart = (req, res) => {
    const order = orderService.createOrderFromCart(req.body.userId);
    res.status(201).json(order);
};
exports.createOrderFromCart = createOrderFromCart;
const getOrdersByUserId = (req, res) => {
    const orders = orderService.getOrdersByUserId(req.params.userId);
    if (!orders) {
        res.status(404).send('Orders not found').end();
        return;
    }
    res.status(200).json(orders);
};
exports.getOrdersByUserId = getOrdersByUserId;
const getOrderById = (req, res) => {
    const order = orderService.getOrderById(req.params.id);
    if (!order) {
        res.status(404).send('Order not found').end();
        return;
    }
    res.status(200).json(order);
};
exports.getOrderById = getOrderById;
const updateOrder = (req, res) => {
    const order = orderService.updateOrder(req.body);
    res.status(200).json(order);
};
exports.updateOrder = updateOrder;
const deleteOrder = (req, res) => {
    orderService.deleteOrder(req.params.id);
    res.status(204).end();
};
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=order.controller.js.map