import React from 'react'
import Card from 'react-bootstrap/Card';
import {data }from './DeliveryData'
import DeliveryTable from './DeliveryTable'
import Table from '../../../../Components/tables/Table';

function TargetSchedule(props) {
  return (
    <Table cols={DeliveryTable(()=>{})} data={props.data} striped/>
  )
}

export default TargetSchedule
