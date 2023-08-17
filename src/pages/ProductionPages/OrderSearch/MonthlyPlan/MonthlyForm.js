import React, { useEffect, useState } from 'react'
import CreateForm from '../../../../Components/Forms/CreateForm';
import classes from './monthlyplan.module.css'

const rowWiseFields = 2;

function MonthlyForm(props) {
    const template = {
        fields: [
             {
                 title: 'Select Month',
                 type: 'date',
                 name: 'startDate',
                 contains:"date",
                 validation:"Month and Year is Required",
                 inpprops:{
                   format:"dd/mm/yyyy"
                 },              
   
           },
           {
             title: 'Quantity',
             type: 'number',
             name: 'quantity',
             contains:"number",
             validation:"Quantity is Required",
             inpprops:{
                 min:1,
                 step:1,
             },            
   
       },
       {
           title: 'Remarks',
           type: 'textarea',
           name: 'remarks',
           contains:"textarea",
           inpprops:{
             maxlength:128,
             md:12
           } 
     },{
        type: 'hidden',
        name: 'orderId',
        contains:"number",
        value:props.orderId,

  },{
        type: 'hidden',
        name: 'monthPlanId',
        contains:"number"  
  }
           ]
       }
       const [selected,setSelected]=useState()
       useEffect(()=>{
        setSelected(props.selected)
       },[props.selected])
      
      function onSubmit(values) {
        console.log({...values});
        props.saveFunction(values);
         }
  return (
     <CreateForm  template={template} className={classes.monthlyform}
    rowwise={rowWiseFields}
     validate={validate}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName="Save"
     defaultValues={selected}>
     </CreateForm>
   
   )
}

export default MonthlyForm

  
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
  
    