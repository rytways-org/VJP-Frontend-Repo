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

function HeliTable(props) {
  

  const [isRmTableVisible, setIsRmTableVisible] = useState(false);
  const [isPrTableVisible, setIsPrTableVisible] = useState(false);
  const [isCvTableVisible, setIsCvTableVisible] = useState(false);
 

 const dispatch = useDispatch();
  function onSubmit(values) {
    
    console.log(values);
    //props.saveFunction(values);
  }

  const template = {
    heading: "Heli Coil Insert Cost",
    fields: [
        {
        title: "Cost Per Insert",
        type: "number",
        name: "costPerInsert",
        contains: "number",
        validationProps: "Cost Per Insert is required",
        inpprops: {
          min: 0,
          step: 0.01,
        },
      },
      {
        title: "Number of Insert",
        type: "number",
        name: "numberOfInsert",
        contains: "number",
        validationProps: "Number of Insert is required",
        inpprops: {
          min: 1,
          step: 1,
        },
      },
      {
        title: "Normal Loss %",
        type: "number",
        name: "normalLossPercentage",
        contains: "number",
        validationProps: "Normal Loss % is required",
        inpprops: {
          min: 0,
          max: 100,
          step: 0.01,
        },
      },
      {
        title: "Net Cost Per Insert",
        type: "number",
        name: "netCostPerInsert",
        contains: "number",
        validationProps: "Net Cost Per Insert is required",
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
        title: "Transport Cost %",
        type: "number",
        name: "transportCostPercentage",
        contains: "number",
        validationProps: "Transport Cost % is required",
        inpprops: {
          min: 0,
          max: 100,
          step: 0.01,
        },
      },
      {
        title: "Total HC Cost",
        type: "text",
        name: "totalHCCost",
        contains: "text",
        validationProps: "Total HC Cost is required",
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
  // Function to show the RmTable
  const showRmTableHandler = () => {
    setIsRmTableVisible(true);
    setIsPrTableVisible(false);
    setIsCvTableVisible(false);
  };

  // Function to show the PrTable
  const showPrTableHandler = () => {
    setIsRmTableVisible(false);
    setIsPrTableVisible(true);
    setIsCvTableVisible(false);
  };

  // Function to show the CvTable
  const showCvTableHandler = () => {
    setIsRmTableVisible(false);
    setIsPrTableVisible(false);
    setIsCvTableVisible(true);
  };
  const hideRmTableHandler = () => {
    setIsRmTableVisible(false);
  };

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

      <SimpleCard>
        <Row>

            <Nproduct
              showRmTableHandler={showRmTableHandler}
              showPrTableHandler={showPrTableHandler}
              showCvTableHandler={showCvTableHandler}
            />
          
        </Row>
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

export default HeliTable;


