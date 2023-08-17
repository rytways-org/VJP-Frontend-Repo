
import React, { useState, useEffect, useCallback } from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import DeliverySchedule from "./DeliverySchedule/DeliverySchedule";
import api from "../../../Api";
import useFetch, { Provider } from "use-http";
import { borderRadius } from "@mui/system";
import Ctheme from "../../../Components/Ctheme/Ctheme";

const styles = {
  upper: {
    
    padding: "0", 
    
  },
  upperRow: {
    margin: Ctheme.margins.mg,
    padding: Ctheme.paddings.pd,
    backgroundColor: Ctheme.colors.dg,
    borderRadius:'1rem'
  },
  uppertitle: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: '0',
    backgroundColor:Ctheme.colors.ttle,
  },
};

const rowWiseFields = 3;

function OrderEntry(props) {
  const { get, post, response, loading, error } = useFetch({ data: [] });

  const [defaultValues,setDefaultValues] = useState(props.selectedItem ? props.selectedItem : {})

  // if(defaultValues.orderId>0){
  //     setDefaultValues
  // }

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
  const [custs,setCusts] = useState([{value:"",label:"Select"}]);

  const loadInitialOptions1 = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
   // const loadedprods = await get(api + "/product/loadOptions");
    const loadedprods = await get(api + "/customer/loadOptions");
   // setProds([...prods, ...loadedprods]);
   setCusts([...custs,...loadedprods])
    // console.log({...props.selectedItem})
  }, [get, response]);

  const loadProducts = useCallback(async(customerId)=>{
    const loadedprods = await post(api + "/product/loadProductsByCustomer" , {"id":customerId});
   // setProds([...prods, ...loadedprods]);
   setProds([...prods,...loadedprods])
  }, [post, response]);

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
    heading: "Order Entry",
    fields: [
      {
        title: "Order Number",
        type: "text",
        name: "orderNo",
        contains: "text",
        inpprops: {
          minlength: 3,
          maxlength: 80,
        },
      },{
        title: "Customer Name",
        type: "select",
        name: "customerId",
        contains: "Select",
        options: custs,
        validationProps: "Product Name is required",
      },
      {
        title: "Product Name",
        type: "select",
        name: "productId",
        contains: "Select",
        options: prods,
        validationProps: "Product Name is required",
      },
      {
        title: "Quantity",
        type: "number",
        name: "quantity",
        contains: "number",
        validationProps: "Internal Part No is required",
        inpprops: {
          min: 1,
          step: 1,
        },
      },
      {
        title: "Order Date",
        type: "date",
        name: "OrderDate",
        contains: "date",
        validationProps: "Internal Part No is required",
        inpprops: {
          format: "dd/mm/yyyy",
        },
      },
      {
        title: "Target Date",
        type: "date",
        name: "TargetDate",
        contains: "date",
        validationProps: "Internal Part No is required",
        inpprops: {
          format: "dd/mm/yyyy",
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
      }else if(watchValues[1] != ""){
          loadProducts(watchValues[1]);
      }
  }
  return (
    <CreateForm
      template={template}
      rowwise={rowWiseFields}
      watchFields={["quantity","customerId"]}
      validate={validate}
      onSubmit={onSubmit}
      onCancel={props.onCancel}
      buttonName="Submit"
      defaultValues={props.selectedItem}
      styles={styles}
      btButtons={<DeliverySchedule
        data={deliveries}
        onDeliveryUpdate={addDeliveriesHandler}
        maxQty = {maxQty}
      />}
    ></CreateForm>
  );
}

export default OrderEntry;


