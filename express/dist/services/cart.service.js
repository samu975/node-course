"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markCartAsDeleted = exports.updateCart = exports.deleteCart = exports.getCartById = exports.addToCart = exports.getCartByUserId = exports.createCart = void 0;
const CartRepository = require("../repositories/cart.repository");
const createCart = (userId) => {
    let cart = CartRepository.getCartByUserId(userId);
    if (!cart) {
        cart = CartRepository.createCart(userId);
    }
    return cart;
};
exports.createCart = createCart;
const getCartByUserId = (userId) => {
    const cart = CartRepository.getCartByUserId(userId);
    if (!cart) {
        throw new Error('Cart not found');
    }
    return cart;
};
exports.getCartByUserId = getCartByUserId;
const addToCart = (cartId, productId, quantity) => {
    const cart = CartRepository.getCartById(cartId);
    if (!cart) {
        throw new Error('Cart not found');
    }
    CartRepository.addToCart(cartId, productId, quantity);
};
exports.addToCart = addToCart;
const getCartById = (id) => {
    const cart = CartRepository.getCartById(id);
    if (!cart) {
        throw new Error('Cart not found');
    }
    return cart;
};
exports.getCartById = getCartById;
const deleteCart = (id) => {
    const cart = CartRepository.getCartById(id);
    if (!cart) {
        throw new Error('Cart not found');
    }
    CartRepository.deleteCart(id);
};
exports.deleteCart = deleteCart;
const updateCart = (cart) => {
    CartRepository.updateCart(cart);
};
exports.updateCart = updateCart;
const markCartAsDeleted = (id) => {
    const cart = CartRepository.getCartById(id);
    if (!cart) {
        throw new Error('Cart not found');
    }
    CartRepository.markCartAsDeleted(id);
};
exports.markCartAsDeleted = markCartAsDeleted;
//# sourceMappingURL=cart.service.js.map