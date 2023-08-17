import React, { useState, useEffect, useCallback } from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import PurchaseItems from "./PurchaseItems/PurchaseItems";
import api from "../../../Api";
import useFetch, { Provider } from "use-http";
import Ctheme from "../../../Components/Ctheme/Ctheme";

const styles = { 
  
  upper: {
  padding:'0'
  },
  upperRow: {padding:'1rem'},
uppertitle: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: '0',
    backgroundColor: Ctheme.colors.ttle,
    
  },
};
const rowWiseFields = 3;

function MaterialRequestForm(props) {
  const { get, post, response, loading, error } = useFetch({ data: [] });

  let [deliveries, setDeliveries] = useState(props.selectedItem.deliveries
    ? props.selectedItem.deliveries
    : []);

  const [maxQty,setMaxQty] = useState(props.selectedItem ? props.selectedItem.quantity : 1);
  const addDeliveriesHandler = (values,action) => {
    if(action==="add"){
      setDeliveries(oldDeli=>[...oldDeli,values])
    }else{
      console.log({...values})
      setDeliveries(deliveries.filter(function( obj ) {
             return obj.lineNo !== values.lineNo;
         }))
    }
  };

  const [prods, setProds] = useState([{ value: "", label: "Select" }]);

  const loadInitialOptions1 = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const loadedprods = await get(api + "/product/loadOptions");
    setProds([...prods, ...loadedprods]);
    // console.log({...props.selectedItem})
  }, [get, response]);

  useEffect(() => {
    loadInitialOptions1();
  }, []); // componentDidMount

  function onSubmit(values) {
    values.deliveries = deliveries;
    props.saveFunction(values);
    console.log(values);
    //props.saveFunction(values);
  }

  const template = {
    heading: "Material Dispose Entry",
    fields: [
      {
        title: "Inward Date",
        type: "date",
        name: "OrderDate",
        contains: "date",
        validationProps: "Internal Part No is required",
        inpprops: {
          format: "dd/mm/yyyy",
        },
      },

      {
        title: "Material",
        type: "select",
        name: "Material",
        validationProps: "Please select Shift",
        contains: "Select",
        options: [
          { value: "", label: "Select" },
          { value: "Shift_A", label: "Material1" },
          { value: "Shift_B", label: "Material12" },
          { value: "Shift_C", label: "Material13" },
          { value: "Shift_C", label: "Material14" },
        ],
      },
      {
        title: "Quantity",
        type: "text",
        name: "OrderDate",
        contains: "text",
        validationProps: "Internal Part No is required",
        inpprops: {
          format: "dd/mm/yyyy",
        },
      }, {
        title: "Type of Damage",
        type: "select",
        name: "Material",
        validationProps: "Please select Shift",
        contains: "Select",
        options: [
          { value: "", label: "Select" },
          { value: "Shift_A", label: "Discard" },
          { value: "Shift_B", label: "Scrap" },
          { value: "Shift_C", label: "Serviceable" }
        ],
      },
      {
        title: "Reason For Damage",
        type: "textarea",
        name: "OrderDate",
        contains: "textarea",
        validationProps: "Internal Part No is required",
        inpprops: {
          md: 4,
        },
      },
    ],
  };
  function validate(watchValues, errorMethods) {
    let { errors, setError, clearErrors } = errorMethods;
  
    // Firstname validation
    if (watchValues[0] > 0) {
        console.log(watchValues[0]);
        setMaxQty(watchValues[0]);
      }
  }
  return (
    <CreateForm
      template={template}
      rowwise={rowWiseFields}
      watchFields={["quantity"]}
      validate={validate}
      onSubmit={onSubmit}
      onCancel={props.onCancel}
      buttonName="Submit"
      defaultValues={props.selectedItem}
      styles={styles}
    ></CreateForm>
  );
}

export default MaterialRequestForm;


