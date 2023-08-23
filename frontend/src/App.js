import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Form from './components/form'; 
import List from './components/list'; 

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Main Page</h1>
        <nav>
          <ul>
            <li>
              <Link to="/form">Form</Link>
            </li>
            <li>
              <Link to="/list">List</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/form" element={<Form />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
