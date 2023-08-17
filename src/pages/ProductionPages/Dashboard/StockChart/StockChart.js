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
import RmChart from './RmChart';
  

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
      text: 'Line Of Balance',
    },
  },
  responsive: true,
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: false,
    },
  },
};

const labels = ['Melting', 'Cutting & Fettling', 'Visual Inspection 1', 
'Heat Treatment', 'Shot Blast', 'FPI', 'RTI','Visual Inspection 2','Machining'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Inward Stock',
      data: [48,34,22,18,18,18,18,18,18],
      backgroundColor: 'rgb(53, 162, 235)',
      stack: 'Stack 0',
    },
    {
      label: 'Outward Stock',
      data: [34,22,18,18,16,16,16,16,16,16],
      backgroundColor: 'rgb(75, 192, 192)',
      stack: 'Stack 1',
    },
    {
      label: 'WIP Stock',
      data: [14,12,4,0,2,2,2,2,2],
      backgroundColor: 'rgb(255, 99, 132)',
      stack: 'Stack 2',
    },
  ],
};

function StockChart() {
  return (
    <SimpleCard className={classes.card}>
    <Card body className={classes.title}>
       <h5>Line Of Balance Summary of BHEL's Product RT123434 With Order Quantity of 234</h5> </Card>    
    <Row className='row-eq-height'>
      <Col md={6}>
      <DonutChart></DonutChart>
      </Col>
      <Col md={6}>
      <RmChart></RmChart>
      </Col>
    </Row>
    
    <Bar options={options} data={data}/>
    </SimpleCard>
    
  )
}

export default StockChart
