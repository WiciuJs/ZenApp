import React from 'react';
import './styles/App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
