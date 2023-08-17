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

export const ApprovalTable = (handleEdit,actions,selectedColumns,showFormHandler) => {
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
    },{
      title: 'Approved Qty',
      align:'center',
      render: rowData => {
        return <span>{rowData.approvedQty}</span>;
      },
    },
    {
      title: "Issue Qty",
      align: "left",
      render: (rowData) => {
        let nameRow = `qty${rowData.storesRequestId}`;
        let qtyRow = rowData.issuedQty
        return (
         <span>
         { rowData.issuedQty>0 ? <span
                style={{ cursor: "pointer", color: "blue" }}
                onClick={showFormHandler(rowData, "EditEntry")}
              >{rowData.issuedQty}
              </span> :
              <Form.Group key="producedQty">
                <Form.Control
                  type="text"
                  id={nameRow}
                  name={nameRow}
                  defaultValue={rowData.issuedQty}
                  onBlur={(e) => handleEdit("issuedQty", e.target.value, rowData)}
                ></Form.Control>  
              </Form.Group>
      }
             </span> 
        )
      },
    },
  ]
};


export default ApprovalTable