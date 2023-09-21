import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerForm from '../components/CustomerForm';
import '../styles/CustomerViews.scss';
import { faUserXmark as faSolidUserXmark, faBookmark as faDuotoneBookmark, faUserGear as faDuotoneUserGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Customer } from '../Interface/Interface';


const CustomerListView: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/customer')
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((error) => {
        console.error('Błąd podczas pobierania użytkowników:', error);
      });
  }, []);

  const handleCustomerAdded = (newCustomer: Customer) => {
    setCustomers([...customers, newCustomer]);
  };

  const handleDeleteCustomer = (customerId: string) => {
    axios.delete(`http://127.0.0.1:5000/api/customer/${customerId}`)
      .then(() => {
        setCustomers(customers.filter(customer => customer._id !== customerId));
      })
      .catch((error) => {
        console.error('Błąd podczas usuwania użytkownika:', error);
      });
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditMode(true);
  };

  const handleSaveCustomer = (updatedCustomer: Customer) => {
    axios.put(`http://127.0.0.1:5000/api/customer/${updatedCustomer._id}`, updatedCustomer)
      .then(() => {
        setCustomers(customers.map(customer =>
          customer._id === updatedCustomer._id ? updatedCustomer : customer
        ));
        setSelectedCustomer(null);
        setIsEditMode(false);
      })
      .catch((error) => {
        console.error('Błąd podczas aktualizacji użytkownika:', error);
      });
  };

  return (
    <div className="customer-view">
      <div className="customer-form">
        <CustomerForm onCustomerAdded={handleCustomerAdded} />
      </div>
      <div className="customer-list">
        <h2>Lista użytkowników</h2>
        <table>
          <thead>
            <tr>
              <th>Imię</th>
              <th>Nazwisko</th>
              <th>Wiek</th>
              <th>E-mail</th>
              <th>Numer telefonu</th>
              <th>Komentarze</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.surname}</td>
                <td>{customer.age}</td>
                <td>{customer.mail}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.comments}</td>
                <td>
                  <button className="neon-button-action-edit" onClick={() => handleEditCustomer(customer)}>
                    <FontAwesomeIcon icon={faDuotoneUserGear} />
                  </button>
                  <button className="neon-button-action-delete" onClick={() => handleDeleteCustomer(customer._id)}>
                    <FontAwesomeIcon icon={faSolidUserXmark} />
                  </button>
                  <button className="neon-button-action" onClick={() => handleSaveCustomer(customer)}>
                    <FontAwesomeIcon icon={faDuotoneBookmark} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isEditMode && selectedCustomer && (
          <div className="edit-form">
            <h3>Edytuj użytkownika</h3>
            <CustomerForm
              onCustomerAdded={handleSaveCustomer}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerListView;
