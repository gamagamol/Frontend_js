/** @format */

import axios from 'axios';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { API_URL } from '../utils/constant';

const DeleteModal = ({ showModalDelete, handleCloseDelete, id, handleDeleted }) => {
  const handleSubmit = async () => {
    const response = await axios.delete(API_URL + `/${id}`);
    handleDeleted(response.status);
    handleCloseDelete();
  };
  return (
    <Modal show={showModalDelete}>
      <Modal.Header closeButton>
        <Modal.Title>Import Excel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Your Data Will Be Deleted</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleCloseDelete}>
          Close
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          Save Changes
        </Button>
        <ToastContainer />
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
