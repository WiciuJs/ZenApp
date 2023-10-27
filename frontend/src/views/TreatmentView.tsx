import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/TreatmentView.module.scss';

type Treatment = {
  _id: string;
  massage: string;
  price: number;
  time: string;
};

const TreatmentView: React.FC = () => {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [newTreatment, setNewTreatment] = useState<Treatment>({
    _id: '',
    massage: '',
    price: 0,
    time: '',
  });
  const [editData, setEditData] = useState<Treatment | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5001/api/treatments');
        if (!response.ok) {
          throw new Error('Failed to fetch treatments');
        }
        const data = await response.json();
        setTreatments(data);
      } catch (error) {
        console.error('Error:', error);
        setError('Nie można załadować danych');
      }
    };

    fetchTreatments();
  }, []);

  const fetchTreatments = async () => {
    try {
      const response = await fetch('/api/treatments');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTreatments(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Coś poszło nie tak...');
    }
  };

  const handleNewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/treatments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTreatment),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setNewTreatment({ _id: '', massage: '', price: 0, time: '' });
      fetchTreatments();
    } catch (error) {
      console.error('Error:', error);
      setError('Coś poszło nie tak...');
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editData) {
      try {
        const response = await fetch(`/api/treatments/${editData._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editData),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setEditData(null);
        fetchTreatments();
      } catch (error) {
        console.error('Error:', error);
        setError('Coś poszło nie tak...');
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/treatments/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchTreatments();
    } catch (error) {
      console.error('Error:', error);
      setError('Coś poszło nie tak...');
    }
  };

  return (
    <div className={styles.registrationList}>
      <h2>Zabiegi</h2>
      <div className={styles.editRegistrationContainer}>
        <h3>Nowy zabieg</h3>
        <form onSubmit={handleNewSubmit}>
          <label>
            Rodzaj Masażu :
            <input
              type="text"
              value={newTreatment.massage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewTreatment({ ...newTreatment, massage: e.target.value })
              }
            />
          </label>
          <label>
            Cena :
            <input
              type="number"
              value={newTreatment.price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewTreatment({ ...newTreatment, price: Number(e.target.value) })
              }
            />
          </label>
          <label>
            Czas Trwania :
            <input
              type="text"
              value={newTreatment.time}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewTreatment({ ...newTreatment, time: e.target.value })
              }
            />
          </label>
          <button type="submit">Dodaj</button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>Rodzaj Masażu</th>
            <th>Cena</th>
            <th>Czas Trwania</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {treatments.map((treatment) => (
            <tr key={treatment._id}>
              {editData && editData._id === treatment._id ? (
                <tr key={treatment._id}>
                  <td>
                    <input
                      type="text"
                      value={editData.massage}
                      onChange={(e) =>
                        setEditData({ ...editData, massage: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editData.price}
                      onChange={(e) =>
                        setEditData({ ...editData, price: Number(e.target.value) })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editData.time}
                      onChange={(e) =>
                        setEditData({ ...editData, time: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <button onClick={handleEditSubmit}>Zapisz</button>
                    <button onClick={() => setEditData(null)}>Anuluj</button>
                  </td>
                </tr>
              ) : (
                <>
                  <td>{treatment.massage}</td>
                  <td>{treatment.price}</td>
                  <td>{treatment.time}</td>
                  <td>
                    <button onClick={() => setEditData(treatment)}>
                      <FontAwesomeIcon icon={faFilePen} />
                    </button>
                    <button onClick={() => handleDelete(treatment._id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {error && <p>{error}</p>}
    </div>
  );
};

export default TreatmentView;
