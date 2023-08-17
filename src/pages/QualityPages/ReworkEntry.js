import React,{useState,useCallback,useEffect} from 'react'
import CreateForm from '../../Components/Forms/CreateForm';
import {Row,Col,Card} from 'react-bootstrap'
import classes from '../ProductionPages/ProductionEntry/DailyEntry/dailyentry.module.css'
import api from "../../Api";
import { useSelector, useDispatch } from "react-redux";
import useFetch, { Provider } from "use-http";
import { alertActions } from "../../store/alert-slice";
import QualityTable from "../ProductionPages/ProductionEntry/DailyEntry/QualityTable";
import SimpleCard from "../../UI/cards/SimpleCard";
import Table from "../../Components/tables/Table";
import Ctheme from '../../Components/Ctheme/Ctheme';

const styles = { 
  table: {
  padding: "1rem",
  
  },
  upper: {
    margin: '0.5rem 0',
    padding:'1rem',
    backgroundColor:Ctheme.colors.dg,
    borderRadius:'1em'
  }
};

function ReworkForm(props) {
  let rowWiseFields = 3;
  const dispatch = useDispatch();
  const [defValues,setDefValues] = useState({});
  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);
  const [process,setProcess]=useState([]);

  const { get, post, response, loading, error } = useFetch({ data: [] });
  let [oldEntry,setOldEntry]=useState([[]]);
  const[loadState,setLoadState] = useState(Math.random());
  const [stockDisplay, setStockDisplay] = useState({ stock: 0, produced: 0 });
  var [maxQty,setMaxQty] = useState()
  const [defects,setDefects] =useState([{"value":"","label":"Select"}]);
 
  const AlertHandler=(alertContent,alertType)=>{
    dispatch(
     alertActions.showAlertHandler({
      showAlert : !showAlert, 
      alertMessage : alertContent,
      alertVariant : alertType
    }
     )
    );
  }

  const loadInitialData = useCallback(async () => {
    const intialdata = await post(api + "/inspectionEntry/latestReworkEntry",{"orderId":props.orderId,
    "prodProcMapId":props.selectedItem.prodProcMapId,"isReworkEntry":"Yes","loadid":Math.random()});
    console.log(intialdata)
    if (response.ok && intialdata.retValues.latestEntries) 
    setOldEntry([intialdata.retValues.latestEntries]);
          setStockDisplay(oldStock=>
      ({...oldStock,stock:intialdata.retValues.prodStock.rworkIntQuantity,produced:intialdata.retValues.prodStock._producedQuantity})
    )
    setMaxQty(intialdata.retValues.prodStock.rworkIntQuantity >0 ? intialdata.retValues.prodStock.rworkIntQuantity : 0)
  
    const loadedProcess = await post(api+"/ppMap/loadOptionsAfter",{id:props.selectedItem.prodProcMapId})
    setProcess([...[{"value":"","label":"Select"}],...loadedProcess])
  
  
  }, [post,response]);

  const loadInitialDefects = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const loadeddefects = await get(api+"/defect/loadOptions");
    setDefects([...defects,...loadeddefects]);
    console.log({...props.selectedItem})
  }, [get, response]);

  useEffect(() => { loadInitialDefects() }, [])

  useEffect(() => {
    loadInitialData();
  }, [loadState]);

  const [selectedEntry,setSelectedEntry] = useState();
  const handleEdit = (item, action) => () => {
    if (action === "edit") {
      item.acceptedQuantity = item.insQuantity - item.rejectedQuantity
      setSelectedEntry(item);
    }
  };

  const saveDetails = async (entry) => {
    //  procMaps
    const insEntryapi = entry.insEntryId ? "/inpspectionEntry/updateReworkEntry" : "/inspectionEntry/insertReworkEntry"
    console.log(insEntryapi)
    const returnObject = await post(api + insEntryapi, entry);
    console.log(returnObject);
    if (returnObject.retValues.status == 1) {
      if (entry.insEntryId) {
        setOldEntry([returnObject.retValues.insEntry]);
        setLoadState(Math.random())
        AlertHandler(returnObject.retValues.message, "success");
      } else if (returnObject.retValues.insEntry.insEntryId > 0) {
        setOldEntry([returnObject.retValues.insEntry]);
        AlertHandler(returnObject.retValues.message, "success");
        setLoadState(Math.random())
      }
    } else {
      AlertHandler(returnObject.retValues.message, "danger");
    }
  };


  const form_header=<>
  <Card body className={classes.rwtitle}   style={{backgroundColor:Ctheme.colors.ttle,}} >
    <Row>
   < Col
            style={{
              backgroundColor: Ctheme.colors.yllw,
              color: Ctheme.colors.blk,
              justifyContent: "left",
              borderRadius: "5%",
            }}
            md={2}
          > Rework Qty <br/>{stockDisplay.stock}</Col>
    <Col md={{ span: 6, offset: 1 }}> <h4>Rework Entry-{props.productName} ({props.customerName})</h4> </Col> 
    </Row>
    </Card>
  </>

  let template = {
   fields: [
    {
      title: 'Date',
      type: 'date',
      name: 'entryDate',
      contains:"date",
      validation:"Date is Required",
      inpprops:{
        format:"dd/mm/yy"
      },
},{
        title: "Shift",
        type: "select",
        name: "shift",
        validationProps: "Please select Shift",
        contains: "Select",
        options: [
          { value: "", label: "Select" },
          { value: "Shift_1", label: "Shift 1" },
          { value: "Shift_2", label: "Shift 2" },
          { value: "Shift_3", label: "Shift 3" },
        ],
      },{
        title: 'Accepted Qty',
        type: 'number',
        name: 'acceptedQty',
        contains: 'number',
        inpprops:{
            min:1,
            step:1
        }
    },
    {
      title: "Update Stock To",
      type: "select",
      name: "reworkMapId",
      validationProps: "Please select Process",
      contains: "Select",
      options: process,
    },
    
    {
      title: 'Defect Type',
      type: 'select',
      name: 'defectId',
      contains: 'Select',
       options:defects
  }
  ,{
    title: 'Rejected Qty',
    type: 'number',
    name: 'rejectedQuantity',
    contains: 'number',
    inpprops:{
        min:0,
        step:1
    }
},
    {
        title: 'Remarks',
        type: 'textarea',
        name: 'remarks',
        contains:"textarea",
        inpprops:{
          maxlength:128,
          md:4
        },
         },
         {
          title: 'Rejected Serial No Eg(2,3,5)',
          type: 'textarea',
          name: 'rejectedSerialNo',
          contains:"textarea",
          inpprops:{
            maxlength:128,
            md:4
          },
           },{
            type: "hidden",
            name: "orderId",
            contains: "number",
            value: props. orderId,
          },{
            type: "hidden",
            name: "prodProcMapId",
            contains: "number",
            value: props.selectedItem.prodProcMapId,
          },{
            type: "hidden",
            name: "lineInspection",
            contains: "number",
            value: props.selectedItem.process.proSubCat==="Quality" ? "No" : "Yes",
          },{
            type: "hidden",
            name: "isReworkEntry",
            contains: "number",
            value:"Yes",
          },{
            type: "hidden",
            name: "reworkQuantity",
            contains: "number",
            value:0,
          },
    ]
}
//{form_header} 

function onSubmit(values) {
  console.log(values);
  console.log(values); 
  saveDetails(values);
}

function validate(watchValues, errorMethods) {
  let { errors, setError, clearErrors } = errorMethods;
  // Firstname validation
  if(watchValues[0]!="" & watchValues[1]!=""){
      if(Number(watchValues[0])+Number(watchValues[1])>maxQty){
        AlertHandler("Sum of Accepted qty and Rejected Qty cannot exceed "+maxQty, "danger");
      }
  }
}
  return (
    <>
    {form_header}
    <CreateForm  
    template={template}
     watchFields={['rejectedQuantity','acceptedQuantity']}
     rowwise={rowWiseFields}
     validate={validate}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName="Save"
     defaultValues={selectedEntry}
     styles={styles}>
     </CreateForm>
      <SimpleCard>
       {<Table cols={QualityTable(handleEdit)} data={oldEntry}></Table>}
     </SimpleCard>
     </>
  )
}


  
  function validate(watchValues, errorMethods) {
    let { errors, setError, clearErrors } = errorMethods;
  
    // Firstname validation
    if(watchValues['firstname'] === 'Admin'){
        if(!errors['firstname']){
            setError('firstname', {
                type: 'manual',
                message: 'You cannot use this first name'
            })
        }
    }else{
        if(errors['firstname'] && errors['firstname']['type'] === 'manual'){
            clearErrors('firstname');
        }
    }
  }

export default ReworkForm