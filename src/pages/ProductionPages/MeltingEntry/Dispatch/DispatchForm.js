import React from 'react'
import CreateForm from '../../../../Components/Forms/CreateForm'

const rowWiseFields=2
function DispatchForm(props) {
    const template = {
        fields: [
             {
                 title: 'Date',
                 type: 'date',
                 name: 'invoiceDate',
                 contains:"date",
                 validation:"Date is Required",
                 inpprops:{
                   format:"dd/mm/yy"
                 },
           },
           {
             title: 'Quantity',
             type: 'number',
             name: 'quantity',
             contains:"number",
             inpprops:{
                 min:1,
                 step:1,
                 max:props.orderQty
             },
            
   
       },
       {
        title: 'Dc No',
        type: 'text',
        name: 'invoiceNo',
        contains:"text",
        inpprops:{
            minlength:3,
            maxlength:80
        },
       

  },{
    title: 'Vechicle No',
    type: 'text',
    name: 'vehicleDetails',
    contains:"text",
    inpprops:{
        minlength:3,
        maxlength:80
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
            },{
                type: "hidden",
                name: "orderId",
                contains: "number",
                value: props.orderId,
              }

           ]
       }
      

       function onSubmit(values) {
        props.saveFunction(values);
      }
      const buttonName= "Add"
  return (
     <CreateForm  template={template} 
    rowwise={rowWiseFields}
     validate={validate}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName={buttonName}
     defaultValues={props.selected}>
     </CreateForm>
   
   )
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
  

  export default DispatchForm
