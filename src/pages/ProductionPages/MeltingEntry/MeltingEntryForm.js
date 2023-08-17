import React,{useState,useCallback,useEffect} from 'react'
import CreateForm from '../../../Components/Forms/CreateForm'
import {Row,Col,Button,Card} from 'react-bootstrap'
import classes from './dailyentry.module.css'
import SimpleCard from '../../../UI/cards/SimpleCard'
import Table from '../../../Components/tables/Table'
import useFetch, { Provider } from "use-http";
import api from "../../../Api";
import { alertActions } from "../../../store/alert-slice";
import { useSelector, useDispatch } from "react-redux";
import Overlay from 'react-bootstrap/Overlay';
import Ctheme from '../../../Components/Ctheme/Ctheme'

const styles = {
  upper: {
    
    padding: '0 1rem 0 1rem', // Add the padding property here
  },
};

function MeltingEntryForm(props) {
  
  const[overMess,setOverMess] = useState("");
  let [entries,setEntries]=useState([]);
  let[meltEntryId,setMeltEntryId]=useState();
  const [selctedEntry,setSelectedEntry] = useState(props.selectedItem);
  const dispatch = useDispatch();
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const [loadedOptions,setLoadedOptions]=useState({material:[{ value: "", label: "Select" }]})
  const [loadState,setLoadState] = useState(Math.random());
 
  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);

 
  const loadInitialData = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const intialEntries = await post(api + "/meltEntry/meltEntrys" ,{"id":1,"loadState":Date().toLocaleString()});
    if (response.ok) setEntries(intialEntries);
    //  console.log(initialCusts)
  }, [get, response]);

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

  useEffect(() => {
   // loadInitialOptions();
    loadInitialData();
  }, [loadState]); // componentDidMount

  
 
  // <Row className={`${classes.buttCon} d-flex justify-content-center`}>
  // <Button variant='outline-primary' className={classes.btn} onClick={showInwardHandler}>Inward</Button>
  // <Button variant='outline-primary' className={classes.btn} onClick={showOutwardHandler}>Outward</Button>
  // </Row>


  const melting_header=<>
  <Card body className={classes.title} style={{backgroundColor:Ctheme.colors.ttle,}}>
    <Row>
    <Col md={{ span: 6, offset: 3 }}> <h4>Melting Inward Details</h4> </Col> 
    </Row>
    </Card>
  </>

let rowWiseFields = 3;
  let template = {
    fields: [
        {
            title: 'Melt Date',
            type: 'date',
            name: 'MeltingDate',
            contains:"date",
            validationProps:"Date is Required",
            inpprops:{
              format:"dd/mm/yy"
            },
      },{
        title: 'Shift',
        type: 'select',
        name: 'shift',
        validationProps:"Please select Shift",
        contains: 'Select',
         options:[
        {value:"Select", label:'Select'},
        {value:"Shift_1", label:'Shift 1'},
        {value:"Shift_2", label:'Shift 2'},
        {value:"Shift_3" ,label:'Shift 3'},
         ]
    },{
      title: 'Holding Process',
      type: 'select',
      name: 'holdingStatus',
      validationProps:"Please select Holding Status",
      contains: 'Select',
       options:[
      {value:"Yes", label:'Yes'},
      {value:"No", label:'No'},
       ]
  },
      {
        title: 'Alloy',
        type: 'select',
        name: 'materialId',
        contains: 'Select',
        options:props.materials
    },{
            title: 'Alloy Wgt',
            type: 'number',
            name: 'materialWeight',
            contains: 'number',
            inpprops:{
                min:0
            }
        },{
              title: 'Runner Wgt',
              type: 'number',
              name: 'runnerWeight',
              contains: 'number',
              inpprops:{
                  min:0
              }
          },  {
            title: 'Furnance',
            type: 'select',
            name: 'furnace',
            contains: 'Select',
             options:[
            {value:"", label:'Select'},
            {value:"Furnance_A", label:'Furnace A'},
            {value:"Furnance_B", label:'Furnace B'},
            {value:"Furnance_C", label:'Furnace C'},
            {value:"Furnance_D", label:'Furnace D'},
            {value:"Furnance_E", label:'Furnace E'},
            {value:"Furnance_F", label:'Furnace F'},
             {value:"Furnance_J", label:'Furnace J'},
            {value:"Furnance_K", label:'Furnace K'},
            {value:"Furnance_L", label:'Furnace L'},
            {value:"Furnance_M", label:'Furnace M'},
            {value:"Furnance_N", label:'Furnace N'},
            {value:"Furnance_O", label:'Furnace O'},
            {value:"Furnance_P", label:'Furnace P'},
          ]
        }, {
            title: 'Batch No(Heat Code)',
            type: 'text',
            name: 'heatNo',
            contains: 'text',
            inpprops:{
               min:3,
               max:50
            }
        }, {
          title: 'Alloy Batch No',
          type: 'text',
          name: 'alloyBatch',
          contains: 'text',
          inpprops:{
             min:3,
             max:50
          }
      },
    {
        type: 'hidden',
        name: 'meltingEntryId',
        contains:"text",
        value:meltEntryId,

  }
    ]
}

const saveDetails = async (entry) => {
  //  procMaps
  console.log(entry)
  const meltEntryapi = entry.meltingEntryId ? "/meltEntry/create" : "/meltEntry/create"
  console.log(meltEntryapi)
  const returnObject = await post(api + meltEntryapi, entry);
  console.log(returnObject);
  if (returnObject.retValues.status == 1) {
    if (returnObject.retValues.meltEntry.meltingEntryId) {
      setEntries(
        entries.map((melt) =>
        melt.meltingEntryId === returnObject.retValues.meltEntry.meltingEntryId
            ? returnObject.retValues.meltEntry
            : melt
        )
      );
      setLoadState(Math.random())
      setOverMess(returnObject.retValues.message);
      //AlertHandler(returnObject.retValues.message, "success");
    } else if (returnObject.retValues.meltEntry.meltEntryId > 0) {
      setEntries([returnObject.retValues.meltEntry,...entries]);
      setOverMess(returnObject.retValues.message);
      //AlertHandler(returnObject.retValues.message, "success");
      setLoadState(Math.random())
    }
  } else {
    setOverMess(returnObject.retValues.message);
    //AlertHandler(returnObject.retValues.message, "danger");
    setLoadState(Math.random())
  }
};
function onSubmit(values) {
  setOverMess("");
  saveDetails(values);
  //setSelectedEntry(selcted=>(...selctedEntry,shift:"Shift_1"))
  //selctedEntry.shift= values.shift
}
  return (
    <>
    {melting_header}
        
     
    <CreateForm  template={template}
    //SwatchFields={['firstname','password']}
     rowwise={rowWiseFields}
     validate={validate}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName="Save"
     defaultValues={selctedEntry}
     styles={styles}>
     </CreateForm> 
     {overMess==""?<></>:<>
          <div
            {...props}
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(255, 100, 100, 0.85)',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
          >
           {overMess}
          </div>
        </>}
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

export default MeltingEntryForm