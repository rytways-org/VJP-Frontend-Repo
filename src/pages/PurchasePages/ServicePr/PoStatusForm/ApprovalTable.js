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

export const ApprovalTable = (handleEdit,actions,selectedColumns) => {
  return [
    {
      title: 'Material  Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.material.materialName}</span>;
      
      },
    },
    {
      title: 'Request Qty',
      align:'center',
      render: rowData => {
        return <span>{rowData.reqQty}</span>;
      },
    },
    {
      title: `Service Date`,
      align:'center',
      render: rowData => {
        return <span>{rowData.expectedDate}</span>;
         
      },
    },{
      title: `Description`,
      align:'center',
      render: rowData => {
        return <span>{rowData.specification}</span>;
         
      },
    },
    
    {
      title: "Approve Qty",
      align: "left",
      render: (rowData) => {
        let nameRow = `qty${rowData.materialRequestPRId}`;
        let qtyRow = rowData.materialQty
        return (
         <span>
         <Form.Group key="materialQty">
              <Form.Control
                type="text"
                id={nameRow}
                name={nameRow}
                defaultValue={qtyRow}
               // onChange={e => this.setState({ text: e.target.value })}
                onBlur = {e=>handleEdit("materialQty",e.target.value,rowData)}
              />
            </Form.Group>
             </span> 
        )
      },
    },
  ]
};


export default ApprovalTable