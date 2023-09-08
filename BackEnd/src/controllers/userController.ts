import { Request, Response } from 'express';
import User from '../models/userModel';
//Działa
class UserController {
  async create(req: Request, res: Response) {
    try {
      const { name, surname, age, comments, mail, phoneNumber } = req.body;
      const newUser = new User({
        name,
        surname,
        age,
        comments,
        mail,
        phoneNumber,
        registrations: [],
      });
      await newUser.save();
      return res.status(201).json({ message: 'Nowy użytkownik został utworzony', user: newUser });
    } catch (error: any) {
      res.status(500).json({ error: 'Wystąpił błąd podczas tworzenia użytkownika', details: error.message });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (id) {
        const user = await User.findById(id).populate('registrations');
        if (!user) {
          return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
        }
        res.json(user);
      } else {
        const users = await User.find().populate('registrations');
        res.json(users);
      }
    } catch (error: any) {
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania użytkowników', details: error.message });
    }
  }
// Też nie działa..... 
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
      }
      res.json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ error: 'Wystąpił błąd podczas aktualizacji użytkownika', details: error.message });
    }
  }

//Działa
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
      }
      res.json({ message: 'Użytkownik został usunięty' });
    } catch (error: any) {
      res.status(500).json({ error: 'Wystąpił błąd podczas usuwania użytkownika', details: error.message });
    }
  }
}

export default new UserController();