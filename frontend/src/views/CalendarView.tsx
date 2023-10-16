import React, { useEffect, useState } from "react";
import MyCalendar from "../components/MyCalendar";
import { Event } from "react-big-calendar";
import {
  Customer,
  RegistrationFormData,
  Registration,
} from "../Interface/Interface";
import RegistrationForm from "../components/RegistrationForm";
import dayjs from "dayjs";

const CalendarView = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [isRegistrationFormOpen, setIsRegistrationFormOpen] = useState(false);

  const getData = () => {
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
  };

  useEffect(() => {
    getData();
  }, []);

  const handleOpenRegistrationForm = (customer: Customer | null) => {
    setSelectedCustomer(customer);
    setIsRegistrationFormOpen(true);
  };

  const handleCloseRegistrationForm = () => {
    setIsRegistrationFormOpen(false);
  };

  const handleRegistrationSubmit = (formData: RegistrationFormData) => {
    getData();
    handleCloseRegistrationForm();
  };

  return (
    <>
      <MyCalendar events={calendarEvents} />
      <div>
        <button onClick={() => handleOpenRegistrationForm(null)}>
          Dodaj rejestrację
        </button>
        {isRegistrationFormOpen && (
          <RegistrationForm
            onRegistrationSubmit={handleRegistrationSubmit}
            closeRegistrationModal={handleCloseRegistrationForm}
            selectedCustomer={selectedCustomer}
          />
        )}
      </div>
      <div>
        <h2>Lista zarejestrowanych zabiegów:</h2>
        <ul>
          {registrations.map((registration) => (
            <li key={registration._id}>
              {registration.customer.name} {registration.customer.surname} -{" "}
              {registration.name} - {dayjs(registration.startDate).format('DD.MM.YYYY - HH:mm')} -{" "}
              {dayjs(registration.endDate).format('HH:mm')}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CalendarView;
