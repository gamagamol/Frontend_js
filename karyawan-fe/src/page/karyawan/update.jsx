/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../../utils/constant';
const checkUrl = (url) => {
  const regex = /^http|https/;

  const match = url.match(regex);

  if (!match) {
    return `http://localhost:3000/uploads/${url}`;
  } else {
    return url;
  }
};

const EmployeeUpdatePage = () => {
  const { id } = useParams();

  const [previewFoto, setPreviewFoto] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      foto: null,
    },
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL + `/${id}`);
      setValue('nama', response.data.nama);
      setValue('nomor', response.data.nomor);
      setValue('jabatan', response.data.jabatan);
      setValue('department', response.data.department);
      setValue('status', response.data.status);
      setPreviewFoto(checkUrl(response.data.foto));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (data[key] != null) {
          formData.append(key, data[key]);
        }
      }

      const response = await axios.patch(API_URL+`/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Data karyawan berhasil di updated!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        window.location.href = '/karyawan';
      }, 3000);
    } catch (error) {
      console.error('Error:', error); // This is for debugging

      let errorMessage = 'Terjadi kesalahan. Silakan coba lagi.';
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || error.response.data;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    setValue('foto', file, { shouldValidate: true });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFoto(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewFoto(null);
    }
  };

  return (
    <Container className='mt-5'>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className='mb-4'>Form Input Karyawan</Card.Title>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={6}>
                    <Form.Group className='mb-3' controlId='nama'>
                      <Form.Label>Nama Karyawan</Form.Label>
                      <Form.Control type='text' placeholder='Nama Karyawan' {...register('nama', { required: 'Nama Karyawan wajib diisi' })} isInvalid={!!errors.nama} />
                      <Form.Control.Feedback type='invalid'>{errors.nama?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='nomor'>
                      <Form.Label>Nomor Karyawan</Form.Label>
                      <Form.Control type='text' placeholder='Nomor Karyawan' {...register('nomor', { required: 'Nomor Karyawan wajib diisi' })} isInvalid={!!errors.nomor} />
                      <Form.Control.Feedback type='invalid'>{errors.nomor?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='jabatan'>
                      <Form.Label>Jabatan</Form.Label>
                      <Form.Control type='text' placeholder='Jabatan' {...register('jabatan', { required: 'Jabatan wajib diisi' })} isInvalid={!!errors.jabatan} />
                      <Form.Control.Feedback type='invalid'>{errors.jabatan?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='department'>
                      <Form.Label>Departemen</Form.Label>
                      <Form.Select {...register('department', { required: 'Departemen wajib dipilih' })} isInvalid={!!errors.department}>
                        <option value=''>Pilih Departemen</option>
                        <option value='Marketing'>Marketing</option>
                        <option value='Tech'>Tech</option>
                        <option value='HR'>HR</option>
                        <option value='Customer Service'>Customer Service</option>
                        <option value='Finance'>Finance</option>
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>{errors.department?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='status'>
                      <Form.Label>Status</Form.Label>
                      <Form.Select {...register('status', { required: 'Status wajib dipilih' })} isInvalid={!!errors.status}>
                        <option value=''>Pilih Status</option>
                        <option value='PERMANENT'>PERMANENT</option>
                        <option value='CONTRACT'>CONTRACT</option>
                        <option value='PROBATION'>PROBATION</option>
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>{errors.status?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className='mb-3' controlId='foto'>
                      <Form.Label>Foto</Form.Label>
                      <Form.Control type='file' onChange={handleFileChange} />
                      <Form.Control.Feedback type='invalid'>{errors.foto?.message}</Form.Control.Feedback>
                    </Form.Group>
                    <div className='d-flex justify-content-center'>
                      <img
                        src={previewFoto || 'https://via.placeholder.com/150'}
                        alt='Profile'
                        className='img-fluid'
                        style={{
                          maxWidth: '150px',
                          maxHeight: '150px',
                          objectFit: 'cover',
                        }}
                        id='profile-picture'
                      />
                    </div>
                  </Col>
                </Row>
                <div className='d-flex justify-content-start mt-4'>
                  <Button variant='primary' type='submit' className='me-2'>
                    Submit
                  </Button>
                  <Link to='/karyawan' className='btn btn-danger text-white text-decoration-none'>
                    Cancel
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default EmployeeUpdatePage;
