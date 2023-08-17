import React, { useEffect, useState } from "react";
import ItemsForm from "./ItemsForm";
import Table from "../../../../Components/tables/Table";
import { deliveryData } from "./DeliveryData";
import PurchaseItemsTable from "./PurchaseItemsTable";
import api from "../../../../Api";
import useFetch, { Provider } from "use-http";



const styles = { 
  table: {
  padding: ".5rem",
  
  },
  upper: {
    padding:'1rem',
  }
};
function PurchaseItems(props) {
  const dataintial = props.data ? props.data : [];
  const [prItems, setPrItems] = useState(dataintial);
  const [disabledValues,setDisabledValues]=useState({"materialName":"","uom":""});
  const { get, post, response, loading, error } = useFetch({ data: [] });
  
  const [defValues, setDefValues] = useState({});
  const [maxQty, setMaxQty] = useState(
    prItems.length > 0
      ? props.maxQty -
          prItems
            .map((item) => item.quantity)
            .reduce((prev, next) => prev + next)
      : props.maxQty
  );

  //useEffect(()=>{saveprItems()},[])
  const saveprItems = (values) => {
    //setMaxQty(maxQty - values.quantity);
    //values.revisedDate = values.deliveryDate;
    // setPrItems(oldDeli=>[...oldDeli,values])
    // setPrItems((state) => {
    //   console.log({...state})
    //   return state
    // });
  //   values.material ={}
  //   values.material.materialName =  disabledValues.materialName
  //   values.material.uom = disabledValues.uom
  //  // values.materialRequestPRId = Math.random()
    props.onPrItemsUpdate(values, "add");

    //  {prItems ? setPrItems([...prItems,values])};
  };
  const handleEdit = (values) => () => {
    //   console.log({...item})
    //   setDefValues(item)
        setPrItems(prItems.filter(function( obj ) {
          return obj.materialId !== values.materialId;
     }))
    // setMaxQty(maxQty+values.quantity)
    props.onPrItemsUpdate(values, "deleted");
  };
  const loadUomDeatils = async(materialId)=>{
    console.log(materialId);
    const material= await post(api + "/material/getById", {
      materialId: materialId,
    });
    if (response.ok) {
      setDisabledValues(disabledValues=>({...material}));
    } else {
      setDisabledValues("Not Available");
    }
    //setProds([...prods,...loadedprods])
  }

  return (
    <div style={{padding: '0 1.5em'}}>
      <ItemsForm
        saveprItems={saveprItems}
        defaultValues={defValues}
        maxQty={maxQty}
        materials={props.materials}
        materialChange = {loadUomDeatils}
        uom ={disabledValues.uom}
      ></ItemsForm>
      <Table
        data={props.data}
        cols={PurchaseItemsTable(handleEdit, "", [6, 5])}
     styles={styles} ></Table>
    </div>
  );
}

export default PurchaseItems;
