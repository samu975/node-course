import { Product } from '../models/product.model';
export declare const addProduct: (product: Product) => void;
export declare const getProductById: (id: string) => Product | undefined;
export declare const getProducts: () => Product[];
export declare const updateProduct: (product: Product) => void;
export declare const deleteProduct: (id: string) => void;
