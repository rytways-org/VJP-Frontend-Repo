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

function LtestTable(props) {
  

 

 const dispatch = useDispatch();
  function onSubmit(values) {
    
    console.log(values);
    //props.saveFunction(values);
  }

  const template = {
    heading: "Leak Test",
    fields: [
      {
        title: "Machine name",
        type: "text",
        name: "machineName",
        contains: "text",
        validationProps: "Machine name is required",
        inpprops: {
          readonly: true,
        },
      },
  
      
      {
        title: "Operation Name",
        type: "text",
        name: "operationName",
        contains: "text",
        validationProps: "Operation Name is required",
        inpprops: {
          readonly: true,
        },
      },
  
      
      {
        title: "Fixed Cost",
        type: "number",
        name: "fixedCost",
        contains: "number",
        validationProps: "Fixed Cost is required",
        inpprops: {
          min: 0,
          step: 0.01,
        },
      },
  
      
      {
        title: "Variable Cost",
        type: "number",
        name: "variableCost",
        contains: "number",
        validationProps: "Variable Cost is required",
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

export default LtestTable;


