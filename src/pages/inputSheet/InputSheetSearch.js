import React,{useState} from 'react'
import SearchCard from '../../UI/cards/SearchCard'
import CreateForm from '../../Components/Forms/CreateForm'
import Table from '../../Components/tables/Table';
import { data } from './data';
import { InputSheetTable } from './InputSheetTable';
import {Container, Row} from "react-bootstrap";
import SimpleCard from '../../UI/cards/SimpleCard'
import classes from './inputsheet.module.css'
import Modal from '../../UI/Modal/Modal'
import InputSheet from './InputSheet';

const rowWiseFields = 4;
const template = {
     fields: [
          {
              title: 'RFQ No',
              type: 'text',
              name: 'tensile',
              contains:"text"
        },
        {
          title: 'Name of Customer',
          type: 'text',
          name: 'MechanicalProperties',
          contains: 'text',
          validationProps: "Customer Name is required"
      },
      {
          title: 'Part Name',
          type: 'text',
          name: 'MechanicalProperties',
          contains: 'text',
          validationProps: "Part Name is required"
      },
      {
        title: 'Part Size',
        type: 'text',
        name: 'MechanicalProperties',
        contains: 'text',
        validationProps: "Part Size is required"
    }
        ]
    }



function InputSheetSearch(props) {

const [showform,setShowForm]=useState(false);

  const showFormHandler=()=>{
    setShowForm(!showform)
  }

  const handleEdit = (item) => () => {
    // write your logic
    alert(JSON.stringify(item))
  }
  

  return (    
    <div className={classes.container} >
     {showform && <Modal onClose={showFormHandler} size={10}><InputSheet onCancel={showFormHandler}/></Modal>}
      <SearchCard title="Input Sheet Search" 
        buttonName="Add" 
        onHeaderClick={showFormHandler} 
        bottonShow={showform}>
    <CreateForm  template={template}
     rowwise={rowWiseFields}
     validate={validate}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName="Search">
     </CreateForm>
      </SearchCard>
        <SimpleCard md={12}>
        <Table cols={InputSheetTable(handleEdit)} data={data} striped/>
      </SimpleCard>
      </div>
  )
}

export default InputSheetSearch


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
  