"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markCartAsDeleted = exports.updateCart = exports.deleteCart = exports.addToCart = exports.getCartById = exports.getCartByUserId = exports.createCart = void 0;
const generateId_1 = require("../helpers/generateId");
let carts = [];
const createCart = (userId) => {
    const newCart = {
        id: (0, generateId_1.generateId)(),
        userId: userId,
        items: [],
        isDeleted: false,
    };
    carts.push(newCart);
    return newCart;
};
exports.createCart = createCart;
const getCartByUserId = (userId) => {
    return carts.find((cart) => cart.userId === userId && !cart.isDeleted);
};
exports.getCartByUserId = getCartByUserId;
const getCartById = (id) => {
    return carts.find((cart) => cart.id === id && !cart.isDeleted);
};
exports.getCartById = getCartById;
const addToCart = (cartId, productId, quantity) => {
    const index = carts.findIndex((c) => c.id === cartId);
    carts[index].items.push({ productId, quantity });
};
exports.addToCart = addToCart;
const deleteCart = (id) => {
    const index = carts.findIndex((c) => c.id === id);
    carts[index].isDeleted = true;
};
exports.deleteCart = deleteCart;
const updateCart = (cart) => {
    const index = carts.findIndex((c) => c.id === cart.id);
    carts[index] = cart;
};
exports.updateCart = updateCart;
const markCartAsDeleted = (id) => {
    const index = carts.findIndex((c) => c.id === id);
    carts[index].isDeleted = true;
};
exports.markCartAsDeleted = markCartAsDeleted;
//# sourceMappingURL=cart.repository.js.map