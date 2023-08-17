import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { BiRevision } from "react-icons/bi";
import { FcApproval } from "react-icons/fc";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";

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

export const EntryTable = (handleEdit, actions, isCasting,showFormHandler) => {
  //const [defValues, setDefValues] = useState({});

  return [
    {
      title: "Shift",
      align: "left",
      render: (rowData) => {
        return <span>{rowData.shift}</span>;
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
      title: "Remarks",
      align: "left",
      render: (rowData) => {
        return <span>{rowData.remarksForProd}</span>;
      },
    },
    {
      title: "Planned Qty",
      align: "left",
      render: (rowData) => {
        return <span>{rowData.planQty}</span>;
      },
    },
    {
      title: "Produced Qty",
      align: "left",
      render: (rowData) => {
        let nameRow = `qty${rowData.dailyPlanId}`;
        return (
          <span>
            {isCasting ? (
              
                   <span
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={showFormHandler(rowData, "FurnanceForm")}
                    >{rowData.producedQty}
                    </span>
                
            ) : (
              rowData.producedQty>0 ? <span
                style={{ cursor: "pointer", color: "blue" }}
                onClick={showFormHandler(rowData, "EditEntry")}
              >{rowData.producedQty}
              </span> :
              <Form.Group key="producedQty">
                <Form.Control
                  type="text"
                  id={nameRow}
                  name={nameRow}
                  defaultValue={rowData.producedQty}
                  onBlur={(e) => handleEdit("producedQty", e.target.value, rowData)}
                ></Form.Control>
              </Form.Group>
            )}
          </span>
        );
      },
    },
    {
      title: "Remarks",
      align: "left",
      render: (rowData) => {
        let nameRow = `remarks${rowData.dailyPlanId}`;
        return (
          <span>
            <Form.Group key="remarks">
              <Form.Control
                type="text"
                id={nameRow}
                name={nameRow}
                onBlur={(e) => handleEdit("remarks", e.target.value, rowData)}
                defaultValue={rowData.remarksAfterProd}
              />
            </Form.Group>
          </span>
        );
      },
    },
  ];
};

export default EntryTable;
// .filter(function (eachElem, index) {
//   return selectedColumns.indexOf(index) == -1
// });
