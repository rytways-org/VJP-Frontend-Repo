import React from 'react'
import { Card } from 'react-bootstrap';
import CreateForm from '../../../../Components/Forms/CreateForm'

function RmForm(props) {
  let rowWiseFields = 2;

  let template = {
    heading: 'Enter Raw Material Details',
    fields: [
        {
            title: 'Date',
            type: 'date',
            name: 'date',
            contains:"date",
            validation:"Date is Required",
            dateprops:{
              format:"dd/mm/yy"
            },
      },{
        title: 'Type',
        type: 'select',
        name: 'furnance',
        contains: 'Select',
         options:[
        {value:"", label:'Select'},
        {value:1, label:'Alloy Ingots'},
        {value:2, label:'Runners'},
        {value:3, label:'Consumables'},
        {value:4, label:'GDC General'}
      ]
    },
      {
        title: 'Raw Material',
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
    },
        {
            title: 'Weight',
            type: 'number',
            name: 'Qty1',
            contains: 'number',
            numprops:{
                min:.1,
                step:.5
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

export default RmForm