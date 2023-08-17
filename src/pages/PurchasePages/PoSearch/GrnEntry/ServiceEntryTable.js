import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'
import {
    Container,
    Form,
    Button,
    Row,
    Col,
    // InputGroup,
    // FormControl
  } from "react-bootstrap";

// This is the table constant/settings which needed to render table elements

export const ServiceEntryTable = (handleEdit,actions) => {
  return [
    {
        title: 'Service Description',
        align:'center',
        render: rowData => {
          return (
          <>
          <span>{rowData.itemName}</span></>
          )
        },   
    },{
      title: 'Po Quantity',
      align:'center',
      render: rowData => {
        return (
        <>
        <span>{rowData.poQty}</span></>
        )
      },   
  },,{
    title: 'Due Date',
    align:'center',
    render: rowData => {
      return (
      <>
      <span>{rowData.dueDate}</span></>
      )
    },   
},
  {
    title: 'Receival Date',
    align:'center',
    render: rowData => {
        let nameRow = `qty${rowData.dailyPlanId}`;
        let qtyRow = rowData.receivedDate
      return (
        <span>
          {rowData.status == "Select" ? 
        <Form.Group key="plannedQty">
             <Form.Control
               type="date"
               id={nameRow}
               name={nameRow}
               defaultValue={qtyRow}
              // onChange={e => this.setState({ text: e.target.value })}
               onBlur = {e=>handleEdit(e.target.value,rowData)}
             />
           </Form.Group> : rowData.receivedDate}
            </span> 
      )
    },
  },
       
  ];
};


export default ServiceEntryTable