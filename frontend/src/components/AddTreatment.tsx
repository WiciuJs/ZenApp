import React, { useState } from 'react';

const AddTreatment: React.FC = () => {
  const [massage, setMassage] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5001/api/treatments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ massage, price: Number(price), time })
      });
      if (!response.ok) {
        throw new Error('Failed to add treatment');
      }
      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={massage} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMassage(e.target.value)} 
        placeholder="Massage" 
      />
      <input 
        type="number" 
        value={price} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} 
        placeholder="Price" 
      />
      <input 
        type="text" 
        value={time} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value)} 
        placeholder="Time" 
      />
      <button type="submit">Dodaj Zabieg</button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

export default AddTreatment;
