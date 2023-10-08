import { Request, Response } from 'express';
import SupplierModel from '../models/SupplierModel';

export const createSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = await SupplierModel.create(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    res.status(400).json({ error: 'Nie można utworzyć dostawcy' });
  }
};

export const getAllSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await SupplierModel.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ error: 'Wystąpił błąd serwera' });
  }
};

export const getSupplierById = async (req: Request, res: Response) => {
  try {
    const supplier = await SupplierModel.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: 'Dostawca nie istnieje' });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ error: 'Wystąpił błąd serwera' });
  }
};

export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const deletedSupplier = await SupplierModel.findByIdAndDelete(req.params.id);
    if (!deletedSupplier) {
      return res.status(404).json({ error: 'Dostawca nie istnieje' });
    }
    res.status(200).json({ message: 'Dostawca został usunięty' });
  } catch (error) {
    res.status(500).json({ error: 'Wystąpił błąd serwera' });
  }
};