/** @format */

import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className='sidebar bg-dark text-light' style={{ width: '250px', padding: '20px' }}>
      <h6 className='mb-4'>
        <i className='bi bi-person-circle me-2'></i>
        Human Resource
      </h6>
      <Nav className='flex-column'>
        <Nav.Item>
          <Nav.Link as={Link} to='/dashboard' className='text-light'>
            <i className='bi bi-speedometer2 me-2'></i>
            Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/karyawan' className='text-light'>
            <i className='bi bi-people me-2'></i>
            Karyawan
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Sidebar;
