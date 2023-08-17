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

export const FurnanceTable = (handleEdit, actions, isCasting,showFormHandler) => {
  //const [defValues, setDefValues] = useState({});

  return [
    {
      title: "Furnance",
      align: "center",
      render: (rowData) => {
        return <span><Form.Group key="Furnance">
        <Form.Control
          type="disabled"
          id={nameRow}
          name={nameRow}
          defaultValue={rowData.furnance}
        ></Form.Control>
      </Form.Group></span>;
      },
    },
    {
      title: "Seriel No From",
      align: "center",
      render: (rowData) => {
        return <span>
            <Form.Group key="plannedQty">
                <Form.Control
                  type="text"
                  id={nameRow}
                  name={nameRow}
                  defaultValue={rowData.serielNofrom}
                  onChange={(e) => this.setState({ text: e.target.value })}
                ></Form.Control>
              </Form.Group>
              </span>;
      },
    },
    {
      title: "Seriel No To",
      align: "left",
      render: (rowData) => {
        return <span>
            <Form.Group key="plannedQty">
                <Form.Control
                  type="text"
                  id={nameRow}
                  name={nameRow}
                  defaultValue={rowData.serielNoTo}
                  onChange={(e) => this.setState({ text: e.target.value })}
                ></Form.Control>
              </Form.Group></span>;
      },
    },
   {
      title: "Produced Qty",
      align: "left",
      render: (rowData) => {
        let nameRow = `qty${rowData.dailyPlanId}`;
        return (
          <span
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={showFormHandler(rowData, "FurnanceForm")}
                    >{rowData.producedQty}
                    </span>
          );
      },
    },
  ];
};

export default FurnanceTable;
// .filter(function (eachElem, index) {
//   return selectedColumns.indexOf(index) == -1
// });
