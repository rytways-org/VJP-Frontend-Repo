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

function MachiningTable(props) {
  

 

 const dispatch = useDispatch();
  function onSubmit(values) {
    
    console.log(values);
    //props.saveFunction(values);
  }

  const template = {
    heading: "Machining Cost",
    fields: [
        {
            title: "Machine Operation",
            
            type: "select",
            name: "machineOperation",
            contains: "Select",
            options: [
                { value: "", label: "Select" },
                { value: 1, label: "1" },
                { value: 0, label: "2" },
              ],
          
           validationProps: "Machine Operation is required",
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
            title: "MHR Cost for the Operation",
            type: "number",
            name: "mhrCostForOperation",
            contains: "number",
            validationProps: "MHR Cost for the Operation is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          },
          {
            title: "Operation Cost",
            type: "text",
            name: "operationCost",
            contains: "text",
            validationProps: "Operation Cost is required",
            inpprops: {
              readonly: true,
            },
          },
          // ... (repeat the above process for all machine operations)
      
          {
            title: "Machine Operation 1 Cost",
            type: "text",
            name: "machineOperation1Cost",
            contains: "text",
            validationProps: "Machine Operation 1 Cost is required",
            inpprops: {
              readonly: true,
            },
          },
          {
            title: "Machine Operation 2 Cost",
            type: "text",
            name: "machineOperation2Cost",
            contains: "text",
            validationProps: "Machine Operation 2 Cost is required",
            inpprops: {
              readonly: true,
            },
          },
          {
            title: "Machine Operation n Cost",
            type: "text",
            name: "machineOperationnCost",
            contains: "text",
            validationProps: "Machine Operation n Cost is required",
            inpprops: {
              readonly: true,
            },
          },
          {
            title: "Machine Operation 2 Cost",
            type: "text",
            name: "machineOperation2Cost",
            contains: "text",
            validationProps: "Machine Operation 2 Cost is required",
            inpprops: {
              readonly: true,
            },
          },
          {
            title: "Total Machining Cost",
            type: "text",
            name: "Totalmachiningcost",
            contains: "text",
            validationProps: "Total Cost is required",
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

export default MachiningTable;


