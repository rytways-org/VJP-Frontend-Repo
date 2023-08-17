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
      title: "Material Name",
      type: "text",
      name: "materialName",
      contains: "text",
      inpprops: {
        minlength: 2,
        maxlength: 80,
      },
    },
    {
      title: "Material Code",
      type: "text",
      name: "materialCode",
      contains: "text",
      inpprops: {
        minlength: 8,
        maxlength: 80,
      },
    },
    {
      title: 'Material Desc',
      type: 'textarea',
      name: 'materialDescription',
      contains:"textarea",
      inpprops:{
        maxlength:256,
        md:3
      }
    },
    {
      title: "Supplier Part No",
      type: "text",
      name: "supplierPartNo",
      contains: "text",
      inpprops: {
        minlength: 8,
        maxlength: 80,
      },
    },
    {
      title: "Internal Part No",
      type: "text",
      name: "internalPartNo",
      contains: "text",
      inpprops: {
        minlength: 8,
        maxlength: 80,
      },
    },
    {
      title: "Material Category",
      type: "select",
      name: "category",
      contains: "Select",
      options: [
        { value: "Select", label: "Select" },
        { value: "Consumables", label: "Consumables" },
        { value: "Raw_Materials", label: "Raw Materials" },
      ],
    },
    {
      title: "Minimum Stock",
      type: "number",
      name: "minimumStock",
      contains: "number",
      inpprops: {
      },
    },
    {
      title: "Uom",
      type: "select",
      name: "uom",
      contains: "Select",
      options: [
        { value: "Select", label: "Select" },
        { value: "Ltr", label: "Ltr" },
        { value: "Kgs", label: "Kgs" },
        { value: "Meter", label: "Meter" },
        { value: "Sq-Meter", label: "Sq-Meter" },
        { value: "Nos", label: "Nos" },
      ],
    },
    {
      title: "Unit Price",
      type: "number",
      name: "unitPrice",
      contains: "number",
      inpprops: {
      },
    },{
      title: "HSN Code",
      type: "text",
      name: "materialCode",
      contains: "text",
      inpprops: {
        minlength: 8,
        maxlength: 80,
      },
    }, {
      title: "Gst %",
      type: "select",
      name: "gst",
      contains: "Select",
      options: [
        { value: 0, label: "Select" },
        { value: 1, label: "0" },
        { value: 5, label: "5" },
        { value: 12, label: "12" },
        { value: 18, label: "18" },
        { value: 28, label: "28" },
      ],
    }, {
      title: "Approval Required",
      type: "select",
      name: "uom",
      contains: "Select",
      options: [
        { value: "Select", label: "Select" },
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
      ],
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
      name: "materialId",
      contains: "text"
    },
    
  ],
};

const form_header=<>
<Card body className={classes.title} style={{backgroundColor:Ctheme.colors.ttle}}>
  <Row>
  <Col md={{ span: 6, offset: 3 }}> <h4 style={{color: 'white'}}>New Materials</h4> </Col> 
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
