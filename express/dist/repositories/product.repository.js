"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProducts = exports.getProductById = exports.addProduct = void 0;
const generateId_1 = require("../helpers/generateId");
const products = [];
const addProduct = (product) => {
    const newProduct = Object.assign(Object.assign({}, product), { id: (0, generateId_1.generateId)() });
    products.push(newProduct);
};
exports.addProduct = addProduct;
const getProductById = (id) => {
    return products.find((product) => product.id === id);
};
exports.getProductById = getProductById;
const getProducts = () => {
    return products;
};
exports.getProducts = getProducts;
const updateProduct = (product) => {
    const index = products.findIndex((p) => p.id === product.id);
    products[index] = product;
};
exports.updateProduct = updateProduct;
const deleteProduct = (id) => {
    const index = products.findIndex((p) => p.id === id);
    products.splice(index, 1);
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.repository.js.map