import React from 'react'
import { Card } from 'react-bootstrap';
import CreateForm from '../../../../Components/Forms/CreateForm'

function SplitUpForm(props) {
  let rowWiseFields = 2;

  let template = {
    heading: 'Enter Alloy/Runner Splitup',
    fields: [
        {
            title: 'Alloy Wgt(kgs)',
            type: 'number',
            name: 'Qty1',
            contains: 'number',
            inpprops:{
                min:50,
                step:2
            }
        },{
          title: 'Runner Wgt(kgs)',
          type: 'number',
          name: 'Qty1',
          contains: 'number',
          inpprops:{
              min:50,
              step:2
          }
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

export default SplitUpForm