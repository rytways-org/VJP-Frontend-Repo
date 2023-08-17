import React ,{useState}from 'react'
import SearchCard from '../../../UI/cards/SearchCard'
import DisplaySpecifications from '../processfields/common/DisplaySpecifications'
import BlastingForm from './BlastingForm'

function Blasting(props) {

  const fields = {
    SteelShots:"",
    SteelGrits:"",
    AluminiumOxideShots:"",
    SandBlast:"",
    Remarks:""
  }
  const [showform,setShowForm]=useState(false);

  const showFormHandler=()=>{
    setShowForm(!showform)
  }
  return (
    <>
    {props.displayProcess &&
    <SearchCard title="Blasting" buttonName="Edit specs" onHeaderClick={showFormHandler} bottonShow={showform}>
     {showform && <BlastingForm onCancel={showFormHandler}/>}
     {!showform && <DisplaySpecifications specifications={fields}></DisplaySpecifications>}
   </SearchCard>
}
</>
  )
}

export default Blasting
