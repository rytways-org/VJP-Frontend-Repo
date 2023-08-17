import React from "react";
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
const rowWiseFields = 4;
const template = {
  fields: [
    {
      title: "Defect Name",
      type: "text",
      name: "defectName",
      contains: "text",
      inpprops: {
       
      },
    },
    {
      title: 'Defects Description',
      type: 'textarea',
      name: 'description',
      contains:"textarea",
      inpprops:{
        maxlength:256,
        md:6
      }
    },
    {
      title: "Defect Type",
      type: "select",
      name: "defectType",
      contains: "Select",
      options: [
        { value: "Select", label: "Select" },
        { value: "Pouring", label: "Pouring" },
        { value: "Machining", label: "Machining" },
       
      ],
    },
    {
      type: "hidden",
      name: "defectId",
      contains: "text"
    },
    
  ],
};

const form_header=<>
<Card body className={classes.title} style={{backgroundColor:Ctheme.colors.ttle}}>
  <Row>
  <Col md={{ span: 6, offset: 3 }}> <h4 style={{color: 'white'}}>New Defects</h4> </Col> 
  </Row>
  </Card>
</>





function MaterialMasterForm(props) {
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

export default MaterialMasterForm;



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
