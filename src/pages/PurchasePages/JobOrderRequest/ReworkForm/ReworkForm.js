import React,{useState,useCallback,useEffect} from 'react'
import CreateForm from '../../../../Components/Forms/CreateForm';
import {Row,Col,Card} from 'react-bootstrap'
import api from "../../../../Api";
import { useSelector, useDispatch } from "react-redux";
import useFetch, { Provider } from "use-http";
import { alertActions } from "../../../../store/alert-slice";
import InspectionTable from '../InspectionTable'; 
import SimpleCard from "../../../../UI/cards/SimpleCard";
import Table from "../../../../Components/tables/Table";
import classes from "./productionentry.module.css"


function ReworkForm(props) {
  let rowWiseFields = 2;
  const dispatch = useDispatch();
  const [defValues,setDefValues] = useState({});
  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);
  const [defects,setDefects] =useState([{"value":"","label":"Select"}]);
  const { get, post, response, loading, error } = useFetch({ data: [] });
  let [oldEntry,setOldEntry]=useState();
  const[loadState,setLoadState] = useState(Math.random());
  const [stockDisplay, setStockDisplay] = useState({ stock: 0, produced: 0 });
  var [maxQty,setMaxQty] = useState(props.selected.reworkQty)

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
    const intialdata = await post(api + "/inspectionEntry/listJoRwInsEntries",
    {"jOrder":props.selected,"loadid":loadState});
    console.log(intialdata)
    if (response.ok && intialdata.retValues.latestEntries) 
    setOldEntry(intialdata.retValues.latestEntries);
          setStockDisplay(oldStock=>
      ({...oldStock,stock:intialdata.retValues.prodStock.rwExtQuantity,produced:intialdata.retValues.prodStock._producedQuantity})
    )
    setMaxQty(intialdata.retValues.prodStock.rwExtQuantity)
  }, [post,response,loadState]);

  const loadInitialDefects = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const loadeddefects = await get(api+"/defect/loadOptions");
    setDefects([...defects,...loadeddefects]);
    console.log({...props.selectedItem})
  }, [get, response]);

  useEffect(() => { loadInitialDefects() }, [])
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const [selectedEntry,setSelectedEntry] = useState();
  const handleEdit = (item, action) => () => {
    if (action === "edit") {
      item.acceptedQuantity = item.insQuantity - item.rejectedQuantity
      setSelectedEntry(item);
    
    }
  };

  const form_header = (
    <>
      <Card body className={classes.title}>
        <Row>
          <Col
            style={{
              backgroundColor: "grey",
              justifyContent: "left",
              borderRadius: "5%",
            }}
            md={2}
          >
            Available Rework Stock <br /> {stockDisplay.stock}
          </Col>
          <Col md={{ span: 6, offset: 1 }}>
            {" "}
            <h4></h4>{" "}
          </Col>
        </Row>
      </Card>
    </>
  );

  const saveDetails = async (entry) => {
    //  procMaps
    const insEntryapi = entry.insEntryId ? "/inpspectionEntry/updateJoReworkInsEntry" : "/inspectionEntry/createJoReworkInsEntry"
    console.log(insEntryapi)
    const returnObject = await post(api + insEntryapi, {entry:entry,jOrder:props.selected});
    console.log(returnObject);
    if (returnObject.retValues.status == 1) {
      if (entry.insEntryId) {
        setOldEntry(
          oldEntry.map((odr) =>
            odr.insEntryId === returnObject.retValues.insEntry.insEntryId
              ? returnObject.retValues.insEntry
              : odr
          )
        );
        setMaxQty(maxQty-entry.insQuantity)
        setStockDisplay((oldStock) => ({
          ...oldStock,
          stock: maxQty, 
        }));
        AlertHandler(returnObject.retValues.message, "success");
        setLoadState(Math.random());
      } else if (returnObject.retValues.insEntry.insEntryId > 0) {
        setOldEntry([returnObject.retValues.insEntry,...oldEntry]);
      AlertHandler(returnObject.retValues.message, "success");
      setMaxQty(maxQty-entry.insQuantity)
      setStockDisplay((oldStock) => ({
        ...oldStock,
        stock: maxQty, 
      }));
      setLoadState(Math.random());
      console.log(loadState);
      }
    } else {
      AlertHandler(returnObject.retValues.message, "danger");
    }
  };

  let template = {
    heading:"Jo Rework Entry",
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
          { value: "Shift_A", label: "Shift A" },
          { value: "Shift_B", label: "Shift B" },
          { value: "Shift_C", label: "Shift C" },
        ],
      },{
        title: 'Accepted Qty',
        type: 'number',
        name: 'acceptedQuantity',
        contains: 'number',
        inpprops:{
            min:1,
            step:1
        }
    },{
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
          md:6
        },
         },
         {
          title: 'Rejected Serial No Eg(2,3,5)',
          type: 'textarea',
          name: 'rejectedSerialNo',
          contains:"textarea",
          inpprops:{
            maxlength:128,
            md:12
          },
           },{
            type: "hidden",
            name: "orderId",
            contains: "number",
            value: props.selected.orderId,
          },{
            type: "hidden",
            name: "prodProcMapId",
            contains: "number",
            value: props.selected.comingAfter,
          },
          {
           type: 'hidden',
           name: 'joId',
           contains:"number",
           value:props.selected.joId
          }, {
            type: "hidden",
            name: "lineInspection",
            contains: "number",
            value: "No",
          },{
            type: "hidden",
            name: "isReworkEntry",
            contains: "number",
            value:"Yes",
          },{
            type: "hidden",
            name: "insQuantity",
            contains: "number",
            value:0,
          },{
            type: "hidden",
            name: "reworkQuantity",
            contains: "number",
            value:0,
          },
    ]
}


function onSubmit(values) {
  console.log(values);
  values.insQuantity = Number(values.acceptedQuantity) + Number(values.rejectedQuantity);
  console.log(values);
  if(values.insQuantity>maxQty){
    AlertHandler("Sum of Accepted qty and Rejected Qty cannot exceed "+maxQty +" cannot submit form", "danger");
     
  }else{
    saveDetails(values);
  }
 
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
     watchFields={['acceptedQuantity','rejectedQuantity']}
     rowwise={rowWiseFields}
     validate={validate}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName="Save"
     defaultValues={selectedEntry}>
     </CreateForm>

      <SimpleCard>
       {<Table cols={InspectionTable(handleEdit)} data={oldEntry}></Table>}
     </SimpleCard>
     </>
  )
}

export default ReworkForm