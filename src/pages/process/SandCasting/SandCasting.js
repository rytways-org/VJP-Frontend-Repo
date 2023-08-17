import React ,{useState}from 'react'
import SearchCard from '../../../UI/cards/SearchCard'
import DisplaySpecifications from '../processfields/common/DisplaySpecifications'
import SandCastingForm from './SandCastingForm'

function SandCasting(props) {

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
    <SearchCard title="Sand Casting" buttonName="Edit specs" onHeaderClick={showFormHandler} bottonShow={showform}>
     {showform && <SandCastingForm onCancel={showFormHandler}/>}
     {!showform && <DisplaySpecifications specifications={fields}></DisplaySpecifications>}
   </SearchCard>
}</>
  )
}

export default SandCasting
