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

function SandCoreTable(props) {
  

 

 const dispatch = useDispatch();
  function onSubmit(values) {
    
    console.log(values);
    //props.saveFunction(values);
  }

  const template = {
    heading: "sandcore",
    fields: [
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
            title: "% Efficiency Considered",
            type: "number",
            name: "efficiencyConsidered",
            contains: "number",
            validationProps: "% Efficiency Considered is required",
            inpprops: {
              min: 0,
              max: 100,
              step: 0.01,
            },
          },
          {
            title: "Days",
            type: "number",
            name: "days",
            contains: "number",
            validationProps: "Days is required",
            inpprops: {
              min: 1,
              step: 1,
            },
          },
          {
            title: "Core Shooter Consumption in KW",
            type: "number",
            name: "coreShooterConsumptionKW",
            contains: "number",
            validationProps: "Core Shooter Consumption in KW is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Core Shooter Consumption Cost",
            type: "text",
            name: "coreShooterConsumptionCost",
            contains: "text",
            validationProps: "Core Shooter Consumption Cost is required",
            inpprops: {
              readonly: true,
            },
          },
          {
            title: "Heater Consumption in KW",
            type: "number",
            name: "heaterConsumptionKW",
            contains: "number",
            validationProps: "Heater Consumption in KW is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Heater Cost",
            type: "text",
            name: "heaterCost",
            contains: "text",
            validationProps: "Heater Cost is required",
            inpprops: {
              readonly: true,
            },
          },
          {
            title: "Tot Big Core Shooter Cost",
            type: "text",
            name: "totBigCoreShooterCost",
            contains: "text",
            validationProps: "Tot Big Core Shooter Cost is required",
            inpprops: {
              readonly: true,
            },
          },
          {
            title: "Heater Consumption in KW",
            type: "number",
            name: "heaterConsumptionKW",
            contains: "number",
            validationProps: "Heater Consumption in KW is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Heater Cost",
            type: "text",
            name: "heaterCost",
            contains: "text",
            validationProps: "Heater Cost is required",
            inpprops: {
              readonly: true,
            },
          },
          {
            title: "Tot Big Core Shooter Cost",
            type: "text",
            name: "totBigCoreShooterCost",
            contains: "text",
            validationProps: "Tot Big Core Shooter Cost is required",
            inpprops: {
              readonly: true,
            },
          },
          {
            title: "Number of Pieces",
            type: "number",
            name: "numberOfPieces",
            contains: "number",
            validationProps: "Number of Pieces is required",
            inpprops: {
              min: 1,
              step: 1,
            },
          },
          {
            title: "Cost Per Piece",
            type: "number",
            name: "costPerPiece",
            contains: "number",
            validationProps: "Cost Per Piece is required",
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
            title: "Sand Core Cost Calculation",
            type: "text",
            name: "sandCoreCostCalculation",
            contains: "text",
            validationProps: "Sand Core Cost Calculation is required",
            inpprops: {
              readonly: true,
            },
          },
          {
            title: "Core Weight",
            type: "number",
            name: "coreWeight",
            contains: "number",
            validationProps: "Core Weight is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Sand Cost per Unit",
            type: "number",
            name: "sandCostPerUnit",
            contains: "number",
            validationProps: "Sand Cost per Unit is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Silica Sand Cost",
            type: "number",
            name: "silicaSandCost",
            contains: "number",
            validationProps: "Silica Sand Cost is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Core Cost per Part",
            type: "text",
            name: "coreCostPerPart",
            contains: "text",
            validationProps: "Core Cost per Part is required",
            inpprops: {
              readonly: true,
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

export default SandCoreTable;


