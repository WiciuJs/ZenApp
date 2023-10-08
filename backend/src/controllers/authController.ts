import { Request, Response } from 'express'; 
import User from '../models/User';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class AuthController {
  async register(req: Request, res: Response) { 
    try {
      const { username, password } = req.body;
  
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Użytkownik o tej nazwie już istnieje' });
      }
  
      const newUser = new User({ username, password });
      await newUser.save();
  
      res.status(201).json({ message: 'Rejestracja udana' });
    } catch (error) {
      console.error('Błąd rejestracji:', error); 
      res.status(500).json({ message: 'Wystąpił błąd podczas rejestracji' });
    }
  }
  async login(req: Request, res: Response) { 
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json({ message: 'Nieprawidłowe dane logowania' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Nieprawidłowe dane logowania' });
      }

      const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });

      res.json({ message: 'Logowanie udane', token });
    } catch (error) {
      res.status(500).json({ message: 'Wystąpił błąd podczas logowania' });
    }
  }
}

module.exports = new AuthController();
