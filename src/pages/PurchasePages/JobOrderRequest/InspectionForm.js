import React,{useState,useCallback,useEffect} from 'react'
import CreateForm from '../../../Components/Forms/CreateForm'
import {Row,Col,Card} from 'react-bootstrap'
import InspectionTable from './InspectionTable';
import Table from "../../../Components/tables/Table";
import SimpleCard from "../../../UI/cards/SimpleCard";
import api from "../../../Api";
import { useSelector, useDispatch } from "react-redux";
import useFetch, { Provider } from "use-http";
import { alertActions } from "../../../store/alert-slice";
import classes from "./productionentry.module.css";

function InspectionForm(props) {
  let rowWiseFields = 2;

  

const [selectedEntry,setSelectedEntry] = useState();
 
const handleEdit = (item, action) => () => {
  if (action === "edit") {
    setSelectedEntry({...item});
  
  }
};
const dispatch = useDispatch();
const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
  state.alertProps.showAlert,
  state.alertProps.alertMessage,
  state.alertProps.alertVariant,
]);
const [defects,setDefects] =useState([{"value":"","label":"Select"}]);
 
const [stockDisplay, setStockDisplay] = useState({ stock: 0, produced: 0 });
var [maxQty,setMaxQty] = useState(props.selected.receivedQty)
const { get, post, response, loading, error } = useFetch({ data: [] });
let [oldEntry, setOldEntry] = useState([]);
const [loadState, setLoadState] = useState(Math.random());
const handleLoadChange = (action) => {
  setLoadState(Math.random());
  // dispatch(orderEntryActions.);
};
const AlertHandler = (alertContent, alertType) => {
  dispatch(
    alertActions.showAlertHandler({
      showAlert: !showAlert,
      alertMessage: alertContent,
      alertVariant: alertType,
    })
  );
};
const loadInitialDefects = useCallback(async () => {
  // const { ok } = response // BAD, DO NOT DO THIS
  const loadeddefects = await get(api+"/defect/loadOptions");
  setDefects([...defects,...loadeddefects]);
  console.log({...props.selectedItem})
}, [get, response]);

useEffect(() => { loadInitialDefects() }, [])

const saveDetails = async (entry) => {
  //  procMaps
  const prodEntryapi = entry.insEntryId ? "/inspectionEntry/updateJoInsEntry" : "/inspectionEntry/createJoInsEntry";
  const returnObject = await post(api + prodEntryapi, {entry:entry,jOrder:props.selected});
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
      setStockDisplay((oldStock) => ({
        ...oldStock,
        stock: maxQty, 
      }));
      AlertHandler(returnObject.retValues.message, "success");
      setLoadState(Math.random());
      console.log(loadState);
    } else if (returnObject.retValues.insEntry.insEntryId > 0) {
      setOldEntry([returnObject.retValues.insEntry,...oldEntry]);
      AlertHandler(returnObject.retValues.message, "success");
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


const loadInitialData = useCallback(async () => {
  console.log(props.selected.joId)
  const intialdata = await post(api + "/inspectionEntry/listJoInsEntries", {
    jOrder: props.selected,
    loadStateid: Date().toString(),
  });
  console.log({ ...intialdata });
  if (response.ok) {
    setOldEntry(intialdata.retValues.latestEntries);
    setStockDisplay((oldStock) => ({
      ...oldStock,
      stock: intialdata.retValues.prodStock.joStockQuantity, 
    }));
    intialdata.retValues.prodStock.joStockQuantity < maxQty && setMaxQty(intialdata.retValues.prodStock.joStockQuantity) 
  } 
}, [post, response]);

useEffect(() => {
  loadInitialData();
}, [loadState]); // componentDidMount

function onSubmit(values) {
  console.log(values);
  saveDetails(values);
}
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
          Available Qty <br /> {stockDisplay.stock}
        </Col>
        <Col md={{ span: 6, offset: 1 }}>
          {" "}
          <h4></h4>{" "}
        </Col>
        <Col
          style={{
            backgroundColor: "grey",
            justifyContent: "right",
            borderRadius: "5%",
          }}
          md={{ span: 2, offset: 1 }}
        >
          Received Qty
          <br /> {props.selected.receivedQty}
        </Col>
      </Row>
    </Card>
  </>
);

let template = {
  heading:"Enter Inspection  Details",
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
    },
    {
      title: 'Inspected Qty',
      type: 'number',
      name: 'insQuantity',
      contains: 'number',
      inpprops:{
          min:1,
          step:1,
          max : maxQty
      }
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
  },{
    title: 'Rework Qty',
    type: 'number',
    name: 'reworkQuantity',
    contains: 'number',
    inpprops:{
        min:0,
        step:1
    }
},{
  title: "Defect Type",
  type: "select",
  name: "defectId",
  contains: "Select",
  options:defects
},{
  title: 'Rejected Serial No',
  type: 'textarea',
  name: 'rejectedSerialNo',
  contains:"textarea",
  inpprops:{
    maxlength:128,
    md:6
  },
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
        type: 'hidden',
        name: 'joId',
        contains:"number",
        value:props.selected.joId
       }, {
        type: 'hidden',
        name: 'orderId',
        contains:"number",
        value:props.selected.orderId
       }, {
        type: 'hidden',
        name: 'prodProcMapId',
        contains:"number",
        value:props.selected.comingAfter
       }
  ]
}
  return (
    <div>
      {form_header}
    <CreateForm  template={template}
    // watchFields={['firstname','password']}
     rowwise={rowWiseFields}
     validate={validate}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName="Add"
     defaultValues={selectedEntry}
     >

     </CreateForm>
     <SimpleCard md={12}>
        <Table
          cols={InspectionTable(handleEdit, [])}
          data={oldEntry}
          striped
        />
      </SimpleCard>
     </div>
  )
}

function onSubmit(values) {
    console.log(values);
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

export default InspectionForm