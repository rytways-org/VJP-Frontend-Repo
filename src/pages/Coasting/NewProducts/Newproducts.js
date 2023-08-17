
import React, { useState, useEffect, useCallback } from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import SearchCard from "../../../UI/cards/SearchCard";
import api from "../../../Api";
import useFetch, { Provider } from "use-http";
import classes from '../NewProducts/Newproduct.module.css'
import SimpleCard from "../../../UI/cards/SimpleCard";
import NpTable from "./RTable/NpTable";
import Table from "../../../Components/tables/Table";
import { modalActions } from "../../../store/modal-Slice";
import Nproduct from "./Nproduct";
import RmTable from "./RTable/RmTable";
import { useSelector, useDispatch } from "react-redux";
import { Row,Col } from "react-bootstrap";
import PrTable from "./RTable/PrTable";
import CvTable from "./RTable/CvTable";
import IcTable from "./RTable/IcTable";
import McTable from './RTable/McTable'
import QcTable from "./RTable/QcTable";
import OscTable from "./RTable/OscTable";
import OvTable from "./RTable/OvTable";
import PtcTable from "./RTable/PtcTable";

const rowWiseFields = 4;




const styles = {
upper: {
    backgroundColor: "#E8F7F2",
    
  },
};

function Newproducts(props) {
  

  const [isRmTableVisible, setIsRmTableVisible] = useState(false);
  const [isPrTableVisible, setIsPrTableVisible] = useState(false);
  const [isCvTableVisible, setIsCvTableVisible] = useState(false);
  const [isMcTableVisible, setIsMcTableVisible] = useState(false);
  const [isQcTableVisible, setIsQcTableVisible] = useState(false);
  const [isOscTableVisible, setIsOscTableVisible] = useState(false);
  const [isOvTableVisible, setIsOvTableVisible] = useState(false);
  const [isPtcTableVisible, setIsPtcTableVisible] = useState(false);
 

 const dispatch = useDispatch();
  function onSubmit(values) {
    
    console.log(values);
    //props.saveFunction(values);
  }
/*
  const template = {
   
    fields: [
      {
        title: "Date",
        type: "date",
        name: "date",
        contains: "date",
        validationProps: "Date is required",
        inpprops: {
          format: "dd mmmm yyyy",
        },
      },
      {
        title: "Division",
        type: "text",
        name: "division",
        contains: "text",
        inpprops: {
          minlength: 1,
          maxlength: 50,
        },
      },
      {
        title: "Component",
        type: "text",
        name: "component",
        contains: "text",
        inpprops: {
          minlength: 1,
          maxlength: 50,
        },
      },
      {
        title: "Customer",
        type: "text",
        name: "customer",
        contains: "text",
        inpprops: {
          minlength: 1,
          maxlength: 50,
        },
      },
      {
        title: "Expected Volume",
        type: "number",
        name: "expectedVolume",
        contains: "number",
        validationProps: "Expected Volume is required",
        inpprops: {
          min: 0,
          step: 1,
        },
      },
      {
        title: "Currency of Quote",
        type: "text",
        name: "currencyOfQuote",
        contains: "text",
        inpprops: {
          minlength: 3,
          maxlength: 3,
        },
      },
      {
        title: "Stage",
        type: "text",
        name: "stage",
        contains: "text",
        inpprops: {
          minlength: 1,
          maxlength: 50,
        },
      },
      {
        title: "Payment Terms",
        type: "text",
        name: "paymentTerms",
        contains: "text",
        inpprops: {
          minlength: 1,
          maxlength: 100,
        },
      },
      {
        title: "Standard Processes inside VJP",
        type: "select",
        name: "standardProcesses",
        contains: "Select",
        options: [
          { value: "Select", label: "Select" },
          { value: "Pouring", label: "Pouring" },
          { value: "Cutting & Fettling", label: "Cutting & Fettling" },
          { value: "HT", label: "HT" },
          { value: "Aluminuim blast", label: "Aluminuim blast" },
          { value: "Machining", label: "Machining" },
          { value: "Packing", label: "Packing" },
        ],
      },
      {
        title: "Special Processes inside VJP",
        type: "select",
        name: "specialProcesses",
        contains: "Select",
        options: [
          { value: "Select", label: "Select" },
          { value: "Radiography - Sampling", label: "Radiography - Sampling" },
          { value: "FPI sampling", label: "FPI sampling" },
          { value: "Engraving", label: "Engraving" },
          { value: "Leak test", label: "Leak test" },
          { value: "NDT Level 3 sampling", label: "NDT Level 3 sampling" },
        ],
      },
      {
        title: "Outsourced Processes",
        type: "select",
        name: "outsourcedProcesses",
        contains: "Select",
        options: [
          { value: "Select", label: "Select" },
          { value: "Chemical conversion", label: "Chemical conversion" },
          { value: "Impregnation", label: "Impregnation" },
          { value: "Painting", label: "Painting" },
        ],
      },
    ],
  };
  */
  
  


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
    setIsMcTableVisible(false);
    setIsQcTableVisible(false);
    setIsOscTableVisible(false);
    setIsOvTableVisible(false);
    setIsPtcTableVisible(false);
  };

  // Function to show the PrTable
  const showPrTableHandler = () => {
    setIsRmTableVisible(false);
    setIsPrTableVisible(true);
    setIsCvTableVisible(false);
    setIsMcTableVisible(false);
    setIsQcTableVisible(false);
    setIsOscTableVisible(false);
    setIsOvTableVisible(false);
    setIsPtcTableVisible(false);
  };

  // Function to show the CvTable
  const showCvTableHandler = () => {
    setIsRmTableVisible(false);
    setIsPrTableVisible(false);
    setIsCvTableVisible(true);
    setIsMcTableVisible(false);
    setIsQcTableVisible(false);
    setIsOscTableVisible(false);
    setIsOvTableVisible(false);
    setIsPtcTableVisible(false);
  };
  
  const showMcTableHandler = () => {
    setIsRmTableVisible(false);
    setIsPrTableVisible(false);
    setIsCvTableVisible(false);
    setIsMcTableVisible(true);
    setIsQcTableVisible(false);
    setIsOscTableVisible(false);
    setIsOscTableVisible(false);
    setIsOvTableVisible(false);
    setIsPtcTableVisible(false);
  };
  const showQcTableHandler = () => {
    setIsRmTableVisible(false);
    setIsPrTableVisible(false);
    setIsCvTableVisible(false);
    setIsMcTableVisible(false);
    setIsQcTableVisible(true);
    setIsOscTableVisible(false);
    setIsOvTableVisible(false);
    setIsPtcTableVisible(false);
  };
  
  const showOscTableHandler = () => {
    setIsRmTableVisible(false);
    setIsPrTableVisible(false);
    setIsCvTableVisible(false);
    setIsMcTableVisible(false);
    setIsQcTableVisible(false);
    setIsOscTableVisible(true);
    setIsOvTableVisible(false);
    setIsPtcTableVisible(false);
  };
  const showOvTableHandler = () => {
    setIsRmTableVisible(false);
    setIsPrTableVisible(false);
    setIsCvTableVisible(false);
    setIsMcTableVisible(false);
    setIsQcTableVisible(false);
    setIsOscTableVisible(false);
    setIsOvTableVisible(true);
    setIsPtcTableVisible(false);
  };
  const showPtcTableHandler = () => {
    setIsRmTableVisible(false);
    setIsPrTableVisible(false);
    setIsCvTableVisible(false);
    setIsMcTableVisible(false);
    setIsQcTableVisible(false);
    setIsOscTableVisible(false);
    setIsOvTableVisible(false);
    setIsPtcTableVisible(true);
  };


  const hideRmTableHandler = () => {
    setIsRmTableVisible(false);
  };

  return (
    <div className={classes.container}>
      
      

      <SimpleCard>
        <Row>

        <Col md={5}>
            <Nproduct
              showRmTableHandler={showRmTableHandler}
              showPrTableHandler={showPrTableHandler}
              showCvTableHandler={showCvTableHandler}
              showMcTableHandler={showMcTableHandler}
              showQcTableHandler={showQcTableHandler}
              showOscTableHandler={showOscTableHandler}
              showOvTableHandler={showOvTableHandler}
              showPtcTableHandler={showPtcTableHandler}
            />
          </Col>
          <Col md={7}>
            {isRmTableVisible && <RmTable hideRmTableHandler={hideRmTableHandler} />}
            {isPrTableVisible && <PrTable />}
            {isCvTableVisible && <CvTable />}
            {isMcTableVisible && <McTable />}
            {isQcTableVisible && <QcTable />}
            {isOscTableVisible && <OscTable />}
            {isOvTableVisible && <OvTable />}
            {isPtcTableVisible && <PtcTable />}
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

export default Newproducts;


