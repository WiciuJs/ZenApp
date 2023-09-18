import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const events = [
    {
      title: 'Wydarzenie 1',
      start: new Date(2023, 8, 4, 10, 0), 
      end: new Date(2023, 8, 4, 12, 0),
    },
    {
      title: 'Wydarzenie 2',
      start: new Date(2023, 8, 5, 14, 0),
      end: new Date(2023, 8, 5, 16, 0),
    },

  ];

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['week']} 
        defaultDate={new Date(2023, 8, 4)} 
        defaultView="week" 
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalendar;
