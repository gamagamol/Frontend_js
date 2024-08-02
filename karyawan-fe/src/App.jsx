/** @format */

import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Page from './page/karyawan';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeCreatePage from './page/karyawan/create';
import EmployeeIndexPage from './page/karyawan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/karyawan' element={<EmployeeIndexPage />} />
        <Route path='/karyawan/create' element={<EmployeeCreatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
