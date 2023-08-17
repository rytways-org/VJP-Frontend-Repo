import React ,{useState}from 'react'
import SearchCard from '../../../UI/cards/SearchCard'
import DisplaySpecifications from '../processfields/common/DisplaySpecifications'
import TestingForm from './TestingForm'

function Testing(props) {

  const displayProcess = props.displayProcess

  const fields = {
    tensile:"",
    MechanicalProperties:"",
    InHouse:"",
    OutSourcing:"",
    Sampling :"",
    Remarks:""
  }
  const [showform,setShowForm]=useState(false);

  const showFormHandler=()=>{
    setShowForm(!showform)
  }

  const [showTesting,setShowTesting]=useState(false);

  const showTestingHandler=()=>{
    setShowTesting(!showTesting)
  }

  return (
    <>
      {props.displayProcess &&
     <SearchCard title="Testing" buttonName="Edit specs" 
     onHeaderClick={showFormHandler} bottonShow={showform}>
     {showform && <TestingForm onCancel={showFormHandler}/>}
     {!showform && <DisplaySpecifications specifications={fields}></DisplaySpecifications>}
    </SearchCard> 
      }
      </>
    )
  }

export default Testing
