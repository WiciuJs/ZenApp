import { Request, Response } from 'express';
import Treatment from '../models/Treatment';

export const getTreatments = async (req: Request, res: Response): Promise<void> => {
  try {
    const treatments = await Treatment.find();
    res.status(200).json(treatments);
  } catch (error) {
    res.status(500).json({ error: 'Wystąpił błąd serwera' });
  }
};

export const addTreatment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { massage, price, time } = req.body;
    const treatment = new Treatment({ massage, price, time });
    await treatment.save();
    res.status(201).json(treatment);
  } catch (error) {
    res.status(500).json({ error: 'Wystąpił błąd serwera' });
  }
};

export const getTreatmentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const treatment = await Treatment.findById(req.params.id);
    if (treatment) {
      res.status(200).json(treatment);
    } else {
      res.status(404).json({ error: 'Zabieg nie został znaleziony' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Wystąpił błąd serwera' });
  }
};

export const getTreatmentByName = async (req: Request, res: Response): Promise<void> => {
  try {
    const treatments = await Treatment.find({ massage: new RegExp(req.params.name, 'i') });
    res.status(200).json(treatments);
  } catch (error) {
    res.status(500).json({ error: 'Wystąpił błąd serwera' });
  }
};

export const updateTreatment = async (req: Request, res: Response): Promise<void> => {
  try {
    const treatment = await Treatment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (treatment) {
      res.status(200).json(treatment);
    } else {
      res.status(404).json({ error: 'Zabieg nie został znaleziony' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Wystąpił błąd serwera' });
  }
};

export const deleteTreatment = async (req: Request, res: Response): Promise<void> => {
  try {
    const treatment = await Treatment.findByIdAndDelete(req.params.id);
    if (treatment) {
      res.status(200).json(treatment);
    } else {
      res.status(404).json({ error: 'Zabieg nie został znaleziony' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Wystąpił błąd serwera' });
  }
};
