/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImportModal from '../../components/ImportModal';
import KaryawanTable from '../../components/KaryawanTable';
import { API_URL } from '../../utils/constant';

const DownloadExcel = async () => {
  try {
    const response = await axios.get(API_URL + '/export');
  } catch (error) {
    console.error(error);
  }
};

const EmployeeIndexPage = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/import`, formData);
      if (response.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='row'>
      <div className='col m-5'>
        <div className='card mt-3'>
          <div className='card-body'>
            <h5 className='card-title mb-4'>Data Karyawan</h5>
            <div className='d-flex justify-content-between mb-3'>
              <div>
                <button className='btn btn-primary me-2 '>
                  <Link to='/karyawan/create' className='text-white text-decoration-none'>
                    Add Karyawan
                  </Link>
                </button>
                <button className='btn btn-primary' onClick={handleShowModal}>
                  Import Excel
                </button>
              </div>
              <div>
                <button className='btn btn-primary me-2' id='btn-download' onClick={DownloadExcel}>
                  <a href='http://localhost:3000/uploads/exported-karyawan.xlsx' className='text-white text-decoration-none'>
                    Export ke Excel
                  </a>
                </button>
              </div>
            </div>
            <ImportModal show={showModal} handleClose={handleCloseModal} handleFileUpload={handleFileUpload} />

            <KaryawanTable data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeIndexPage;
