import { Request, Response } from 'express';
import Registration, { IRegistration } from '../models/registrationModel';
//Działa
class RegistrationController {
  async create(req: Request, res: Response) {
    try {
      const registration = new Registration(req.body);
      await registration.save();
      res.status(201).json(registration);
    } catch (error: any) {
      res.status(500).json({ error: 'Wystąpił błąd podczas tworzenia rejestracji', details: error.message });
    }
  }
  //Działa
  async read(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (id) {
        const registration = await Registration.findById(id).populate('customer');
        if (!registration) {
          return res.status(404).json({ error: 'Rejestracja nie znaleziona' });
        }
        res.json(registration);
      } else {
        const registrations = await Registration.find().populate('customer');
        res.json(registrations);
      }
    } catch (error: any) {
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania rejestracji', details: error.message });
    }
  }
// Dziwne to bo zwraca ciągle to samo nie aktualziuje !!!!
  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const registration = await Registration.findOneAndUpdate(
        { _id: id },
        { $set: req.body }, 
        { new: true }
      );
      if (!registration) {
        return res.status(404).json({ error: 'Rejestracja nie znaleziona' });
      }
      res.json(registration);
    } catch (error: any) {
      res.status(500).json({ error: 'Wystąpił błąd podczas aktualizacji rejestracji', details: error.message });
    }
  }
 //Działa
  async delete(req: Request, res: Response) {
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
  }
}

export default new RegistrationController();
