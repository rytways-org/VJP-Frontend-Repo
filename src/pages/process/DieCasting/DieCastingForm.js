import React from 'react'
import { FaYenSign } from 'react-icons/fa';
import CreateForm from '../../../Components/Forms/CreateForm'

function DieCastingForm(props) {

  let rowWiseFields = 2;
  let template = {
    heading: 'DieCasting Specifications',
    fields: [
        {
            title: 'Tensile',
            type: 'text',
            name: 'tensile',
            contains:"text",
            validationProps: "Tensile is Required"
        },
        {
            title: 'Mechanical Properties',
            type: 'text',
            name: 'MechanicalProperties',
            contains: 'text',
            validationProps: "Mechanical Properties is required"
        },
       
      {
          title: 'In-House',
          type: 'select',
          name: 'inHouse',
          contains: 'Select',
          validationProps: "Please Select in-house or not",
          options:[
          {value:"", label:'Select'},
          {value:1, label:'Yes'},
          {value:0, label:'No'}
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
     onCancel={props.onCancel}>

     </CreateForm>
  )
}


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
export default DieCastingForm
