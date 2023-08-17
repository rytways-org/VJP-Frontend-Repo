import React ,{useState}from 'react'
import SearchCard from '../../../UI/cards/SearchCard'
import DisplaySpecifications from '../processfields/common/DisplaySpecifications'
import HeatTreatmentForm from './HeatTreatmentForm'

function HeatTreatment(props) {

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
  return (
    <> 
    {props.displayProcess &&
    <SearchCard title="HeatTreatment" buttonName="Edit specs" onHeaderClick={showFormHandler} bottonShow={showform}>
     {showform && <HeatTreatmentForm onCancel={showFormHandler}/>}
     {!showform && <DisplaySpecifications specifications={fields}></DisplaySpecifications>}
   </SearchCard>
}
</>
  )
}

export default HeatTreatment
