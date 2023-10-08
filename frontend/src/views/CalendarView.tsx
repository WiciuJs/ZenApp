import { useEffect, useState } from "react";
import MyCalendar from "../components/MyCalendar";
import { Event } from "react-big-calendar";
import { Registration } from "../Interface/Interface";

const CalendarView = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([]);

  const getData = () => {
    fetch("http://localhost:5000/api/registrations")
      .then((res) => res.json())
      .then((data) => {
        setRegistrations(data);
        setCalendarEvents(
          data.map((registration: Registration) => ({
            title: `${registration.name} - ${registration.customer.name} ${registration.customer.surname}`,
            start: new Date(registration.startDate),
            end: new Date(registration.endDate),
          }))
        );
      });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(calendarEvents);

  return (
    <>
      <MyCalendar events={calendarEvents} />
    </>
  );
};

export default CalendarView;
