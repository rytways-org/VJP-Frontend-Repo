import React,{useState} from 'react'
import CreateForm from '../../../../Components/Forms/CreateForm'
import {Col,Row,Card} from 'react-bootstrap'
import classes from './dailyentry.module.css'
import Ctheme from '../../../../Components/Ctheme/Ctheme'


const styles = { 
  
  upper: {
  padding:'0'
  },
  upperRow: {padding:'1rem'},
uppertitle: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: '0',
    backgroundColor: Ctheme.colors.ttle,
  },
};
function QtyForm(props) {
  let rowWiseFields = 2;

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
    heading:"Approve Damaged Goods",
     fields: [
        {
            title: 'Reason for Disposal of The Material',
            type: 'textarea',
            name: 'revisedDate',
            contains:"textarea",
            validation:"Accepted Quantity is Required",
            inpprops:{
              md:6
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
     buttonName="Approve"
     defaultValues={defValues}
     styles={styles}>
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