import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from '../components/UserForm';
import '../styles/UserViews.scss'; 

interface User {
  _id: string;
  name: string;
  surname: string;
  age: number;
  comments: string;
  mail: string;
  phoneNumber: string;
}

const UserListView: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error('Błąd podczas pobierania użytkowników:', error);
      });
  }, []);

  const handleUserAdded = (newUser: User) => {
    setUsers([...users, newUser]);
  };

  return (
    <div className="user-view"> 
      <div className="user-form"> 
        <UserForm onUserAdded={handleUserAdded} />
      </div>
      <div className="user-list"> 
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
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.age}</td>
                <td>{user.comments}</td>
                <td>{user.mail}</td>
                <td>{user.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListView;
