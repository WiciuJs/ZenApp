import React, { useEffect, useState } from 'react';

interface Treatment {
  _id: string;
  massage: string;
  price: number;
  time: string;
}

const TreatmentList: React.FC = () => {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [error, setError] = useState<string | null>(null);

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
        setError('Nie można załadowac danych');
      }
    };

    fetchTreatments();
  }, []);

  return (
    <div>
      <ul>
        {treatments.map(treatment => (
          <li key={treatment._id}>
            {treatment.massage} - {treatment.price} zł - {treatment.time}
          </li>
        ))}
      </ul>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default TreatmentList;
