import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.scss';

interface AuthProps {
  onLogin: (token: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isRegistering) {
        const response = await axios.post('http://127.0.0.1:5000/api/register', {
          username,
          password,
        });

        if (response.status === 201) {
          setMessage('Rejestracja udana. Możesz teraz się zalogować.');
        } else if (response.status === 400 && response.data.message === 'User already exists') {
          setMessage('Użytkownik o takiej nazwie już istnieje.');
        } else {
          setMessage('Błąd podczas rejestracji. Spróbuj ponownie.');
        }
      } else {
        const response = await axios.post('http://127.0.0.1:5000/api/login', {
          username,
          password,
        });

        if (response.status === 200) {
          onLogin(response.data.token);
          navigate('/client-list');
        } else {
          setMessage('Błąd uwierzytelniania. Sprawdź dane logowania.');
        }
      }
    } catch (error: any) {
      console.error('Authentication error:', error.message);
      setMessage('Błąd uwierzytelniania !');
    }
  };

  return (
    <div id="login">
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="input formLabel">
            Nazwa użytkownika:
          </label>
          <input
            type="text"
            id="username"
            className="input formControl"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="input formLabel">
            Hasło:
          </label>
          <input
            type="password"
            id="password"
            className="input formControl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <input type="submit" className="input input[type='submit']" value={isRegistering ? 'Zarejestruj' : 'Zaloguj'} />
        <button
          type="button"
          className="input input[type='submit'] input[type='submit']:hover"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? 'Przejdź do logowania' : 'Przejdź do rejestracji'}
        </button>
      </form>
      {message && <p className="spacer message">{message}</p>}
    </div>
  );
};

export default Auth;
