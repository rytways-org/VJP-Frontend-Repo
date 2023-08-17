import React,{useEffect,useCallback,useState} from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import api from "../../../Api";
import {Card,Row,Col} from 'react-bootstrap'
import  classes from './customer.module.css'
import Ctheme from "../../../Components/Ctheme/Ctheme";


const styles = {
  upper: {
    
    padding: ".5rem 1rem", // Add the padding property here
  },
  
};
const rowWiseFields = 3;


const form_header=<>
<Card body className={classes.title}
 style={{backgroundColor:Ctheme.colors.ttle}}>
  <Row>
  <Col md={{ span: 6, offset: 3 }}> <h4 style={{color: 'white'}}>New Supplier</h4> </Col> 
  </Row>
  </Card>
</>





function SupplierForm(props) {
  //console.log({...props.selectedItem})
 

  async function onSubmit(values) {
    props.suppliersave({...values});
  }


  const template = {
    fields: [
      {
        title: "Supplier Name",
        type: "text",
        name: "supplierName",
        contains: "text",
        inpprops: {
         
        },
      },
      {
        title: "Supplier Address",
        type: "textarea",
        name: "supplierAddress",
        contains: "textarea",
        inpprops: {
          maxlength:512,
          md:4
        },
      },
      {
        title: "Supplier State",
        type: "select",
        name: "stateId",
        contains: "select",
        options:props.states
      },
      {
        title: "Pan",
        type: "text",
        name: "pan",
        contains: "text",
        inpprops: {
         
        },
      },
      {
        title: "Gst",
        type: "text",
        name: "gst",
        contains: "text",
        inpprops: {
         
        },
      },
      {
        title: "Mobile No",
        type: "text",
        name: "contactNo",
        contains: "text",
        inpprops: {
       
        },
      },
      {
        title: "Contact Person",
        type: "text",
        name: "contactPerson",
        contains: "contactEmail",
        inpprops: {
         
        },
      },
      {
        title: "Email Id",
        type: "text",
        name: "contactEmail",
        contains: "Email",
        inpprops: {
         
        },
      },
      {
        title: "Supplier Category",
        type: "select",
        name: "category",
        contains: "Select",
        options: [
          { value: "Select", label: "Select" },
          { value: "Domestic", label: "Domestic" },
          { value: "Export", label: "Export" },
        ],
      },
      {
        title: "Payment Terms",
        type: "textarea",
        name: "paymentTerms",
        contains: "textarea",
        inpprops: {
          maxlength:512,
          md:4
        },
      },
      {
        title: "Ledger Name",
        type: "text",
        name: "ledgerName",
        contains: "text",
        inpprops: {
          minlength: 8,
          maxlength: 80,
        },
      },
      {
        title: "Is Active",
        type: "select",
        name: "status",
        contains: "Select",
        options: [
          { value: "Select", label: "Select" },
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
      },
      {
        type: "hidden",
        name: "supplierId",
        contains: "text",
      },
      
    ],
  };

  return (
    <>
    {form_header}
    <CreateForm
      template={template}
      rowwise={rowWiseFields}
      validate={validate}
      onSubmit={onSubmit}
      onCancel={props.onCancel}
      buttonName="Submit"
      defaultValues={props.selectedItem}
      styles={styles}
    ></CreateForm>
    </>
  );
}

export default SupplierForm;



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
