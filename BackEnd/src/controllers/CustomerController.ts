import { Request, Response } from 'express';
import Customer from '../models/CustomersModel';
//Działa
class CustomerController {
  async create(req: Request, res: Response) {
    try {
      const { name, surname, age, comments, mail, phoneNumber } = req.body;
      const newCustomer = new Customer({
        name,
        surname,
        age,
        comments,
        mail,
        phoneNumber,
        registrations: [],
      });
      await newCustomer.save();
      return res.status(201).json({ message: 'Nowy użytkownik został utworzony', customer: newCustomer });
    } catch (error: any) {
      res.status(500).json({ error: 'Wystąpił błąd podczas tworzenia użytkownika', details: error.message });
    }
  }

  async getAllCustomers(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (id) {
        const customer = await Customer.findById(id);
        if (!customer) {
          return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
        }
        res.json(customer);
      } else {
        const customer = await Customer.find();
        res.json(customer);
      }
    } catch (error: any) {
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania użytkowników', details: error.message });
    }
  }
// Też nie działa..... 
  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedCustomer) {
        return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
      }
      res.json(updatedCustomer);
    } catch (error: any) {
      res.status(500).json({ error: 'Wystąpił błąd podczas aktualizacji użytkownika', details: error.message });
    }
  }

//Działa
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedCustomer = await Customer.findByIdAndDelete(id);
      if (!deletedCustomer) {
        return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
      }
      res.json({ message: 'Użytkownik został usunięty' });
    } catch (error: any) {
      res.status(500).json({ error: 'Wystąpił błąd podczas usuwania użytkownika', details: error.message });
    }
  }
}

export default new CustomerController();