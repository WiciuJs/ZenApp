import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin') {
    return res.status(200).json({ message: 'Zalogowano pomyślnie' });
  } else {
    return res.status(401).json({ message: 'Nieprawidłowy login lub hasło' });
  }
};
