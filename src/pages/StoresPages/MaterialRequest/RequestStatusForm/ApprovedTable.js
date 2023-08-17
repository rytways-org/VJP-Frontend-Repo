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

export const ApprovedTable = (handleEdit,actions,selectedColumns) => {
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
      title: `Approved Qty`,
      align:'center',
      render: rowData => {
        return <span>{rowData.approvedQty}</span>;
         
      },
    },{
      title: `Issued Qty`,
      align:'center',
      render: rowData => {
        return <span>{rowData.issuedQty}</span>;
         
      },
    },{
      title: `Status`,
      align:'center',
      render: rowData => {
        return <span>{rowData.status}</span>;
         
      },
    }
  ]
};


export default ApprovedTable