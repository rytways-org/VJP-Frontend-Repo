import React ,{useState}from 'react'
import SearchCard from '../../../UI/cards/SearchCard'
import DisplaySpecifications from '../processfields/common/DisplaySpecifications'
import NDTForm from './NDTForm'

function NDT(props) {

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
    <SearchCard title="NDT" buttonName="Edit specs" onHeaderClick={showFormHandler} bottonShow={showform}>
     {showform && <NDTForm onCancel={showFormHandler}/>}
     {!showform && <DisplaySpecifications specifications={fields}></DisplaySpecifications>}
   </SearchCard>
}</>
  )
}

export default NDT
