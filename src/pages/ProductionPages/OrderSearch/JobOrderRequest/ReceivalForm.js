import React from 'react'
import { Card } from 'react-bootstrap';
import CreateForm from '../../../../Components/Forms/CreateForm'

function ReceivalForm(props) {
  let rowWiseFields = 2;

  let template = {
    heading: 'Enter Receival Details',
    fields: [
      {
        title: 'Date',
        type: 'date',
        name: 'date',
        contains: 'date',
        inpprops:{
           format:"dd/mm/yyyy"
        }
    },
        {
            title: 'Quantity',
            type: 'number',
            name: 'Qty1',
            contains: 'number',
            inpprops:{
                min:.1,
                step:.5
            }
        }, {
            title: 'Remarks',
            type: 'textarea',
            name: 'remarks',
            contains:"textarea",
            inpprops:{
              maxlength:128,
              md:6
            },
      },
      {
        title: 'Inward Entry Process',
        type: 'select',
        name: 'inwardStock',
        contains: 'Select',
        validationProps: "Please Select Process",
        options:[
        {value:"", label:'Select'},
        {value:1, label:'Cutting & Fettling'},
        {value:2, label:'Heat Treatment'},
        {value:3, label:'Shot Blasting'}
      ]
    },
      


    ]
}
  return (
    <Card>
    <CreateForm  template={template}
    // watchFields={['firstname','password']}
     rowwise={rowWiseFields}
     validate={validate}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName="Add">
     </CreateForm>
     </Card>
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

export default ReceivalForm