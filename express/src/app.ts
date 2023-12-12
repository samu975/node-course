const express = require('express');
import * as UserController from './controllers/user.controller';
import * as OrderController from './controllers/order.controller';
import * as CartController from './controllers/cart.controller';

const app = express();
app.use(express.json());

// users
app.post('/users', UserController.createUser);
app.get('/users/:email', UserController.getUserByEmail);
app.get('/users/:id', UserController.getUserById);
app.put('/users', UserController.updateUser);
app.delete('/users/:id', UserController.deleteUser);

// orders
app.post('/orders', OrderController.createOrderFromCart);
app.get('/orders/:userId', OrderController.getOrdersByUserId);
app.get('/orders/:id', OrderController.getOrderById);
app.put('/orders', OrderController.updateOrder);
app.delete('/orders/:id', OrderController.deleteOrder);

// cart
app.post('/cart', CartController.createCart);
app.get('/cart/:userId', CartController.getCartByUserId);
app.put('/cart', CartController.updateCart);
app.delete('/cart/:id', CartController.deleteCart);
app.post('/cart/:id/complete', CartController.markCartAsDeleted);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
