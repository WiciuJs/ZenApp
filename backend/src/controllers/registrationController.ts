import { Request, Response } from 'express';
import Registration from '../models/registrationModel';


export const createRegistration = async (req: Request, res: Response) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).json(registration);
  } catch (error: any) {
    res.status(500).json({ error: 'Wystąpił błąd podczas tworzenia rejestracji', details: error.message });
  }
};

export const readRegistration = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (id) {
      const registration = await Registration.findById(id).populate('customer').populate('treatment');
      if (!registration) {
        return res.status(404).json({ error: 'Rejestracja nie znaleziona' });
      }
      res.json(registration);
    } else {
      const registrations = await Registration.find().populate('customer').populate('treatment');
      res.json(registrations);
    }
  } catch (error: any) {
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania rejestracji', details: error.message });
  }
};


export const updateRegistration = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const registration = await Registration.findOneAndUpdate(
      { _id: id },
      req.body, 
      { new: true }
    ).populate('customer').populate('treatment');

    if (!registration) {
      return res.status(404).json({ error: 'Rejestracja nie znaleziona' });
    }
    res.json(registration);
  } catch (error: any) {
    res.status(500).json({ error: 'Wystąpił błąd podczas aktualizacji rejestracji', details: error.message });
  }
};


export const deleteRegistration = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const registration = await Registration.findByIdAndDelete(id);
    if (!registration) {
      return res.status(404).json({ error: 'Rejestracja nie znaleziona' });
    }
    res.json({ message: 'Rejestracja została usunięta' });
  } catch (error: any) {
    res.status(500).json({ error: 'Wystąpił błąd podczas usuwania rejestracji', details: error.message });
  }
};
