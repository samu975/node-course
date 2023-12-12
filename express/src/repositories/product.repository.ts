import { generateId } from '../helpers/generateId';
import { Product } from '../models/product.model';

const products: Product[] = [];

export const addProduct = (product: Product): void => {
  const newProduct: Product = {
    ...product,
    id: generateId(),
  };
  products.push(newProduct);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProducts = (): Product[] => {
  return products;
};

export const updateProduct = (product: Product): void => {
  const index = products.findIndex((p) => p.id === product.id);
  products[index] = product;
};

export const deleteProduct = (id: string): void => {
  const index = products.findIndex((p) => p.id === id);
  products.splice(index, 1);
};
