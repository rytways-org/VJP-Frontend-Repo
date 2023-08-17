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

function HeatTreatmentTable(props) {
  

 

 const dispatch = useDispatch();
  function onSubmit(values) {
    
    console.log(values);
    //props.saveFunction(values);
  }

  const template = {
    heading: "Heat Treatment Cost",
    fields: [
        {
            title: "Type of Facility",
            type: "select",
            name: "facilityType",
            contains: "Select",
            options: [
                { value: "", label: "Select" },
                { value: 1, label: "1" },
                { value: 0, label: "2" },
              ],
            validationProps: "Type of Facility is required",
          },
          {
            title: "Power Cost Per Unit",
            type: "number",
            name: "powerCostPerUnit",
            contains: "number",
            validationProps: "Power Cost Per Unit is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Consumables Cost",
            type: "number",
            name: "consumablesCost",
            contains: "number",
            validationProps: "Consumables Cost is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Height",
            type: "number",
            name: "height",
            contains: "number",
            validationProps: "Height is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Width",
            type: "number",
            name: "width",
            contains: "number",
            validationProps: "Width is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Length",
            type: "number",
            name: "length",
            contains: "number",
            validationProps: "Length is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Height",
            type: "number",
            name: "height",
            contains: "number",
            validationProps: "Height is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Width",
            type: "number",
            name: "width",
            contains: "number",
            validationProps: "Width is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Length",
            type: "number",
            name: "length",
            contains: "number",
            validationProps: "Length is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Number of Pieces Per Load",
            type: "number",
            name: "piecesPerLoad",
            contains: "number",
            validationProps: "Number of Pieces Per Load is required",
            inpprops: {
              min: 0,
              step: 1,
            },
          },
          {
            title: "Heat Treatment Facility Cost",
            type: "number",
            name: "heatTreatmentCost",
            contains: "number",
            validationProps: "Heat Treatment Facility Cost is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          
          {
            title: "Heat Treatment Facility Cost 1",
            type: "number",
            name: "heatTreatmentCost1",
            contains: "number",
            validationProps: "Heat Treatment Facility Cost 1 is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Heat Treatment Facility Cost 2",
            type: "number",
            name: "heatTreatmentCost2",
            contains: "number",
            validationProps: "Heat Treatment Facility Cost 2 is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Total Heat Treatment Cost",
            type: "text",
            name: "totalHeatTreatmentCost",
            contains: "text",
            validationProps: "Total Heat Treatment Cost is required",
            inpprops: {
              readonly: true,
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

export default HeatTreatmentTable;


