import React, { useState } from 'react';
import '../styles/Navigation.scss';
import Calendar from 'react-calendar';
import '../styles/Calendar.scss';

function Navigation() {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleCalendarClick = () => {
    setShowCalendar(true);
  };

  return (
    <div>
      <div className="Navigation">
        <div className="Navigation-item" onClick={handleCalendarClick}>
          Kalendarz
        </div>
        <div className="Navigation-item">Lista klientów</div>
        <div className="Navigation-item">Zaopatrzenie</div>
        <div className="Navigation-item">Voucher</div>
        <div className="Navigation-item">Zabiegi</div>
      </div>

      {showCalendar && <Calendar />} 
    </div>
  );
}

export default Navigation;
