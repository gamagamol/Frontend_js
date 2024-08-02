/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import DeleteModal from '../../components/deleteModal';
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
  const [DataId, setId] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [showModalDelete, setShowModalDelete] = useState(false);
  const handleShowModalDelete = () => {
    setShowModalDelete(true);
  };
  const handleCloseModalDelete = () => setShowModalDelete(false);

  const handleSetId = (id) => {
    setId(id);
  };

  const handleDeleted = (statusCode) => {
    console.log(statusCode);
    if (statusCode == 200) {
      toast.success('Data karyawan berhasil di hapus!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        fetchData();
      }, 3000);
    } else {
      toast.error('Data karyawan berhasil di hapus!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

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
            <DeleteModal showModalDelete={showModalDelete} handleCloseDelete={handleCloseModalDelete} id={DataId} handleDeleted={handleDeleted} />
            <KaryawanTable data={data} handleSetId={handleSetId} handleShowModalDelete={handleShowModalDelete} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmployeeIndexPage;
