import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { CustomerFormProps } from '../Interface/Interface';
import styles from '../styles/CustomerForm.module.scss';
Modal.setAppElement('#root');

const CustomerForm: React.FC<CustomerFormProps> = ({ onCustomerAdded, customerToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    age: '',
    comments: '',
    mail: '',
    phoneNumber: '',
  });

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

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isAgeValid = (age: number) => age >= 0 && age <= 100;

  useEffect(() => {
    if (customerToEdit) {
      setFormData({
        name: customerToEdit.name,
        surname: customerToEdit.surname,
        age: customerToEdit.age.toString(),
        comments: customerToEdit.comments,
        mail: customerToEdit.mail,
        phoneNumber: customerToEdit.phoneNumber,
      });
    }
  }, [customerToEdit]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    clearForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'age') {
      if (isAgeValid(parseInt(value)) || value === "") {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgeValid(parseInt(formData.age))) {
      setErrorMessage('Wprowadź poprawny wiek (0-100)');
      setSuccessMessage(null);
    } else {
      const dataToSend = { ...formData };

      if (customerToEdit) {
        axios
          .put(`http://127.0.0.1:5001/api/customer/${customerToEdit._id}`, dataToSend)
          .then((response) => {
            console.log('Klient został zaktualizowany:', response.data);
            setSuccessMessage('Klient został zaktualizowany.');
            setErrorMessage(null);
            onCustomerAdded();
            closeModal();

          })
          .catch((error) => {
            console.error('Błąd podczas aktualizacji klienta:', error);
            setErrorMessage('Wystąpił błąd podczas aktualizacji klienta.');
            setSuccessMessage(null);
          });
      } else {
        axios
          .post('http://127.0.0.1:5001/api/customer', dataToSend)
          .then((response) => {
            console.log('Nowy użytkownik został dodany:', response.data);
            setSuccessMessage('Nowy użytkownik został dodany.');
            setErrorMessage(null);
            onCustomerAdded();
            closeModal();
          })
          .catch((error) => {
            console.error('Błąd podczas dodawania użytkownika:', error);
            setErrorMessage('Wystąpił błąd podczas dodawania użytkownika.');
            setSuccessMessage(null);
          });
      }
    }
  };

  return (
    <>
      <div className={styles.addButtonContainer}>
        <button onClick={openModal} className={styles.addButton}>
          {customerToEdit ? 'Edytuj klienta' : 'Dodaj nowego użytkownika'}
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName={styles.modalOverlay}
        className={styles.modalContent}
      >
        <div className={styles.customerForm}>
          {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
          {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputBlock}>
              <label htmlFor="name" className={styles.label}>Imię:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputBlock}>
              <label htmlFor="surname" className={styles.label}>Nazwisko:</label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputBlock}>
              <label htmlFor="age" className={styles.label}>Wiek:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputBlock}>
              <label htmlFor="email" className={styles.label}>E-mail:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.mail}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputBlock}>
              <label htmlFor="phoneNumber" className={styles.label}>Numer telefonu:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputBlock}>
              <label htmlFor="comments" className={styles.label}>Komentarze:</label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                className={styles.textarea}
              />
            </div>
            <div className={styles.actions}>
              <button type="submit" className={styles.neonButton}>
                {customerToEdit ? 'Zaktualizuj klienta' : 'Dodaj klienta'}
              </button>
              <button type="button" onClick={closeModal} className={styles.cancelButton}>
                Anuluj
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CustomerForm;