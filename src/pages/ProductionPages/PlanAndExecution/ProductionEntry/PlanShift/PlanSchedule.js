import React,{useEffect, useState} from 'react'
import OrderAndQty from './OrderAndQty'
import Table from '../../../../../Components/tables/Table'
import {data} from '../../data'
import EntryTable from './EntryTable'

function PlanSchedule(props) {
  const dataintial = props.data ? props.data : []
  const [deliveries,setDeliveries] =useState(dataintial)
  const [defValues,setDefValues] =useState({})
  const [maxQty,setMaxQty]=useState(deliveries.length>0 ? props.maxQty-deliveries.map(item => item.quantity).reduce((prev, next) => prev + next) : props.maxQty);

  //useEffect(()=>{saveDeliveries()},[])
  const saveDeliveries=(values)=>{
    setMaxQty(maxQty-values.quantity)
      values.revisedDate=values.deliveryDate
    // setDeliveries(oldDeli=>[...oldDeli,values])
    // setDeliveries((state) => {
    //   console.log({...state})
    //   return state
    // });
    props.onDeliveryUpdate(values,"add")
     
    
  //  {deliveries ? setDeliveries([...deliveries,values])};
  }
  const handleEdit=(values)=>()=>{
   // console.log({...item})
   // setDefValues(item)
  //   setDeliveries(deliveries.filter(function( obj ) {
  //     return obj.lineNo !== values.lineNo;
  // }))
  setMaxQty(maxQty+values.quantity)
  props.onDeliveryUpdate(values,"deleted")

  }


  return (
   <>
   <OrderAndQty saveDeliveries={saveDeliveries} defaultValues={defValues} maxQty = {maxQty}></OrderAndQty>
   <Table data={data} cols={EntryTable(handleEdit,"",[6,5])} ></Table>
   </>
  )
}

export default PlanSchedule
