import React from 'react'
import CreateForm from '../../../../Components/Forms/CreateForm'

const rowWiseFields=4
function PoGenerateForm(props) {

     const template = {
        heading:"Enter Po Details",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        fields: [
             {
                 title: 'Date',
                 type: 'date',
                 name: 'poDate',
                 contains:"date",
                 validation:"Date is Required",
                 inpprops:{
                   format:"dd/mm/yyyy"
                 }
                
   
           },
           {
            title: 'Po Number',
            type: 'text',
            name: 'poEntry',
            contains:"text",
            inpprops:{
                minlength:0,
                maxlength:30,
            }
      }
           ]
       }

       
       function onSubmit(values) {
        console.log(values);
        values.joStatus="PO_Genereted"
        props.saveFunction(values)
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
  

  export default PoGenerateForm