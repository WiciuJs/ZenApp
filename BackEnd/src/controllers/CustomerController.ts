import { Request, Response } from 'express';
import Customer from '../models/CustomersModel';
class CustomerController {
  async create(req: Request, res: Response) {
    try {
      const { name, surname, age, comments, mail, phoneNumber } = req.body;

      if (age < 0 || age > 100) {
        return res.status(400).json({ error: 'Błedny Wiek' });
      }
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
          return res.status(404).json({ error: "Użytkownik nie znaleziony" });
        }
        res.json(customer);
      } else {
        const page = parseInt(req.query.page as string) || 1;
        const perPage = 10;

        const customers = await Customer.find({})
          .skip((page - 1) * perPage)
          .limit(perPage)
          .sort({ createdAt: -1 });

        const totalCustomers = await Customer.countDocuments();

        return res.status(200).json({
          customers,
          totalPages: Math.ceil(totalCustomers / perPage),
          currentPage: page,
        });
      }
    } catch (error: any) {
      res.status(500).json({
        error: "Wystąpił błąd podczas pobierania użytkowników",
        details: error.message,
      });
    }
  }
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
  async searchCustomer(req: Request, res: Response) {
    try {
      const searchTerm = req.query.searchTerm as string;
      const page = parseInt(req.query.page as string) || 1;
      const perPage = 10;
  
      const query = {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } }, 
          { surname: { $regex: searchTerm, $options: 'i' } }, 
          { phoneNumber: { $regex: searchTerm, $options: 'i' } }, 
          { mail: { $regex: searchTerm, $options: 'i' } }, 
        ],
      };
  
      const customers = await Customer.find(query)
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
  
      const totalCustomers = await Customer.countDocuments(query);
  
      return res.status(200).json({
        customers,
        totalPages: Math.ceil(totalCustomers / perPage),
        currentPage: page,
      });
    } catch (error: any) {
      res.status(500).json({
        error: 'Wystąpił błąd podczas wyszukiwania użytkowników',
        details: error.message,
      });
    }
  }
}

export default new CustomerController();