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

export const POItemsTable = (showFormHandler,handleEdit,actions) => {
  
  return [
    {
      title: 'Item Name',
      align:'center',
      render: rowData => {
        return (
        <> 
        {rowData.specs === "" ? <span>{rowData.material.materialName}</span> 
    : <span>{rowData.material.materialName}({rowData.specs})</span>
          } 
          </>
      
      )
      }
    },
  {
      title: 'Specs',
      align:'center',
      render: rowData => {
        return <FiEdit style={{cursor:"pointer"}} onClick={showFormHandler(rowData,"EditEntry")}></FiEdit>
      },
    },{
      title: 'Due Date',
      align:'center',
      render: rowData => {
        return <span>{rowData.dueDate}</span>;
      
      },
    },
    {
      title: 'Unit Price',
      align:'center',
      render: rowData => {
        let nameRow = `unitPrice${rowData.purchaseRequestId}`
        return  (
      <Form.Group key="producedQty">
        <Form.Control
          type="text"
          id={nameRow}
          name={nameRow}
          defaultValue={rowData.unitPrice}
          onBlur={(e) => handleEdit("unitPrice", e.target.value, rowData)}
        ></Form.Control>
      </Form.Group>
      )
      }
    },
    {
      title: 'Quantity',
      align:'center',
      render: rowData => {
        let nameRow = `qty${rowData.purchaseRequestId}`
        return  (
          <span>
      {
        rowData.requests ==1 ? 
      <Form.Group key="producedQty">
        <Form.Control
          type="text"
          id={nameRow}
          name={nameRow}
          defaultValue={rowData.poQty}
          onBlur={(e) => handleEdit("qty", e.target.value, rowData)}
        ></Form.Control>
      </Form.Group> :
      <span
      style={{ cursor: "pointer", color: "blue" }}
      onClick={showFormHandler(rowData, "FurnanceForm")}
    >{rowData.poQty}
    </span>
    }
    </span>
      )
      },
    },{
      title: 'Uom',
      align:'center',
      render: rowData => {
        return <span>{rowData.material.uom}</span>;
      
      },
    },
    {
      title: 'Gst Perc',
      align:'center',
      render: rowData => {
        let nameRow = `gst${rowData.purchaseRequestId}`
        return  (
          <span>{rowData.gst}</span>
      )
      }
      
    },{
      title: 'Gst',
      align:'center',
      render: rowData => {
        return (<span>{rowData.gstAmt}</span>);
      },
    },
    {
      title: 'Amount',
      align:'center',
      render: rowData => {
        return (
        <span>{rowData.amount}</span>);
      },
    },
    
    {
        title: 'Remove',
        align:'center',
        render: rowData => {
          return <FiTrash2 style={{cursor:"pointer"}} onClick={showFormHandler(rowData, "delete")}></FiTrash2>
        },
      }
  ]
};

export default POItemsTable ;