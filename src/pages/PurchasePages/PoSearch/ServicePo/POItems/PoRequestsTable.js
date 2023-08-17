import React from 'react';
import {FiEdit,FiTrash2} from 'react-icons/fi'
import {BiRevision} from 'react-icons/bi'
import {FcApproval} from 'react-icons/fc'
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

export const PORequestsTable = (handleEdit,isDefault) => {
  
  return [
    {
      title: 'Item Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.material.materialName}</span>;
      
      },
    },{
      title: 'Request No',
      align:'center',
      render: rowData => {
        return <span>{rowData.purchaseRequest.requestNo}</span>;
      
      },
    },{
      title: 'Department',
      align:'center',
      render: rowData => {
        return <span>{rowData.purchaseRequest.department}</span>;
      
      },
    },{
      title: 'Request Person',
      align:'center',
      render: rowData => {
        return <span>{rowData.purchaseRequest.user.userName}</span>;
      
      },
    },
    {
      title: 'Quantity',
      align:'center',
      render: rowData => {
        let nameRow = `qty${rowData.materialQty}`
        return  (
          <span>
      {  <Form.Group key="producedQty">
        <Form.Control
          type="text"
          id={nameRow}
          name={nameRow}
          defaultValue={rowData.poQty}
          onBlur={(e) => handleEdit(e.target.value, rowData)}
        ></Form.Control>
      </Form.Group>
    }
    </span>
      )
      },
    },{
      title: 'Uom',
      align:'center',
      render: rowData => {
        let nameRow = `gst${rowData.purchaseRequestId}`
        return  (
          <span>{rowData.material.uom}</span>
      )
      }
    } ,{
      title: 'Gst Perc',
      align:'center',
      render: rowData => {
        let nameRow = `gst${rowData.purchaseRequestId}`
        return  (
          <span>{rowData.material.gst}</span>
      )
      }
    }      
  ]
};

export default PORequestsTable ;