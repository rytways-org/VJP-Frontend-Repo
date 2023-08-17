import React, { useState, useEffect, useCallback } from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import POItems from "./POItems/POItems";
import api from "../../../Api";
import useFetch, { Provider } from "use-http";

const rowWiseFields = 3;
const prods =[];
const custs = [];

function PoEntry(props) {
  const { get, post, response, loading, error } = useFetch({ data: [] });

  let [deliveries, setDeliveries] = useState(props.selectedItem.deliveries
    ? props.selectedItem.deliveries
    : []);

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
    heading: "PO Entry",
    fields: [
      {
        title: "PO Date",
        type: "date",
        name: "OrderDate",
        contains: "date",
        validationProps: "Internal Part No is required",
        inpprops: {
          format: "dd/mm/yyyy",
        },
      },
      {
        title: "PO Number",
        type: "text",
        name: "productId",
        contains: "text",
        validationProps: "Internal Part No is required",
        inpprops: {
          format: "dd/mm/yyyy",
        },
      },
      {
        title: "Company",
        type: "select",
        name: "prodSubCats",
        contains: "Select",
        options: [
          { value: "Select", label: "Select" },
          { value: "SubProduct1", label: "VJP Foundaries" },
          { value: "SubProduct2", label: "VJP Aluminium" },
        ],
      },
      {
        title: "Supplier",
        type: "select",
        name: "prodSubCats",
        contains: "Select",
        options: [
          { value: "Select", label: "Select" },
          { value: "SubProduct1", label: "Vinayaga Indusries" },
          { value: "SubProduct2", label: "Noor Welders" },
        ],
      },{
        title: "Delivery Address",
        type: "textarea",
        name: "productId",
        contains: "textarea",
        validationProps: "Internal Part No is required",
        inpprops: {
          md:4
        },
      },
    
    ],
  };
  function validate(watchValues, errorMethods) {
    let { errors, setError, clearErrors } = errorMethods;
  
    // Firstname validation
   
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
      btButtons={<POItems
        data={deliveries}
        onDeliveryUpdate={addDeliveriesHandler}
      />}
    ></CreateForm>
  );
}

export default PoEntry;


