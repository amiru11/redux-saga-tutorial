import React from 'react';
import logo from './logo.svg';
import './App.css';

import Counter from 'Counter';
import Todos from 'Todos';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <Todos />
      </header>
    </div>
  );
}

export default App;
