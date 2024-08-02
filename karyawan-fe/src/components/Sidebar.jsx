/** @format */

import React from 'react';

const Sidebar = () => {
  return (
    <div className='col-md-2 bg-dark text-white min-vh-100'>
      <h3 className='p-3'>Human Resource</h3>
      <ul className='nav flex-column'>
        <li className='nav-item'>
          <a className='nav-link text-white' href='#'>
            Dashboard
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link text-white' href='#'>
            Karyawan
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
