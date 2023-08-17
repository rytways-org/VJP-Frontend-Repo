import React from 'react'
import CreateForm from '../../Components/Forms/CreateForm'
import Modal from '../../UI/Modal/Modal';

function InputSheet(props) {
    let rowWiseFields = 4;
    let template = {
      heading: 'Input Sheet',
      fields: [
          {
              title: 'RFQ No',
              type: 'text',
              name: 'tensile',
              contains:"text",
              validationProps: "RFQ No is Required"
          },
          {
              title: 'Drawing No',
              type: 'text',
              name: 'MechanicalProperties',
              contains: 'text',
              validationProps: "Drawing No is required"
          },
          {
            title: 'Name of Customer',
            type: 'text',
            name: 'MechanicalProperties',
            contains: 'text',
            validationProps: "Customer Name is required"
        },
        {
            title: 'Part Name',
            type: 'text',
            name: 'MechanicalProperties',
            contains: 'text',
            validationProps: "Part Name is required"
        },
        {
            title: 'Sector',
            type: 'text',
            name: 'MechanicalProperties',
            contains: 'text',
            validationProps: "Sector is required"
        },
        {
            title: 'Part Size',
            type: 'text',
            name: 'MechanicalProperties',
            contains: 'text',
            validationProps: "Part Size is required"
        },
        {
            title: 'Currency',
            type: 'select',
            name: 'inHouse',
            contains: 'Select',
            validationProps: "Please Select in-house or not",
            options:[
            {value:"", label:'Select'},
            {value:1, label:'INR'},
            {value:2, label:'Dollar'},
            {value:3, label:'Euro'}
          ]
        },
        {
            title: 'Surface Area',
            type: 'text',
            name: 'MechanicalProperties',
            contains: 'text',
            validationProps: "Surface Area is required"
        },
        
        {
            title: 'Fai Quantity',
            type: 'text',
            name: 'MechanicalProperties',
            contains: 'text',
            validationProps: "Fai Quantity is required"
        },
        
        {
            title: 'Tooling Cost',
            type: 'text',
            name: 'MechanicalProperties',
            contains: 'text',
            validationProps: "Tooling Cost is required"
        },
        {
            title: 'Development Cost',
            type: 'text',
            name: 'MechanicalProperties',
            contains: 'text',
            validationProps: "Development Cost is required"
        },
        {
            title: 'Investment',
            type: 'text',
            name: 'MechanicalProperties',
            contains: 'text',
            validationProps: "Insvestment is required"
        },
        {
            title: 'Minimum Annual Quantity(MAQ)',
            type: 'text',
            name: 'MechanicalProperties',
            contains: 'text',
            validationProps: "MAQ is required"
        },
        {
            title: 'Minimum Batch Quantity(MAQ)',
            type: 'text',
            name: 'MechanicalProperties',
            contains: 'text',
            validationProps: "MBQ is required"
        },
        {
            title: 'Expected Order Quantity(EOQ)',
            type: 'text',
            name: 'MechanicalProperties',
            contains: 'text',
            validationProps: "EOQ is required"
        },
        {
            title: 'Expected Rejection',
            type: 'text',
            name: 'MechanicalProperties',
            contains: 'text',
            validationProps: "Expected Rejection is required"
        },
        {
            title: 'Casting Criticality',
            type: 'select',
            name: 'inHouse',
            contains: 'Select',
            validationProps: "Please Select in-house or not",
            options:[
            {value:"", label:'Select'},
            {value:1, label:'Low'},
            {value:2, label:'Medium'},
            {value:3, label:'High'}
          ]
        },
        {
            title: 'Mechanical Criticality',
            type: 'select',
            name: 'inHouse',
            contains: 'Select',
            validationProps: "Please Select in-house or not",
            options:[
            {value:"", label:'Select'},
            {value:1, label:'Low'},
            {value:2, label:'Medium'},
            {value:3, label:'High'}
          ]
        } 
      ]
    }
  return (
    <CreateForm  template={template}
    // watchFields={['firstname','password']}
     rowwise={rowWiseFields}
     validate={validate}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName="Submit">
     </CreateForm>
  )
}
export default InputSheet

function onSubmit(values) {
    console.log(values);
  }
  
  function validate(watchValues, errorMethods) {
    let { errors, setError, clearErrors } = errorMethods;
  
    // Firstname validation
    if(watchValues['firstname'] === 'Admin'){
        if(!errors['firstname']){
            setError('firstname', {
                type: 'manual',
                message: 'You cannot use this first name'
            })
        }
    }else{
        if(errors['firstname'] && errors['firstname']['type'] === 'manual'){
            clearErrors('firstname');
        }
    }
  }
  