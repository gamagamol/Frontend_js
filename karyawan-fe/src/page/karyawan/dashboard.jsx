/** @format */

import axios from 'axios';
import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { API_URL } from '../../utils/constant';

// Register the necessary elements for the Pie chart
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + '/dashboard');
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Container className='mt-5 text-center'>
        <Spinner animation='border' />
      </Container>
    );
  }

  if (!data) {
    return (
      <Container className='mt-5 text-center'>
        <p>Data tidak tersedia</p>
      </Container>
    );
  }

  let labels = [];
  let data_labels = [];
  data.AgregatDepartment.map((d) => {
    labels.push(d.department);
    data_labels.push(d.jumlah);
  });

  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

  const pieData = {
    labels: labels,
    datasets: [
      {
        label: 'Jumlah',
        data: data_labels,
        backgroundColor:colors,
        hoverBackgroundColor:colors,
      },
    ],
  };


  return (
    <Container className='mt-5'>
      <Row>
        <Col>
          <Card>
            <Card.Body className='text-center'>
              <Card.Title className='text-secondary'>Total Karyawan</Card.Title>
              <Card.Text>3</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body className='text-center'>
              <Card.Title className='text-primary'>Kontrak</Card.Title>
              <Card.Text>1</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body className='text-center'>
              <Card.Title className='text-warning'>Probation</Card.Title>
              <Card.Text>{data.AgregatStatus[2].jumlah}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6} className='mt-2'>
          <Card>
            <Card.Body>
              <Pie data={pieData}  />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
