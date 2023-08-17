import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { BiRevision } from "react-icons/bi";
import { FcApproval } from "react-icons/fc";
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
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



export const EntryTable = (handleEdit, actions, selectedColumns,defValues,process) => {
  //const [defValues, setDefValues] = useState({});
  return [
    {
      title: "planDate",
      align: "center",
      render: (rowData) => {
        return (
          <>
            <span>{rowData.planDate}</span>
          </>
        );
      },
    },
    {
      title: "Shift",
      align: "center",
      render: (rowData) => {
        return <span>{rowData.shift}</span>;
      },
    },
    {
      title: "Process",
      align: "center",
      render: (rowData) => {
        return <span>{rowData.productProcessMap.process.processName}</span>;
      },
    },
    {
      title: "Order",
      align: "center",
      render: (rowData) => {
        return <span>{rowData.order.orderNo}</span>;
      },
    },
    {
      title: "Product Code",
      align: "center",
      render: (rowData) => {
        return <span>{rowData.order.product.internalPartCode}</span>;
      },
    },
    {
      title: "Product",
      align: "left",
      render: (rowData) => {
        return <span>{rowData.order.product.productName}</span>;
      },
    },
    {
      title: "Available Qty",
      align: "left",
      render: (rowData) => {
        return <span>{rowData.availableStock}</span>;
      },
    },
    {
      title: "Planed Qty",
      align: "left",
      render: (rowData) => {
        let nameRow = `qty${rowData.dailyPlanId}`;
        let qtyRow = rowData.planQty
        return (
         <span>
         <Form.Group key="plannedQty">
              <Form.Control
                type="text"
                id={nameRow}
                name={nameRow}
                defaultValue={qtyRow}
               // onChange={e => this.setState({ text: e.target.value })}
                onBlur = {e=>handleEdit("planedQty",e.target.value,rowData)}
              />
            </Form.Group>
             </span> 
        )
      },
    },
    {
      title: "Remarks",
      align: "left",
      render: (rowData) => {
        let nameRow = `remarks${rowData.dailyPlanId}`;
        let remarkValue = rowData.remarksForProd
        return (
          <span>
            <Form.Group key="remarks">
              <Form.Control
                type="text"
                id={nameRow}
                name={nameRow}
                onBlur = {e=>handleEdit("remarks",e.target.value,rowData)}
                defaultValue={remarkValue}
              />
            </Form.Group>
          </span>
        );
      },
    },
  ];
};

export default EntryTable;
