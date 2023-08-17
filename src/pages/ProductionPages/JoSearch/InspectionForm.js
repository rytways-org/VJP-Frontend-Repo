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
import classes from "../ProductionEntry/productionentry.module.css";
import RejectionEntry from "./RejectionEntry/RejectionEntry";
import Ctheme from '../../../Components/Ctheme/Ctheme';



const styles = {
  upper: {
    
    padding: "0", 
    margin:'0',
    
  },
  upperRow: {
    margin: Ctheme.margins.mg,
    padding: Ctheme.paddings.pd,
    backgroundColor: Ctheme.colors.dg,
    borderRadius:'1rem'
  },
  uppertitle: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: '0'
  },
};

function InspectionForm(props) {
  let rowWiseFields = 2;

  

const [selectedEntry,setSelectedEntry] = useState();
let [rejections, setRejections] = useState([]);
 
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
const [process,setProcess]=useState([]);

const [rejectQty,setRejectQty]=useState(0);
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
  const loadedProcess = await post(api+"/ppMap/loadOptionsBefore",{id:props.selected.comingAfter})
  setProcess([...[{"value":"","label":"Select"}],...loadedProcess])
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
    <Card body className={classes.title}  style={{
                  backgroundColor: Ctheme.colors.ttle,
                 
                  
                }}>
      <Row>
        <Col
           style={{
            backgroundColor: Ctheme.colors.yllw,
            justifyContent: "left",
            borderRadius: "5%",
            color:Ctheme.colors.blk,
          }}
          md={2}
        >
          Available Qty <br /> {stockDisplay.stock}
        </Col>
        <Col md={{ span: 6, offset: 2 }}>
          {" "}
          <h4>Enter Inspection  Details</h4>{" "}
        </Col>
        <Col
          style={{
            backgroundColor: Ctheme.colors.yllw,
            justifyContent: "right",
            borderRadius: "5%",
            color:Ctheme.colors.blk,
          }}
          md={{ span: 2, offset: 0 }}
        >
          Received Qty
          <br /> {props.selected.receivedQty}
        </Col>
      </Row>
    </Card>
  </>
);

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
      contains: "Select",
      options: [
        { value: "", label: "Select" },
        { value: "Shift_1", label: "Shift 1" },
        { value: "Shift_2", label: "Shift 2" },
        { value: "Shift_3", label: "Shift 3" },
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
    title: 'Rework Qty',
    type: 'number',
    name: 'reworkQuantity',
    contains: 'number',
    inpprops:{
        min:0,
        step:1
    }
}, {
  title: "Rework Process",
  type: "select",
  name: "reworkMapId",
  contains: "Select",
  options: process,
},{
  title: "Rejected Qty",
  type: "disabled",
  name: "rejectedQuantity",
  contains: "number",
  value:rejectQty,
  inpprops: {
    min: 0,
    step: 1,
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

const addRejectionsHandler = (values,action) => {
  const filtered = defects.find(x => x.value === Number(values.defectId)).label
  console.log(filtered)
  if(action==="add"){
    setRejectQty(rejectQty+Number(values.rejectQty))
    values.defect = {}
    values.defect.defectName = filtered
   // console.log(Object.keys(filtered)[0].label)
    console.log(values)
    setRejections(oldDeli=>[...oldDeli,values])
  }else{
    console.log({...values})
    setRejectQty(rejectQty-Number(values.rejectQty))
    setRejections(rejections.filter(function( obj ) {
           return obj.random !== values.random;
       }))
  }
};
  return (
    <div>
      {form_header}
    <CreateForm  template={template}
    // watchFields={['firstname','password']}
     rowwise={rowWiseFields}
     validate={validate}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName="Save"
     defaultValues={selectedEntry}
     styles={styles}
     btButtons={<RejectionEntry
      data={rejections}
      onRejectionUpdate={addRejectionsHandler}
      maxQty = {maxQty}
      defects = {defects}
    />}
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