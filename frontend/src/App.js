import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Home';
import Formpage from './pages/Form';
import Listpage from './pages/List';

function App() {
  return (
    <div className="App">
    <Router>
      
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/form' element={<Formpage/>}></Route>
        <Route path='/list' element={<Listpage/>}></Route>
      </Routes>


    </Router>
    </div>
  );
}

export default App;
