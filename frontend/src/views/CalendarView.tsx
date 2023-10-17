import React, { useEffect, useState } from "react";
import MyCalendar from "../components/MyCalendar";
import { Event } from "react-big-calendar";
import { Registration } from "../Interface/Interface";
import dayjs from "dayjs";
import styles from '../styles/CalendarView.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGear as faDuotoneUserGear, faUserTimes as faSolidUserXmark } from '@fortawesome/free-solid-svg-icons';

const CalendarView = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([]);
  const [editedRegistration, setEditedRegistration] = useState<Registration | null>(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/registrations")
      .then((res) => res.json())
      .then((data) => {
        setRegistrations(data);
        setCalendarEvents(
          data.map((registration: Registration) => ({
            title: registration.name,
            start: new Date(registration.startDate),
            end: new Date(registration.endDate),
          }))
        );
      });
  }, []);

  const handleEdit = (registration: Registration) => {
    setEditedRegistration(registration);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Czy na pewno chcesz usunąć tę rejestrację?")) {
      fetch(`http://localhost:5001/api/registrations/${id}`, {
        method: 'DELETE',
      }).then(() => {
        setRegistrations(prev => prev.filter(reg => reg._id !== id));
      });
    }
  };

  const handleEditSubmit = () => {
    if (editedRegistration) {
      fetch(`http://localhost:5001/api/registrations/${editedRegistration._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedRegistration)
      }).then(() => {
        setRegistrations(prev => prev.map(reg => reg._id === editedRegistration._id ? editedRegistration : reg));
        setEditedRegistration(null);
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.calendarWrapper}>
        <MyCalendar events={calendarEvents} />
      </div>
      <div className={styles.registrationList}>
        <h2>Lista zarejestrowanych zabiegów:</h2>
        <table>
          <thead>
            <tr>
              <th>Imię</th>
              <th>Nazwisko</th>
              <th>Zabieg</th>
              <th>Data Rozpoczęcia</th>
              <th>Data Zakończenia</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration) => (
              <tr key={registration._id}>
                <td>{registration.customer.name}</td>
                <td>{registration.customer.surname}</td>
                <td>{registration.name}</td>
                <td>{dayjs(registration.startDate).format('DD.MM.YYYY - HH:mm')}</td>
                <td>{dayjs(registration.endDate).format('HH:mm')}</td>
                <td>
                  <button onClick={() => handleEdit(registration)}>
                    <FontAwesomeIcon icon={faDuotoneUserGear} />
                  </button>
                  <button style={{ color: "red" }} onClick={() => handleDelete(registration._id)}>
                    <FontAwesomeIcon icon={faSolidUserXmark} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editedRegistration && (
          <div>
            <h3>Edytuj rejestrację</h3>
            <label>
              Data Rozpoczęcia:
              <input
                type="datetime-local"
                value={dayjs(editedRegistration.startDate).format('YYYY-MM-DDTHH:mm')}
                onChange={(e) => setEditedRegistration({ ...editedRegistration, startDate: e.target.value })}
              />
            </label>
            <label>
              Rodzaj zabiegu:
              <input
                type="text"
                value={editedRegistration.name}
                onChange={(e) => setEditedRegistration({ ...editedRegistration, name: e.target.value })}
              />
            </label>
            <button onClick={handleEditSubmit}>Zapisz zmiany</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarView;
