/** @format */

import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Pastikan path ini benar
import EmployeeIndexPage from './page/karyawan';
import EmployeeCreatePage from './page/karyawan/create';
import Dashboard from './page/karyawan/dashboard';
import EmployeeUpdatePage from './page/karyawan/update';

function App() {
  return (
    <Router>
      <div className='d-flex'>
        <Sidebar />
        <div className='main-content flex-grow-1'>
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/karyawan' element={<EmployeeIndexPage />} />
            <Route path='/karyawan/create' element={<EmployeeCreatePage />} />
            <Route path='/karyawan/update/:id' element={<EmployeeUpdatePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
