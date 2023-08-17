import React,{useState} from 'react'
import classes from './processview.module.css'
import SimpleCard from '../../../../UI/cards/SimpleCard'
import {Card,Row} from 'react-bootstrap'
import Table from '../../../../Components/tables/Table';
import {ProcessHistoryData} from './ProcessHistoryData'
import {ProcessHisTable} from './ProcessHisTable'

function ProcessHistory() {
  return (
    <SimpleCard title="Cutting & Fettling">
       <Row className={classes.tableCon}>
              <Table data={ProcessHistoryData} cols={ProcessHisTable()} className={classes.tableCon}  ></Table>
      </Row> 
</SimpleCard>
  )
}

export default ProcessHistory
