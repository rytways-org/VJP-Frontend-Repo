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

function WeldingTable(props) {
  

 

 const dispatch = useDispatch();
  function onSubmit(values) {
    
    console.log(values);
    //props.saveFunction(values);
  }

  const template = {
    heading: "Welding",
    fields: [
        {
            title: "KWH for Welding",
            type: "number",
            name: "kwhForWelding",
            contains: "number",
            validationProps: "KWH for Welding is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Power Cost per Unit",
            type: "number",
            name: "powerCostPerUnit",
            contains: "number",
            validationProps: "Power Cost per Unit is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Number of Minutes",
            type: "number",
            name: "numberOfMinutes",
            contains: "number",
            validationProps: "Number of Minutes is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Welding Power Cost",
            type: "text",
            name: "weldingPowerCost",
            contains: "text",
            validationProps: "Welding Power Cost is required",
            inpprops: {
              readonly: true,
            },
          },
          {
            title: "Material",
            
            type: "select",
            name: "Material",
            contains: "Select",
            options: [
                { value: "", label: "Select" },
                { value: 1, label: "1" },
                { value: 0, label: "2" },
              ],
          
            validationProps: "Material is required",
          },
          {
            title: "Qty",
            type: "number",
            name: "qty",
            contains: "number",
            validationProps: "Qty is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Rate",
            type: "number",
            name: "rate",
            contains: "number",
            validationProps: "Rate is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Grams Per Piece",
            type: "number",
            name: "gramsPerPiece",
            contains: "number",
            validationProps: "Grams Per Piece is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Material Cost",
            type: "text",
            name: "materialCost",
            contains: "text",
            validationProps: "Material Cost is required",
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

export default WeldingTable;


