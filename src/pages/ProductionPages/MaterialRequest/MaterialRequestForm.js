import React, { useState, useEffect, useCallback ,useContext} from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import PurchaseItems from "./MaterialItems/PurchaseItems";
import api from "../../../Api";
import useFetch, { Provider } from "use-http";
import AuthContext from '../../../store/auth-context';
import Ctheme from "../../../Components/Ctheme/Ctheme";

const styles = {
  upper: {
    padding: "0", // or padding: "0px"
  },
  uppertitle: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: '0'
  },
  upperRow: {
    margin: '.5rem .5rem 0 .5rem',
    backgroundColor:Ctheme.colors.dg,
    borderRadius: '1em'
  },
};


const rowWiseFields = 3;

function PurchaseRequestForm(props) {
  const { get, post, response, loading, error } = useFetch({ data: [] });
  

  let [prItems, setprItems] = useState(props.selectedItem.materialRequests
    ? props.selectedItem.materialRequests
    : []);
    const authCtx = useContext(AuthContext);
    let userId =authCtx.userId;
    console.log(userId);
  const [maxQty,setMaxQty] = useState(props.selectedItem ? props.selectedItem.quantity : 1);
  const addprItemsHandler = (values,action) => {
    if(action==="add"){
      setprItems(oldItems=>[...oldItems,values])
      console.log(prItems)
    }else{
      console.log({...values})
      setprItems(prItems.filter(function( obj ) {
             return obj.materialId !== values.materialId;
         }))
    }
  };

  const [materials, setMaterials] = useState([{ value: "", label: "Select" }]);

  const loadInitialOptions1 = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const loadedmaterials = await get(api + "/material/loadOptions");
    setMaterials([...materials, ...loadedmaterials]);
    // console.log({...props.selectedItem})
  }, [get, response]);

  useEffect(() => {
    loadInitialOptions1();
  }, []); // componentDidMount

  function onSubmit(values) {
    values.storesRequestItems = prItems;
    //values.userId = userId;
    console.log(values);
    props.saveFunction(values);
    //props.saveFunction(values);
  }

  const template = {
    heading: "Purchase Request Entry",
    fields: [
      {
        title: "Req Number",
        type: "text",
        name: "requestNo",
        contains: "text",
        inpprops: {
          
        },
      },
      {
        title: "Req Date",
        type: "date",
        name: "requestDate",
        contains: "date",
        validationProps: "Internal Part No is required",
        inpprops: {
          format: "dd/mm/yyyy",
        },
      },
      {
        title: 'Purpose',
        type: 'textarea',
        name: 'purpose',
        contains:"textarea",
        inpprops:{
          maxlength:128,
          md:4
        },
         },
         {
          type: "hidden",
          name: 'status',
          contains:"hidden",
          value:"Requested"
          
           },
           {
           type: "hidden",
            name: 'userId',
            contains:"hidden",
            value:userId,
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
      btButtons={<PurchaseItems
        materials={materials}
        data={prItems}
        onPrItemsUpdate={addprItemsHandler}
        maxQty = {maxQty}
      />}
    ></CreateForm>
  );
}

export default PurchaseRequestForm;


