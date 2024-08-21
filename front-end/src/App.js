import './App.css';

import React, { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';
import CustomerPage from './pages/CustomerPage';

function App() {
  return (
    <div className="App">
      <CustomerPage />
    </div>
  );
}

export default App;
