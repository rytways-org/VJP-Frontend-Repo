import { FormControl } from 'react-bootstrap';

import React, { useState, useEffect, useCallback } from "react";
import CreateForm from '../../../../Components/Forms/CreateForm';
import SearchCard from '../../../../UI/cards/SearchCard';
import api from '../../../../Api';
import useFetch, { Provider } from "use-http";
import classes from '../Newproduct.module.css'
import SimpleCard from '../../../../UI/cards/SimpleCard';
import NpTable from '../RTable/NpTable';
import Table from '../../../../Components/tables/Table';
import { modalActions } from '../../../../store/modal-Slice'; 
import Nproduct from '../Nproduct';
import RmTable from '../RTable/RmTable';
import { useSelector, useDispatch } from "react-redux";
import { Row,Col } from "react-bootstrap";
import PrTable from '../RTable/PrTable';
import CvTable from '../RTable/CvTable';
import IcTable from '../RTable/IcTable';
const rowWiseFields = 4;




const styles = {
upper: {
    backgroundColor: "#E8F7F2",
    
  },
};

function RtTable(props) {
  

 

 const dispatch = useDispatch();
  function onSubmit(values) {
    
    console.log(values);
    //props.saveFunction(values);
  }

  const template = {
    heading: "RT Type Inspection",
    fields: [
      {
        title: "RT Type",
        type: "select",
        name: "rtType",
        contains: "Select",
        options: [
            { value: "", label: "Select" },
            { value: 1, label: "1" },
            { value: 0, label: "2" },
          ],
      
      
        validationProps: "RT Type is required",
      },
      {
        title: "Inspection Cost",
        type: "number",
        name: "inspectionCost",
        contains: "number",
        validationProps: "Inspection Cost is required",
        inpprops: {
          min: 0,
          step: 0.01,
        },
      },
      {
        title: "No. Square Inches",
        type: "number",
        name: "squareInches",
        contains: "number",
        validationProps: "No. Square Inches is required",
        inpprops: {
          min: 0,
          step: 0.01,
        },
      },
      {
        title: "No. Pcs for Sampling",
        type: "number",
        name: "samplingPieces",
        contains: "number",
        validationProps: "No. Pcs for Sampling is required",
        inpprops: {
          min: 0,
          step: 1,
        },
      },
      {
        title: "Melting Kgs",
        type: "number",
        name: "meltingKgs",
        contains: "number",
        validationProps: "Melting Kgs is required",
        inpprops: {
          min: 0,
          step: 0.01,
        },
      },
      {
        title: "Melting Loss",
        type: "number",
        name: "meltingLoss",
        contains: "number",
        validationProps: "Melting Loss is required",
        inpprops: {
          min: 0,
          step: 0.01,
        },
      },
      {
        title: "Available for Discharge",
        type: "text",
        name: "availableForDischarge",
        contains: "text",
        validationProps: "Available for Discharge is required",
      },
      // ... (repeat the above process for remaining fields)
      {
        title: "Net Cost",
        type: "text",
        name: "netCost",
        contains: "text",
        validationProps: "Net Cost is required",
        inpprops: {
          readOnly: true,
        },
      },
    ],
  };
  
  
  
  


 /* const showRmTableHandler = () => {
    setIsRmTableVisible(true);
  };

  const hideRmTableHandler = () => {
    setIsRmTableVisible(false);
  }; */
  

  return (
    <div className={classes.container}>
      
      <SimpleCard
       styles={styles}>
        <CreateForm
          template={template}
          rowwise={rowWiseFields}
          validate={validate}
          onSubmit={onSubmit}
          onCancel={props.onCancel}
          buttonName="Submit"
        ></CreateForm>
      </SimpleCard>

      
    </div>
  );
}


function validate(watchValues, errorMethods) {
  let { errors, setError, clearErrors } = errorMethods;

  // Firstname validation
  if (watchValues["firstname"] === "Admin") {
    if (!errors["firstname"]) {
      setError("firstname", {
        type: "manual",
        message: "You cannot use this first name",
      });
    }
  } else {
    if (errors["firstname"] && errors["firstname"]["type"] === "manual") {
      clearErrors("firstname");
    }
  }
}

export default RtTable;


