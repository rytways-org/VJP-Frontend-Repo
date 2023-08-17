import React, { useState, useEffect, useCallback } from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import api from "../../../Api";
import useFetch, { Provider } from "use-http";
import Ctheme from "../../../Components/Ctheme/Ctheme";


const styles = {
  upper: {
    
    padding: "0", // Add the padding property here
  },
  upperRow: {
    
    padding: '0.5rem 1rem',
   
  },
  uppertitle: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: '0',
    backgroundColor: Ctheme.colors.ttle,
  },
};
const rowWiseFields = 3;

function StockInwardForm(props) {
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
    heading: "Gate Entry",
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
        title: "Grn Number",
        type: "text",
        name: "OrderDate",
        contains: "text",
        validationProps: "Internal Part No is required",
        inpprops: {
          format: "dd/mm/yyyy",
        },
      },
      {
        title: "Po Number",
        type: "text",
        name: "OrderDate",
        contains: "text",
        validationProps: "Internal Part No is required",
        inpprops: {
          format: "dd/mm/yyyy",
        },
      }, {
        title: "Invoice No",
        type: "text",
        name: "OrderDate",
        contains: "text",
        validationProps: "Internal Part No is required",
        inpprops: {
          format: "dd/mm/yyyy",
        },
      },     
      {
        title: "Invoice Value",
        type: "text",
        name: "OrderDate",
        contains: "text",
        validationProps: "Internal Part No is required",
        inpprops: {
          format: "dd/mm/yyyy",
        },
      },{
        title: "Vechicle No",
        type: "text",
        name: "OrderDate",
        contains: "text",
        validationProps: "Internal Part No is required",
        inpprops: {
          format: "dd/mm/yyyy",
        },
      },
     {
        title: "Supplier Name",
        type: "text",
        name: "OrderDate",
        contains: "text",
        validationProps: "Internal Part No is required",
        inpprops: {
          format: "dd/mm/yyyy",
        },
      },{
        title: "Remarks",
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

export default StockInwardForm;


