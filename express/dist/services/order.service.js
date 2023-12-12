"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.getOrdersByUserId = exports.createOrderFromCart = void 0;
const OrderRepository = require("../repositories/order.repository");
const CartRepository = require("../repositories/cart.repository");
const createOrderFromCart = (userId) => {
    const cart = CartRepository.getCartByUserId(userId);
    if (!cart) {
        throw new Error('No active cart found for the user');
    }
    const order = OrderRepository.addOrder(userId, cart.items);
    CartRepository.markCartAsDeleted(cart.id);
    return order;
};
exports.createOrderFromCart = createOrderFromCart;
const getOrdersByUserId = (userId) => {
    return OrderRepository.getOrdersByUserId(userId);
};
exports.getOrdersByUserId = getOrdersByUserId;
const getOrderById = (id) => {
    const order = OrderRepository.getOrderById(id);
    if (!order) {
        throw new Error('Order not found');
    }
    return order;
};
exports.getOrderById = getOrderById;
const updateOrder = (order) => {
    OrderRepository.updateOrder(order);
};
exports.updateOrder = updateOrder;
const deleteOrder = (id) => {
    const order = OrderRepository.getOrderById(id);
    if (!order) {
        throw new Error('Order not found');
    }
    OrderRepository.deleteOrder(id);
};
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=order.service.js.map