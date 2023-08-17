import React from 'react'
import { Card } from 'react-bootstrap';
import CreateForm from '../../../../Components/Forms/CreateForm'

function AlternateForm(props) {
  let rowWiseFields = 2;

  let template = {
    heading: 'Select Alternate Alloy',
    fields: [
      {
        title: 'Alternate Alloys',
        type: 'select',
        name: 'furnance',
        contains: 'Select',
         options:[
        {value:"", label:'Select'},
        {value:1, label:'Steel grade001'},
        {value:0, label:'Aluminium grade002'},
        {value:0, label:'Iron Ore grade001'},
        {value:0, label:'Potash grade001'},
        {value:0, label:'Nitro grade001'}
      ]
    }
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
     buttonName="Save">
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

export default AlternateForm