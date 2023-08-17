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

function PackingTable(props) {
  

 

 const dispatch = useDispatch();
  function onSubmit(values) {
    
    console.log(values);
    //props.saveFunction(values);
  }

  const template = {
    heading: "Packing",
    fields: [
       
        {
            title: "Box Size",
            type: "text",
            name: "boxsize",
            contains: "text",
            validationProps: "Box Size is required",
            inpprops: {
              readonly: true,
            },
          },
          {
            title: "Height",
            type: "text",
            name: "height",
            contains: "text",
            validationProps: "Height is required",
            inpprops: {
              readonly: true,
            },
          },
          {
            title: "Width",
            type: "text",
            name: "Width",
            contains: "text",
            validationProps: "width is required",
            inpprops: {
              readonly: true,
            },
          },
          {
            title: "Length",
            type: "text",
            name: "length",
            contains: "text",
            validationProps: "Length is required",
            inpprops: {
              readonly: true,
            },
          },
          {
            title: "Component Size",
            type: "text",
            name: "componentsize",
            contains: "text",
            validationProps: "Component size is required",
            inpprops: {
              readonly: true,
            },
          }
          ,
          {
            title: "Height",
            type: "text",
            name: "height",
            contains: "text",
            validationProps: "Height is required",
            inpprops: {
              readonly: true,
            },
          },
          {
            title: "Width",
            type: "text",
            name: "Width",
            contains: "text",
            validationProps: "width is required",
            inpprops: {
              readonly: true,
            },
          },
          {
            title: "Length",
            type: "text",
            name: "length",
            contains: "text",
            validationProps: "Length is required",
            inpprops: {
              readonly: true,
            },
          },
          {
            title: "Packing Cost",
            type: "number",
            name: "packingcost",
            contains: "number",
            validationProps: "Packing Cost is required",
            inpprops: {
              min: 0,
              step: 0.01,
            },
          }
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

export default PackingTable;


