import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerForm from '../components/CustomerForm';
import '../styles/CustomerViews.scss';
import { faUserXmark as faSolidUserXmark, faBookmark as faDuotoneBookmark, faUserGear as faDuotoneUserGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Customer } from '../Interface/Interface';

const CustomerListView: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [customerToEdit, setCustomerToEdit] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const customersPerPage = 10;
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;

  const filteredCustomers = customers.filter((customer) => {
    const { name, surname, phoneNumber, mail } = customer;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      name.toLowerCase().includes(lowerSearchTerm) ||
      surname.toLowerCase().includes(lowerSearchTerm) ||
      phoneNumber.toLowerCase().includes(lowerSearchTerm) ||
      mail.toLowerCase().includes(lowerSearchTerm)
    );
  });

  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
    setCustomerToEdit(customer);
    setIsEditMode(true);
  };

  const handleSaveCustomer = (updatedCustomer: Customer) => {
    axios.put(`http://127.0.0.1:5000/api/customer/${updatedCustomer._id}`, updatedCustomer)
      .then(() => {
        setCustomers(customers.map(customer =>
          customer._id === updatedCustomer._id ? updatedCustomer : customer
        ));
        setCustomerToEdit(null);
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
      <div className="container">
        <input
          type="text"
          placeholder="Wyszukaj użytkownika..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="search">
        </div>
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
            {currentCustomers.map((customer) => (
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
        {isEditMode && customerToEdit && (
          <div className="edit-form">
            <h3>Edytuj użytkownika</h3>
            <CustomerForm
              onCustomerAdded={handleSaveCustomer}
              customerToEdit={customerToEdit}
            />
          </div>
        )}
        <div className="pagination">
          <ul>
            {Array.from({ length: Math.ceil(filteredCustomers.length / customersPerPage) }).map((_, index) => (
              <li key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
                <div className="bar"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default CustomerListView;
