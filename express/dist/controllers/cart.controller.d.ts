import { Request, Response } from 'express';
export declare const createCart: (req: Request, res: Response) => void;
export declare const getCartByUserId: (req: Request, res: Response) => void;
export declare const getCartById: (req: Request, res: Response) => void;
export declare const addToCart: (req: Request, res: Response) => void;
export declare const deleteCart: (req: Request, res: Response) => void;
export declare const updateCart: (req: Request, res: Response) => void;
export declare const markCartAsDeleted: (req: Request, res: Response) => void;
