/** @format */

import React from 'react';
import KaryawanPage from './karyawanPage';
// import Sidebar from '../components/sidebar';
const MainLayout = () => {
  return (
    <div className='container'>
      <div className='row'>
        {/* <Sidebar /> */}
        <KaryawanPage />
      </div>
    </div>
  );
};

export default MainLayout;
