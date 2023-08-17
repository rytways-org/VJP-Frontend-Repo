import React,{useState} from 'react'
import CreateForm from '../../../../Components/Forms/CreateForm'
import {Col,Row,Card} from 'react-bootstrap'
import classes from './dailyentry.module.css'

function QtyForm(props) {
  let rowWiseFields = 2;
  const [defaultValues,setDefaultValues] = useState(props.selected ? props.selected : {})
  const form_header=<>
  <Card body className={classes.title}>
    <Row>
    <Col style={{backgroundColor:"grey",justifyContent:'left',borderRadius:"5%"} } md={2}>Available Qty <br/> 66</Col>
    <Col md={{ span: 6, offset: 1 }}> <h4>{`Enter ${props.selectedItem} Details`}</h4> </Col> 
    <Col style={{backgroundColor:"grey",justifyContent:'right',borderRadius:"5%"}} md={{ span: 2, offset: 1}}>Produced Qty<br/> 89</Col>
    </Row>
    </Card>
  </>
  let [defValues,setDefValues]=useState(props.selected);
  let template = {
    heading:"Enter Accepted Quantity",
     fields: [
        {
            title: 'Accepted Qty',
            type: 'text',
            name: 'acceptedQty',
            contains:"text",
            validation:"Accepted Quantity is Required",
            inpprops:{
              format:"dd/mm/yy"
            },
      },
    ]
}


function onSubmit(values) {
  props.saveFunction(values);
  setDefValues({});
}
  return (
    <>
    <CreateForm  template={template}
    // watchFields={['firstname','password']}
     rowwise={rowWiseFields}
     validate={validate}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName="Save Qty"
     defaultValues={defaultValues}>
     </CreateForm>
     </>
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

export default QtyForm