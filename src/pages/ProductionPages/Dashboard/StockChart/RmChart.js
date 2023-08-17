import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import DonutChart from './DonutChart';
import SimpleCard from '../../../../UI/cards/SimpleCard'
import classes from './charts.module.css'
import {Card,Row,Col} from 'react-bootstrap'
  

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Raw Materials',
    },
  },
  maintainAspectRatio: false,
  responsive: true,
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ["R1234567","RQ234567","R34567QE","F34567QE","DF34567QE"];

export const data = {
  labels,
  datasets: [
    {
      label: 'Required Qty',
      data: [125,240,360,480,240],
      backgroundColor: 'rgb(255, 99, 132)',
      stack: 'Stack 0',
    },
    {
      label: 'Ordered Qty',
      data: [150,200,380,200,200],
      backgroundColor: 'rgb(75, 192, 192)',
      stack: 'Stack',
    },
    {
        label: 'Avail Qty',
        data: [300,400,302,180,140],
        backgroundColor: 'rgb(255, 206, 86)',
        stack: 'Stack',
      }
  ],
};

function RmChart() {
  return (
    <Row className="d-flex justify-content-center">
    <Col md={12}>
    <Bar options={options} data={data} className={classes.rmchart}/>
    </Col>
    </Row>
  )
}

export default RmChart
