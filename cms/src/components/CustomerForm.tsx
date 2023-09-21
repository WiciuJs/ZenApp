import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../styles/CustomerForm.scss';
import { CustomerFormProps } from '../Interface/Interface';

Modal.setAppElement('#root');

const CustomerForm: React.FC<CustomerFormProps> = ({ onCustomerAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    age: '',
    comments: '',
    mail: '',
    phoneNumber: '',
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    clearForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post('http://127.0.0.1:5000/api/customer', formData)
      .then((response) => {
        console.log('Nowy użytkownik został dodany:', response.data);
        setSuccessMessage('Nowy użytkownik został dodany.');
        setErrorMessage(null);
        onCustomerAdded(response.data.customer);
        closeModal();
      })
      .catch((error) => {
        console.error('Błąd podczas dodawania użytkownika:', error);
        setErrorMessage('Wystąpił błąd podczas dodawania użytkownika.');
        setSuccessMessage(null);
      });
  };

  const clearForm = () => {
    setFormData({
      name: '',
      surname: '',
      age: '',
      comments: '',
      mail: '',
      phoneNumber: '',
    });
  };

  return (
    <div className="customer-form">
      <button onClick={openModal} className="neon-button">
        Dodaj nowego użytkownika
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Dodaj nowego użytkownika"
        className="modal"
        style={{ overlay: { backgroundColor: 'white' } }}
      >
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="name">Imię:</label>
            <div className="border"></div>
          </div>
          <div className="input-block">
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
            <label htmlFor="surname">Nazwisko:</label>
            <div className="border"></div>
          </div>
          <div className="input-block">
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            <label htmlFor="age">Wiek:</label>
            <div className="border"></div>
          </div>
          <div className="input-block">
            <input
              type="email"
              id="mail"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              required
            />
            <label htmlFor="mail">E-mail:</label>
            <div className="border"></div>
          </div>
          <div className="input-block">
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <label htmlFor="phoneNumber">Numer telefonu:</label>
            <div className="border"></div>
          </div>
          <div className="textarea-block">
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
            />
            <label htmlFor="comments">Komentarze:</label>
            <div className="border"></div>
          </div>
          <div>
            <button type="submit" className="neon-button">
              Dodaj użytkownika
            </button>
            <button onClick={closeModal} className="neon-button cancel">
              Anuluj
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CustomerForm;