import React,{useEffect, useState} from 'react'
import DeliveryForm from './POItemsForm'
import Table from '../../../../Components/tables/Table'
import {deliveryData} from './DeliveryData'
import { POItemsTable } from './POItemsTable'
import POItemsForm from './POItemsForm'
import {data} from './data'
import PoFooter from './PoFooter'

function POItems(props) {
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
   <POItemsForm saveDeliveries={saveDeliveries} defaultValues={defValues} maxQty = {maxQty}></POItemsForm>
   <Table data={data} cols={POItemsTable(handleEdit,"",[6,5])} ></Table>
   <PoFooter></PoFooter>
   </>
  )
}

export default POItems
