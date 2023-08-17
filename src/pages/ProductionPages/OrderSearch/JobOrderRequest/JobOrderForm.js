import React, { useState, useCallback, useEffect } from "react";
import CreateForm from '../../../../Components/Forms/CreateForm'
import api from "../../../../Api";
import { useSelector, useDispatch } from "react-redux";
import useFetch, { Provider } from "use-http";
import { alertActions } from "../../../../store/alert-slice";
import SimpleCard from "../../../../UI/cards/SimpleCard";
import Table from "../../../../Components/tables/Table";
import Ctheme from "../../../../Components/Ctheme/Ctheme";

const styles = {
  upper: {
    padding:Ctheme.paddings.pd,
   backgroundColor: Ctheme.colors.dg ,
   borderRadius:'1em'
  },
};


const rowWiseFields=4
function JobOrderForm(props) {

  const { get, post, response, loading, error } = useFetch({ data: [] });
  
  const getComingAfter = (goingBefore) => async () => {
    console.log(goingBefore)
    const selectArray = [{"value":"","label":"Select"}]
    if (goingBefore) {
      const ppmaps = await post(api + "/ppMap/loadOptionsAfter", {
        "id": goingBefore,
      });
      if (response.ok) {
        setComingAfter([...selectArray,...ppmaps])
      } else {

      }
    }
  };

  const [vendors,setVendors] =useState([{"value":"","label":"Select"}]);
  const [goingBefore,setGoingBefore] =useState([{"value":"","label":"Select"}]);
  const [comingAfter,setComingAfter] =useState([{"value":"","label":"Select"}]);
  const loadInitialOptions = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const loadedVendors = await get(api+"/supplier/loadOptions");
    setVendors([...vendors,...loadedVendors]);
    const processMaps = await post(api+"/ppMap/loadOptions",{"id":props.selected.product.productId});
    setGoingBefore([...goingBefore,...processMaps]);
  }, [get, response]);
  const [loadState,setLoadState] = useState(Math.random());

  useEffect(() => { loadInitialOptions() }, [loadState]) // componentDidMount


    const status={
    title: 'JO Status',
    type: 'select',
    name: 'status',
    contains: 'Select',
    validationProps: "Please Select Job Order status",
    options:[
    {value:"", label:'Select'},
    {value:1, label:'Send For Approval'},
    {value:2, label:'Approved'},
    {value:3, label:'Po Generated'},
    {value:4, label:'Closed'},
    {value:4, label:'Rejected'}
  ]

    }
    const template = {
        fields: [
             {
                 title: 'Date',
                 type: 'date',
                 name: 'joDate',
                 contains:"date",
                 validation:"Date is Required",
                 inpprops:{
                   format:"dd/mm/yyyy"
                 },   
           },
           {
             title: 'Quantity',
             type: 'number',
             name: 'requestedQty',
             contains:"number",
             validation:"Quantity is Required",
             inpprops:{
                 min:1,
                 step:1,
                 max:props.maxQty
             }, 
       }, {
        title: 'Outward Going before',
        type: 'select',
        name: 'goingBefore',
        contains: 'Select',
        validationProps: "Please Select Process",
        options:goingBefore
    }, {
      title: 'Inward Coming After',
      type: 'select',
      name: 'comingAfter',
      contains: 'Select',
      validationProps: "Please Select Process",
      options:comingAfter
  },
       {
        title: 'Company Name',
        type: 'select',
        name: 'supplierId',
        contains: 'Select',
        validationProps: "Please Select Outsorce Comppany Name",
        options:vendors
    },{
      title: 'Target Days',
      type: 'number',
      name: 'targetDays',
      contains: 'number',
      validationProps: "Target Days is required",
      inpprops:{
          min:1,
          max:365
      }
  },
       {
           title: 'Remarks',
           type: 'textarea',
           name: 'remarks',
           contains:"textarea",
           inpprops:{
             maxlength:128,
             md:3
           },
           value:(props.selected.id ? props.selected.Remarks : "")   
     },{
      type: "hidden",
      name: "orderId",
      contains: "number",
      value: props.orderId,
    },
           ]
       }
      const buttonName=(props.approval ? "Edit" : "Add")
  
      function onSubmit(values) {
          console.log(values);
         values.approvedQty = values.requestedQty;
          props.saveFunction(values)
        }
        function validate(watchValues, errorMethods) {
          let { errors, setError, clearErrors } = errorMethods;
          // console.log(watchValues["serielNoTo"]);
          // Firstname validation
          if (watchValues[0] !== "") {
            //  console.log(watchValues[0]);
            {
              getComingAfter(watchValues[0])();
            }
          }
        }    

  return (
    <CreateForm  template={template} 
    rowwise={rowWiseFields}
     validate={validate}
     watchFields={["goingBefore"]}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName={buttonName}
     defaultValues={props.selectedItem} 
     styles={styles}>
     </CreateForm>
   
  )
}

export default JobOrderForm
      
 
    