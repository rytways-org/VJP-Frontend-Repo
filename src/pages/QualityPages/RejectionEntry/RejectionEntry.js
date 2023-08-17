import React,{useEffect, useState} from 'react'
import RejectionForm from './RejectionForm'
import Table from '../../../Components/tables/Table'
import RejectionTable from './RejectionTable'

function RejectionEntry(props) {
  const dataintial = props.data ? props.data : []
  const [deliveries,setDeliveries] =useState(dataintial)
  const [defValues,setDefValues] =useState({})
  const [maxQty,setMaxQty]=useState(deliveries.length>0 ? props.maxQty-deliveries.map(item => item.quantity).reduce((prev, next) => prev + next) : props.maxQty);

  //useEffect(()=>{saveDeliveries()},[])
  const saveRejections=(values)=>{
   // setMaxQty(maxQty-values.quantity)
     // values.revisedDate=values.deliveryDate
    // setDeliveries(oldDeli=>[...oldDeli,values])
    // setDeliveries((state) => {
    //   console.log({...state})
    //   return state
    // });
    values.random = Math.random();
    props.onRejectionUpdate(values,"add")
     
    
  //  {deliveries ? setDeliveries([...deliveries,values])};
  }
  const handleEdit=(values)=>()=>{
   // console.log({...item})
   // setDefValues(item)
  //   setDeliveries(deliveries.filter(function( obj ) {
  //     return obj.lineNo !== values.lineNo;
  // }))
  props.onRejectionUpdate(values,"delete")
  //propsrejectQty(values,"deleted")

  }


  return (
   <div style={{padding:'0rem 1rem'}}>
   <RejectionForm saveRejections={saveRejections} defaultValues={defValues} maxQty = {maxQty} defects={props.defects}></RejectionForm>
   <Table data={dataintial} cols={RejectionTable(handleEdit,"",[6,5])} ></Table>
   </div>
  )
}

export default RejectionEntry
