"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const UserController = require("./controllers/user.controller");
const OrderController = require("./controllers/order.controller");
const CartController = require("./controllers/cart.controller");
const app = express();
app.use(express.json());
app.post('/users', UserController.createUser);
app.get('/users/:email', UserController.getUserByEmail);
app.get('/users/:id', UserController.getUserById);
app.put('/users', UserController.updateUser);
app.delete('/users/:id', UserController.deleteUser);
app.post('/orders', OrderController.createOrderFromCart);
app.get('/orders/:userId', OrderController.getOrdersByUserId);
app.get('/orders/:id', OrderController.getOrderById);
app.put('/orders', OrderController.updateOrder);
app.delete('/orders/:id', OrderController.deleteOrder);
app.post('/cart', CartController.createCart);
app.get('/cart/:userId', CartController.getCartByUserId);
app.put('/cart', CartController.updateCart);
app.delete('/cart/:id', CartController.deleteCart);
app.post('/cart/:id/complete', CartController.markCartAsDeleted);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
//# sourceMappingURL=app.js.map