import React from 'react'
import CreateForm from '../../../../Components/Forms/CreateForm'

const rowWiseFields=2
function ApprovalForm(props) {

     const template = {
       heading:"Update Status",
        fields: [
          {
            title: 'Service Name',
            type: 'text',
            name: 'mat1',
            contains:"text",
            validation:"Quantity is Required",
            inpprops:{
                min:1,
                step:1
            }, 
      },{
        title: 'PO Status',
        type: 'select',
        name: 'joStatus1',
        contains: 'Select',
        validationProps: "Please Select Job Order status",
        options:[
        {value:"", label:'Select'},
        {value:"Approved", label:'Approve'},
        {value:"Rejected", label:'Reject'}
      ]
        }, {
          title: 'Service Name',
          type: 'text',
          name: 'mat2',
          contains:"text",
          validation:"Quantity is Required",
          inpprops:{
              min:1,
              step:1
          }, 
    }, {
      title: 'PO Status',
      type: 'select',
      name: 'joStatus1',
      contains: 'Select',
      validationProps: "Please Select Job Order status",
      options:[
      {value:"", label:'Select'},
      {value:"Approved", label:'Approve'},
      {value:"Rejected", label:'Reject'}
    ]
      }, {
        title: 'Service Name',
        type: 'text',
        name: 'mat3',
        contains:"text",
        validation:"Quantity is Required",
        inpprops:{
            min:1,
            step:1
        }, 
  }, {
    title: 'PO Status',
    type: 'select',
    name: 'joStatus1',
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
    const defaultvals = {"mat1":"Service1","mat2":"Service2","mat3":"Service3",
    "Qty1":"132","Qty2":"12","Qty3":"1",}

  return (
    <CreateForm  
    template={template} 
    rowwise={rowWiseFields}
     validate={validate}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName="Save"
     defaultValues={defaultvals}>
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