import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from '../components/CustomerForm';
import '../styles/CustomerViews.scss'; 

interface Customer {
  _id: string;
  name: string;
  surname: string;
  age: number;
  comments: string;
  mail: string;
  phoneNumber: string;
}

const CustomerListView: React.FC = () => {
  const [customer, setCustomer] = useState<Customer[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/customer')
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((error) => {
        console.error('Błąd podczas pobierania użytkowników:', error);
      });
  }, []);

  const handleUserAdded = (newCustomer: Customer) => {
    setCustomer([...customer, newCustomer]);
  };

  return (
    <div className="customer-view"> 
      <div className="customer-form"> 
        <UserForm onCustomerAdded={handleUserAdded} />
      </div>
      <div className="customer-list"> 
        <h2>Lista użytkowników</h2>
        <table>
          <thead>
            <tr>
              <th>Imię</th>
              <th>Nazwisko</th>
              <th>Wiek</th>
              <th>Komentarze</th>
              <th>E-mail</th>
              <th>Numer telefonu</th>
            </tr>
          </thead>
          <tbody>
            {customer.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.surname}</td>
                <td>{customer.age}</td>
                <td>{customer.comments}</td>
                <td>{customer.mail}</td>
                <td>{customer.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerListView;
