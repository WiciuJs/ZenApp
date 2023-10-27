import React from 'react';
import AddTreatment from '../components/AddTreatment';
import TreatmentList from '../components/TreatmentList';

const TreatmentView: React.FC = () => {
  return (
    <div>
      <h1>Zabiegi</h1>
      <AddTreatment />
      <TreatmentList />
    </div>
  );
};

export default TreatmentView;
