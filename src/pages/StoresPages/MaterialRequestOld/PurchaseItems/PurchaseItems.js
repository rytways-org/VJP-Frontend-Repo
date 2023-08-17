import React,{useEffect, useState} from 'react'
import ItemsForm from './ItemsForm'
import Table from '../../../../Components/tables/Table'
import {deliveryData} from './DeliveryData'
import PurchaseItemsTable from './PurchaseItemsTable'
import CostCenter from './CostCenter'

function PurchaseItems(props) {
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
   <CostCenter saveDeliveries={saveDeliveries} defaultValues={defValues} maxQty = {maxQty}></CostCenter>
   <ItemsForm saveDeliveries={saveDeliveries} defaultValues={defValues} maxQty = {maxQty}></ItemsForm>
   <Table data={deliveryData} cols={PurchaseItemsTable(handleEdit,"",[6,5])} ></Table>
   </>
  )
}

export default PurchaseItems
