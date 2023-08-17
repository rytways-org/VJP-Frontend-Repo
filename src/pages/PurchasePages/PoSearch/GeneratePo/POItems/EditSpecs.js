import react from 'react'
import { Card } from 'react-bootstrap';
import CreateForm from '../../../../../Components/Forms/CreateForm'

function EditSpecs(props){
    let rowWiseFields = 2;

    let template = {
      heading: 'Edit Specifications',
      fields: [
       {
        title: 'Edit Specs',
        type: 'text',
        name: 'specs',
        contains: 'text',
        inpprops:{}       
    }
      ]
  }
  
  
  function onSubmit(values) {
   props.handleEditRequests("SpecsEdit",values.specs,"",props.rowData)
            
  }
  
  
    return (
      <Card>
      <CreateForm  template={template}
      // watchFields={['firstname','password']}
       rowwise={rowWiseFields}
       validate={validate}
       onSubmit={onSubmit} 
       onCancel={props.onCancel}
       defaultValues={props.rowData}
       buttonName="Save">
       </CreateForm>
       </Card>
    )
}

function validate(watchValues, errorMethods) {
    let { errors, setError, clearErrors } = errorMethods;
  
    // Firstname validation
    if (watchValues[0] > 0) {
        console.log(watchValues[0]);
      }
  }

export default EditSpecs;