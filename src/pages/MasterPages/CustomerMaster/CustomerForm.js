import React from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import api from "../../../Api";
import {Card,Row,Col} from 'react-bootstrap'
import  classes from './customer.module.css'
import Ctheme from "../../../Components/Ctheme/Ctheme";

const styles = { 
  
  upper: {
    padding:'0.5rem 1rem',
  },

};
const rowWiseFields = 3;
const template = {
  fields: [
    {
      title: "Customer Name",
      type: "text",
      name: "name",
      contains: "text",
      inpprops: {
        minlength: 8,
        maxlength: 80,
      },
    },
    {
      title: "Pan",
      type: "text",
      name: "pan",
      contains: "text",
      inpprops: {
        minlength: 8,
        maxlength: 80,
      },
    },
    {
      title: "Gst",
      type: "text",
      name: "gst",
      contains: "text",
      inpprops: {
        minlength: 8,
        maxlength: 80,
      },
    },
    {
      title: "Mobile No",
      type: "text",
      name: "contactNo",
      contains: "text",
      inpprops: {
        minlength: 8,
        maxlength: 80,
      },
    },
    {
      title: "Email Id",
      type: "text",
      name: "contactEmail",
      contains: "email",
      inpprops: {
        minlength: 8,
        maxlength: 80,
      },
    },
    {
      title: "Customer Category",
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
      title: "Customer Segment",
      type: "select",
      name: "segment",
      contains: "Select",
      options: [
        { value: "Select", label: "Select" },
        { value: "Defence", label: "Defence" },
        { value: "Energy", label: "Energy" },
        { value: "Aerospace", label: "Aerospace" },
        { value: "Locomotive", label: "Locomotive" },
        { value: "Others", label: "Others" },
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
      title: "Inco Terms",
      type: "textarea",
      name: "incoTerms",
      contains:"textarea",
      inpprops: {
        maxlength:512,
        md:4
      },
    },
    {
      title: "Ledger Name",
      type: "text",
      name: "ledgerName",
      contains:"text",
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
      name: "customerId",
      contains: "text",
      inpprops: {
        minlength: 0,
        maxlength: 999999,
      },
    },
    
  ],
};

const form_header=<>
<Card body className={classes.title}  style={{backgroundColor:Ctheme.colors.ttle}}>
  <Row>
  <Col md={{ span: 6, offset: 3 }}> <h4 style={{color: 'white'}}>New Customer</h4> </Col> 
  </Row>
  </Card>
</>





function CustomerForm(props) {
  //console.log({...props.selectedItem})

  async function onSubmit(values) {
    props.customerSave({...values});
  }

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

export default CustomerForm;



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
