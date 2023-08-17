import React ,{useState}from 'react'
import SearchCard from '../../../UI/cards/SearchCard'
import DisplaySpecifications from '../processfields/common/DisplaySpecifications'
import QualityForm from './QualityForm'

function Quality(props) {

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
    <SearchCard title="Quality" buttonName="Edit specs" onHeaderClick={showFormHandler} bottonShow={showform}>
     {showform && <QualityForm onCancel={showFormHandler}/>}
     {!showform && <DisplaySpecifications specifications={fields}></DisplaySpecifications>}
   </SearchCard>
}</>
  )
}

export default Quality
