/** @format */

import React,{useState} from 'react';
import { Button, Modal,Form } from 'react-bootstrap';

const ImportModal = ({ show, handleClose,handleFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    handleFileUpload(selectedFile);
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Import Excel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formFile'>
            <Form.Label>Upload file Excel Anda</Form.Label>
            <Form.Control type='file' onChange={handleFileChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImportModal;
