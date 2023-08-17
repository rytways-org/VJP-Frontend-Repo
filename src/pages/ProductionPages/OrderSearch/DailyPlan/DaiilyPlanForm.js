import React from 'react'
import CreateForm from '../../../../Components/Forms/CreateForm'

const rowWiseFields=2
function DaiilyPlanForm(props) {




    const template = {
        fields: [
             {
                 title: 'Date',
                 type: 'date',
                 name: 'planDate',
                 contains:"date",
                 validation:"Date is Required",
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
                 max : props.maxQty
             },
        },
       {
           title: 'Remarks',
           type: 'textarea',
           name: 'remarksForProd',
           contains:"textarea",
           inpprops:{
             maxlength:128,
             md:6
           },
     },{
        type: 'hidden',
        name: 'orderId',
        contains:"number",
        value:props.orderId,

  },{
        type: 'hidden',
        name: 'dailyPlanId',
        contains:"number"  
  }
           ]
       }

       function onSubmit(values) {
        console.log({...values});
        props.saveFunction(values);
        }
      
  return (
     <CreateForm  template={template} 
    rowwise={rowWiseFields}
     validate={validate}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName="Save"
     defaultValues={props.selected}>
     </CreateForm>
   
   )
}

export default DaiilyPlanForm
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
  