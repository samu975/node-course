"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markCartAsDeleted = exports.updateCart = exports.deleteCart = exports.addToCart = exports.getCartById = exports.getCartByUserId = exports.createCart = void 0;
const cartService = require("../services/cart.service");
const createCart = (req, res) => {
    const cart = cartService.createCart(req.body.userId);
    res.status(201).json(cart);
};
exports.createCart = createCart;
const getCartByUserId = (req, res) => {
    const cart = cartService.getCartByUserId(req.params.userId);
    if (!cart) {
        res.status(404).send('Cart not found').end();
        return;
    }
    res.status(200).json(cart);
};
exports.getCartByUserId = getCartByUserId;
const getCartById = (req, res) => {
    const cart = cartService.getCartById(req.params.id);
    if (!cart) {
        res.status(404).send('Cart not found').end();
        return;
    }
    res.status(200).json(cart);
};
exports.getCartById = getCartById;
const addToCart = (req, res) => {
    cartService.addToCart(req.body.cartId, req.body.productId, req.body.quantity);
    res.status(204).end();
};
exports.addToCart = addToCart;
const deleteCart = (req, res) => {
    cartService.deleteCart(req.params.id);
    res.status(204).end();
};
exports.deleteCart = deleteCart;
const updateCart = (req, res) => {
    cartService.updateCart(req.body);
    res.status(200).end();
};
exports.updateCart = updateCart;
const markCartAsDeleted = (req, res) => {
    cartService.markCartAsDeleted(req.params.id);
    res.status(204).end();
};
exports.markCartAsDeleted = markCartAsDeleted;
//# sourceMappingURL=cart.controller.js.map