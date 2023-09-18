import React, { useState } from 'react';
import '../styles/Navigation.scss';
import '../styles/Calendar.scss';
import Voucher from './Voucher';
import MyCalendar from './Calendar'; 

function Navigation() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showVoucher, setShowVoucher] = useState(false);

  const handleCalendarClick = () => {
    setShowCalendar(true);
    setShowVoucher(false); 
  };

  const handleVoucherClick = () => {
    setShowVoucher(true);
    setShowCalendar(false); 
  };

  return (
    <div>
      <div className="Navigation">
        <div className="Navigation-item" onClick={handleCalendarClick}>Kalendarz </div>
        <div className="Navigation-item">Lista klientów</div>
        <div className="Navigation-item">Zaopatrzenie</div>
        <div className="Navigation-item" onClick={handleVoucherClick}> Voucher </div>
        <div className="Navigation-item">Zabiegi</div>
      </div>

      {showCalendar && <MyCalendar />} 
      {showVoucher && <Voucher />}
    </div>
  );
}

export default Navigation;
