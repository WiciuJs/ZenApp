import { Request, Response } from 'express';
import ProductModel, { Product } from '../models/ProductModel';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await ProductModel.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: 'Nie można utworzyć produktu' });
    }
};

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Wystąpił błąd serwera' });
    }
};


export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Produkt nie istnieje' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Wystąpił błąd serwera' });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const deletedSupplier = await ProductModel.findByIdAndDelete(req.params.id);
        if (!deletedSupplier) {
            return res.status(404).json({ error: 'Dostawca nie istnieje' });
        }
        res.status(200).json({ message: 'Dostawca został usunięty' });
    } catch (error) {
        res.status(500).json({ error: 'Wystąpił błąd serwera' });
    }
};