import React, { useState, useEffect, useCallback } from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import DeliverySchedule from "./Authority/ApprovingAuthority";
import { deliveryData } from "./Authority/DeliveryData";
import api from "../../../Api";
import useFetch, { Provider } from "use-http";
import AuthorityForm from "./Authority/AuthorityForm";
import ApprovingAuthority from "./Authority/ApprovingAuthority";
import Ctheme from "../../../Components/Ctheme/Ctheme";

const styles = {
  upper: {
    
    padding: "0", // Add the padding property here
  },
  upperRow: {
    margin: '.5rem .5rem 0 .5rem',
    padding: '0 1rem 0 1rem',
    backgroundColor: Ctheme.colors.dg,
    borderRadius:'1rem'
  },
  uppertitle: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: '0',
    backgroundColor: Ctheme.colors.ttle,
  },
};
const rowWiseFields = 3;

function ApprovalForm(props) {
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
   // setProds([...prods, ...loadedprods]);
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
    heading: "New Approval Process",
    fields: [
      {
        title: "Process Name",
        type: "text",
        name: "orderNo",
        contains: "text",
        inpprops: {
          minlength: 3,
          maxlength: 80,
        },
      },
      {
        title: "Aproval Type",
        type: "select",
        name: "productId",
        contains: "Select",
        options: [
          { value: "Select", label: "Select" },
          { value: "Product1", label: "Orderly" },
          { value: "Product2", label: "Parallel" },
        ],
        validationProps: "Product Name is required",
      }
      ,{
        title: 'Description',
        type: 'textarea',
        name: 'description',
        contains:"textarea",
        inpprops:{
          maxlength:256,
          md:4
        }
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
      btButtons={<ApprovingAuthority
        data={deliveryData}
        onDeliveryUpdate={addDeliveriesHandler}
        maxQty = {maxQty}
      />}
    ></CreateForm>
  );
}

export default ApprovalForm;


