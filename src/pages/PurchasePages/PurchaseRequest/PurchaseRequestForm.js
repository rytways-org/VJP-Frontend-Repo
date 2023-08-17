import React, { useState, useEffect, useCallback } from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import PurchaseItems from "./PurchaseItems/PurchaseItems";
import api from "../../../Api";
import useFetch, { Provider } from "use-http";

const rowWiseFields = 3;

function PurchaseRequestForm(props) {
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
    heading: "Purchase Request Entry",
    fields: [
      {
        title: "Req Number",
        type: "text",
        name: "orderNo",
        contains: "text",
        inpprops: {
          
        },
      },
      {
        title: "Req Date",
        type: "date",
        name: "OrderDate",
        contains: "date",
        validationProps: "Internal Part No is required",
        inpprops: {
          format: "dd/mm/yyyy",
        },
      },
      {
        title: "Depatment",
        type: "select",
        name: "Department",
        validationProps: "Please select Shift",
        contains: "Select",
        options: [
          { value: "", label: "Select" },
          { value: "Shift_A", label: "Administration" },
          { value: "Shift_B", label: "Production" },
          { value: "Shift_C", label: "Quality" },
          { value: "Shift_C", label: "Stores" },
        ],
      },
      {
        title: 'Purpose',
        type: 'textarea',
        name: 'remarks',
        contains:"textarea",
        inpprops:{
          maxlength:128,
          md:4
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
      btButtons={<PurchaseItems
        data={deliveries}
        onDeliveryUpdate={addDeliveriesHandler}
        maxQty = {maxQty}
      />}
    ></CreateForm>
  );
}

export default PurchaseRequestForm;


