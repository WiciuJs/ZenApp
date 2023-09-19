import React, { useState } from 'react';
import axios from 'axios';

interface User {
    _id: string;
    name: string;
    surname: string;
    age: number;
    comments: string;
    mail: string;
    phoneNumber: string;
  }

interface UserFormProps {
  onUserAdded: (newUser: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onUserAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    age: '',
    comments: '',
    mail: '',
    phoneNumber: '',
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCommentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:5000/api/users', formData)
      .then((response) => {
        console.log('Nowy użytkownik został dodany:', response.data);
        setSuccessMessage('Nowy użytkownik został dodany.');
        setErrorMessage(null);
        onUserAdded(response.data); 
        clearForm();
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
    <div>
      <h2>Dodaj nowego użytkownika</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Imię:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="surname">Nazwisko:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Wiek:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="comments">Komentarze:</label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleCommentsChange}
          />
        </div>
        <div>
          <label htmlFor="mail">E-mail:</label>
          <input
            type="email"
            id="mail"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Numer telefonu:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Dodaj użytkownika</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
