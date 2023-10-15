import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.scss';

interface AuthProps {
  onLogin: (token: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');
  const [isRotating, setIsRotating] = useState(false);

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
        const response = await axios.post('http://127.0.0.1:5001/api/register', {
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
        const response = await axios.post('http://127.0.0.1:5001/api/login', {
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
  }

  const handleToggle = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRegistering(!isRegistering);
      setIsRotating(false);
    }, 800);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={`${styles.circleCard} ${isRotating ? styles.rotating : ''}`}>
        <div className={styles.logoLinkContainer}>
          <a href="/" className={styles.logoLink}>
            <img src="https://i.ibb.co/zFt6TKN/logo-color-preview-rev-1.png" alt="Company Logo" className={styles.logoImage} />
          </a>
        </div>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className="form-group">
            <label htmlFor="username" className={styles.inputLabel}>
              Nazwa użytkownika:
            </label>
            <input
              type="text"
              id="username"
              className={`form-control ${styles.textInput}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className={styles.inputLabel}>
              Hasło:
            </label>
            <input
              type="password"
              id="password"
              className={`form-control ${styles.passwordInput}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <input type="submit" className={`btn ${styles.submitButton}`} value={isRegistering ? 'Zarejestruj' : 'Zaloguj'} />
          <button
            type="button"
            className={`btn ${styles.toggleButton}`}
            onClick={handleToggle}
          >
            {isRegistering ? 'Przejdź do logowania' : 'Przejdź do rejestracji'}
          </button>
        </form>
        {message && <p className={styles.errorMessage}>{message}</p>}
      </div>
    </div>
  );
};

export default Auth;

