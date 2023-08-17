import React ,{useState}from 'react'
import SearchCard from '../../../UI/cards/SearchCard'
import DisplaySpecifications from '../processfields/common/DisplaySpecifications'
import GravityDieCastingSCForm from './GravityDieCastingSCForm'

function GravityDieCastingSC(props) {

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
    <SearchCard title="Gravity Die Casting with SandCore" buttonName="Edit specs" onHeaderClick={showFormHandler} bottonShow={showform}>
     {showform && <GravityDieCastingSCForm onCancel={showFormHandler}/>}
     {!showform && <DisplaySpecifications specifications={fields}></DisplaySpecifications>}
   </SearchCard>
}</>
  )
}

export default GravityDieCastingSC
