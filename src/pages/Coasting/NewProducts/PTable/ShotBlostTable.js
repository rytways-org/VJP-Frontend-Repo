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

function ShotBlostTable(props) {
  

 

 const dispatch = useDispatch();
  function onSubmit(values) {
    
    console.log(values);
    //props.saveFunction(values);
  }

  const template = {
    heading: "Shot Blost Cost",
    fields: [
        {
            title: "Alloy Rate Per Kg",
            type: "number",
            name: "alloyRatePerKg",
            contains: "number",
            validationProps: "Alloy Rate Per Kg is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Capacity",
            type: "number",
            name: "capacity",
            contains: "number",
            validationProps: "Capacity is required",
            inpprops: {
              min: 0,
              step: 1,
            },
          },
          {
            title: "Re-Usable Qty in Kgs",
            type: "number",
            name: "reusableQty",
            contains: "number",
            validationProps: "Re-Usable Qty in Kgs is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Consumption",
            type: "number",
            name: "consumption",
            contains: "number",
            validationProps: "Consumption is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Tonnage in Kgs",
            type: "number",
            name: "tonnage",
            contains: "number",
            validationProps: "Tonnage in Kgs is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Cost Per Kg",
            type: "number",
            name: "costPerKg",
            contains: "number",
            validationProps: "Cost Per Kg is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Consumable Cost Per Unit",
            type: "number",
            name: "consumableCostPerUnit",
            contains: "number",
            validationProps: "Consumable Cost Per Unit is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Shot Blast HT Value",
            type: "number",
            name: "shotBlastHTValue",
            contains: "number",
            validationProps: "Shot Blast HT Value is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Efficiency",
            type: "number",
            name: "efficiency",
            contains: "number",
            validationProps: "Efficiency is required",
            inpprops: {
              min: 0,
              max: 100,
              step: 0.01,
            },
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
            title: "Power Cost Per Minute",
            type: "number",
            name: "powerCostPerMinute",
            contains: "number",
            validationProps: "Power Cost Per Minute is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "As Cost Weight",
            type: "number",
            name: "asCostWeight",
            contains: "number",
            validationProps: "As Cost Weight is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Cycle Time",
            type: "number",
            name: "cycleTime",
            contains: "number",
            validationProps: "Cycle Time is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Number of Parts",
            type: "number",
            name: "numberOfParts",
            contains: "number",
            validationProps: "Number of Parts is required",
            inpprops: {
              min: 0,
              step: 1,
            },
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
            title: "Total Cost",
            type: "text",
            name: "totalCost",
            contains: "text",
            validationProps: "Total Cost is required",
            inpprops: {
              readonly: true,
            },
          },
          {
            title: "Total Cost Per Kg",
            type: "text",
            name: "totalCostPerKg",
            contains: "text",
            validationProps: "Total Cost Per Kg is required",
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

export default ShotBlostTable;


