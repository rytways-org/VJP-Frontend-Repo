import React ,{useState}from 'react'
import SearchCard from '../../../UI/cards/SearchCard'
import DisplaySpecifications from '../processfields/common/DisplaySpecifications'
import GravityDieCastingForm from './GravityDieCastingForm'

function GravityDieCasting(props) {

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
    <SearchCard title="Gravity Die Casting" buttonName="Edit specs" onHeaderClick={showFormHandler} bottonShow={showform}>
     {showform && <GravityDieCastingForm onCancel={showFormHandler}/>}
     {!showform && <DisplaySpecifications specifications={fields}></DisplaySpecifications>}
   </SearchCard>}
   </>
  )
}

export default GravityDieCasting
