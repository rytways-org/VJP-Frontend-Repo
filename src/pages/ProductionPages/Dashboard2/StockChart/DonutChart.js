import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {Col,Row} from 'react-bootstrap'
import classes from './charts.module.css'

ChartJS.register(ArcElement, Tooltip, Legend);


export const options = {
    plugins: {
      title: {
        display: true,
        text: 'Order History',
      },
    },
    responsive: true,
    interaction: {
      intersect: false,
    },
  };

export const data = {
  labels: ['Order Quantity', 'Dispatch Quantity', 'WIP Quantity'],
  datasets: [
    {
      label: 'Order History',
      data: [1240, 740, 500],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
       
      ],
      borderWidth: 1,
    },
  ],
};
function DonutChart() {
  return (
      <Row className="d-flex justify-content-center">
    <Col md={8}>
      <Doughnut options={options} data={data} className={classes.donot}/>
    </Col>
    </Row>
  )
}

export default DonutChart
