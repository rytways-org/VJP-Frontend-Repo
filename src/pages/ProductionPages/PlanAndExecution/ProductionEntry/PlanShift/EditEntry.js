import React from 'react'
import { Card } from 'react-bootstrap';
import CreateForm from '../../../../../Components/Forms/CreateForm'

import { useSelector, useDispatch } from "react-redux";
import { alertActions } from "../../../../../store/alert-slice";

function EditEntry(props) {

  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);
  const dispatch = useDispatch();
  let rowWiseFields = 2;

  let template = {
    heading: 'Edit Production Quantity',
    fields: [
      {
        title: 'Old Qty',
        type: 'disabled',
        name: 'oldEntry',
        contains: 'disabled',
        value:props.selectedItem.producedQty
         
    }, {
      title: 'New Qty',
      type: 'number',
      name: 'editedQty',
      contains: 'number',
      inpprops:{step:1,max:Number(props.selectedItem.producedQty)+Number(props.selectedItem.availableStock)}       
  }
    ]
}
const AlertHandler = (alertContent, alertType) => {
  dispatch(
    alertActions.showAlertHandler({
      showAlert: !showAlert,
      alertMessage: alertContent,
      alertVariant: alertType,
    })
  );
};

function onSubmit(values) {
  if(Number(values.editedQty)-Number(props.selectedItem.producedQty)>Number(props.selectedItem.availableStock)){
    AlertHandler("Produced Qty cannot be greater than Avail Stock", "success");
        
  }else{
  const oldQty =props.selectedItem.producedQty
  props.selectedItem.producedQty=values.editedQty
  props.selectedItem.availableStock = props.selectedItem.availableStock -(values.editedQty-oldQty)
  props.saveFunction(props.selectedItem)
  }
}


  return (
    <Card>
    <CreateForm  template={template}
     //watchFields={['firstname','password']}
     rowwise={rowWiseFields}
     validate={validate}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName="Save">
     </CreateForm>
     </Card>
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

export default EditEntry