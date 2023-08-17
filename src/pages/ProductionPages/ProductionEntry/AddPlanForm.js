import React from 'react'
import CreateForm from '../../../Components/Forms/CreateForm'

const rowWiseFields=2
function AddPlanForm(props) {
    const template = {
        heading: "Add Today's Plan",
        fields: [
             {
                 title: 'Date',
                 type: 'date',
                 name: 'date',
                 contains:"date",
                 validation:"Date is Required",
                 inpprops:{
                   format:"mm/yy"
                 },
           },
           {
            title: 'Product',
            type: 'select',
            name: 'product',
            contains: 'Select',
            options:[
            {value:"", label:'Select'},
            {value:1, label:'Rft4243543'},
            {value:2, label:'PRT43543543'},
            {value:3, label:'IYT324432543'}
          ]
        },
      {
        title: 'Customer',
        type: 'select',
        name: 'outsouredTo',
        contains: 'Select',
        options:[
        {value:"", label:'Select'},
        {value:1, label:'DRDO'},
        {value:2, label:'ISRO'},
        {value:3, label:'BHEL'}
      ]
    },
           {
             title: 'Quantity',
             type: 'number',
             name: 'Quantity',
             contains:"number",
             validation:"Quantity is Required",
             inpprops:{
                 min:1,
                 step:1
             },
            
   
       },
       {
           title: 'Remarks',
           type: 'textarea',
           name: 'remarks',
           contains:"textarea",
           inpprops:{
             maxlength:128,
             md:6
           },
            },
           ]
       }
      
      const buttonName= "Add"
  return (
     <CreateForm  template={template} 
    rowwise={rowWiseFields}
     validate={validate}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName={buttonName}>
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
  

  export default AddPlanForm
