import React from 'react'
import CreateForm from '../../../../Components/Forms/CreateForm'
import {Row,Col,Form} from 'react-bootstrap'
import { useForm } from "react-hook-form";

function InspectionForm(props) {

    let { register, handleSubmit, formState:{errors}, watch, setError, clearErrors ,setValue} = useForm();
   
  let rowWiseFields = 2;

  let template = {
    heading: <Row className='justify-content-center'><Col>JO Inspection Entry</Col>
 </Row>,
fields: [
        {
            title: 'Date',
            type: 'date',
            name: 'date',
            contains:"date",
            validation:"Date is Required",
            inpprops:{
              format:"dd/mm/yy"
            },
      },{
        title: 'Defect Type',
        type: 'select',
        name: 'InwardType',
        contains: 'Select',
         options:[
        {value:"", label:'Select'},
        {value:1, label:'Type1'},
        {value:0, label:'Pores'},

      ]
    }
    , {
        title: 'Remarks',
        type: 'textarea',
        name: 'remarks',
        contains:"textarea",
        inpprops:{
          maxlength:128,
          md:12
        },
         },{
        title: 'Rejected Qty',
        type: 'number',
        name: 'Qty1',
        contains: 'number',
        inpprops:{
            min:0,
            step:1
        }
    },
   


    ]
}
    const acceptedQty = <Row><Col md={5}><Form.Group key="LineNo">
    <Form.Label htmlFor="LineNo">Accepted Qty</Form.Label>
    <Form.Control type="text" id="LineNo" disabled value="45"
    {...register("LineNo",{ required: "Line No is Required" })}/>
    {errors["LineNo"] && ((
<Form.Text className="text-danger">
{errors["LineNo"]['message']}
</Form.Text>
))}
</Form.Group></Col></Row>
  return (
    <CreateForm  template={template}
    // watchFields={['firstname','password']}
     rowwise={rowWiseFields}
     validate={validate}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName="Add"
     btButtons={acceptedQty}>

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

export default InspectionForm