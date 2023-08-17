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

function MoldSandTable(props) {
  

  const [isRmTableVisible, setIsRmTableVisible] = useState(false);
  const [isPrTableVisible, setIsPrTableVisible] = useState(false);
  const [isCvTableVisible, setIsCvTableVisible] = useState(false);
 

 const dispatch = useDispatch();
  function onSubmit(values) {
    
    console.log(values);
    //props.saveFunction(values);
  }

  const template = {
    heading: "Mold Sand Cost",
    fields: [
      {
        title: "No of Mold in a Day",
        type: "number",
        name: "noOfMoldInADay",
        contains: "number",
        validationProps: "No of Mold in a Day is required",
        inpprops: {
          min: 1,
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
        title: "Power Cost Per Mould",
        type: "number",
        name: "powerCostPerMould",
        contains: "number",
        validationProps: "Power Cost Per Mould is required",
        inpprops: {
          min: 0,
          step: 0.01,
        },
      },
      {
        title: "No Unit of Sand Per Mould",
        type: "number",
        name: "noUnitOfSandPerMould",
        contains: "number",
        validationProps: "No Unit of Sand Per Mould is required",
        inpprops: {
          min: 0,
          step: 0.01,
        },
      },
      {
        title: "Sand Cost Per Kg",
        type: "number",
        name: "sandCostPerKg",
        contains: "number",
        validationProps: "Sand Cost Per Kg is required",
        inpprops: {
          min: 0,
          step: 0.01,
        },
      },
      {
        title: "Total Sand Cost",
        type: "text",
        name: "totalSandCost",
        contains: "text",
        validationProps: "Total Sand Cost is required",
        inpprops: {
          readonly: true,
        },
      },
      {
        title: "Consumable Cost",
        type: "number",
        name: "consumableCost",
        contains: "number",
        validationProps: "Consumable Cost is required",
        inpprops: {
          min: 0,
          step: 0.01,
        },
      },
      {
        title: "Consumable Cost (per 100kg)",
        type: "number",
        name: "consumableCostPer100kg",
        contains: "number",
        validationProps: "Consumable Cost (per 100kg) is required",
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

        <Col md={5}>
            <Nproduct
              showRmTableHandler={showRmTableHandler}
              showPrTableHandler={showPrTableHandler}
              showCvTableHandler={showCvTableHandler}
            />
          </Col>
          <Col md={7}>
            {isRmTableVisible && <RmTable hideRmTableHandler={hideRmTableHandler} />}
            {isPrTableVisible && <PrTable />}
            {isCvTableVisible && <CvTable />}
          </Col>
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

export default MoldSandTable;


