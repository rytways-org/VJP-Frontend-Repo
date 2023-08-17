import React, { useEffect, useState } from "react";
import DeliveryForm from "./POItemsForm";
import Table from "../../../../../Components/tables/Table";
import { deliveryData } from "./DeliveryData";
import { POItemsTable } from "./POItemsTable";
import POItemsForm from "./POItemsForm";
import { data } from "./data";
import PoFooter from "./PoFooter";
import api from "../../../../../Api";
import useFetch, { Provider } from "use-http";

function POItems(props) {
  const dataintial = props.data ? props.data : [];
  const [defValues, setDefValues] = useState({});
  const [matReqs, setMatReqs] = useState(props.data ? props.data : []);
  const [table,setTable] = useState()
  const [materials,setMaterials] = useState(props.materials)

  
  const [disabledValues, setDisabledValues] = useState({
    materialName: "",
    uom: "",
  });
  const { get, post, response, loading, error } = useFetch({ data: [] });
  
  const loadUomDeatils = async (materialId) => {
    console.log(materialId);
    const material = await post(api + "/material/getById", {
      materialId: materialId,
    });
    if (response.ok) {
      setDisabledValues((disabledValues) => ({ ...material}));
    } else {
      setDisabledValues("Not Available");
    }
    //setProds([...prods,...loadedprods])
    console.log(disabledValues)
  };

  const loadCatMaterials = async (category) => {
    // console.log(materialId);
     const material = await post(api + "/material/loadOptionsByCategory", {
       category: category,
     });
     if (response.ok) {
       setMaterials([{ value: "", label: "Select" },...material])
     } 
     };

 
  const updateTable=(action,value,rowData)=>{
    props.handleEdit(action,value,rowData)
  }

  const showFormHandler=(rowData,action)=>()=>{
    if(action==="delete"){
      props.handleEdit(action,"",rowData)
    }else{
      props.showFormHandler(rowData, action)
    }
    
    
  }
  const onSubmit=(values,action)=>{
    const finalSubmit ={}
    if(action==="termsAndConId"){
      finalSubmit.termsAndConId=values.termsAndConId
   
    }else if(action==="roundOff"){

    }else if(action = "notes"){

    }
    finalSubmit.roundOff =values.roundOff
    finalSubmit.notes= values.notes
    finalSubmit.termsAndConId = values.termsAndConId
    props.finalSubmit(finalSubmit)
    props.submitValues()
  }  
  return (
    <div style={{padding: '0 1.5rem'}}>
      <POItemsForm
        loadMaterials={loadUomDeatils}
        loadCatMaterials={loadCatMaterials}
        loadedMaterial={disabledValues}
        materials={materials}
        defaultValues={defValues}
        savePo = {props.savePo}
        data = {props.data}
      ></POItemsForm>
     {<Table
    data={props.data}
    cols={POItemsTable(showFormHandler,props.handleEdit, "")}
  ></Table>}
      <PoFooter
        gstAmt={props.gstAmt}
        gross={props.gross}
        net={props.net}
        igstAmt ={props.igstAmt}
        terms = {props.terms}
        saveValues = {props.finalSubmit}
      ></PoFooter>
    </div>
  );
}

export default POItems;
