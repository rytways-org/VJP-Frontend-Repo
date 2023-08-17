import React from 'react'
import CreateForm from '../../../../Components/Forms/CreateForm'

const rowWiseFields=4
function ApprovalForm(props) {

     const template = {
       heading:"Update Approval Status",
        fields: [
             {
                 title: 'Date',
                 type: 'date',
                 name: 'approvalDate',
                 contains:"date",
                 validation:"Date is Required",
                 inpprops:{
                   format:"mm/yy"
                 },
                
   
           },
           {
             title: 'Quantity',
             type: 'number',
             name: 'approvedQty',
             contains:"number",
             validation:"Quantity is Required",
             inpprops:{
                 min:1,
                 step:1
             }, 
       }, {
        title: 'JO Status',
        type: 'select',
        name: 'joStatus',
        contains: 'Select',
        validationProps: "Please Select Job Order status",
        options:[
        {value:"", label:'Select'},
        {value:"Approved", label:'Approve'},
        {value:"Rejected", label:'Reject'}
      ]
        }
           ]
       }
      function onSubmit(values) {
        console.log(values);
        props.saveFunction(values)
      }
    

  return (
    <CreateForm  
    template={template} 
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
  

  export default ApprovalForm