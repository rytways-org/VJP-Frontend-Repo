import React,{useState,useCallback,useEffect} from 'react'
import CreateForm from '../../../../Components/Forms/CreateForm'
import {Row,Col,Button,Card} from 'react-bootstrap'
import ProcessForm from './ProcessForm'
import classes from './dailyentry.module.css'
import MeltingOutward from './MeltingOutward'
import SimpleCard from '../../../../UI/cards/SimpleCard'
import Table from '../../../../Components/tables/Table'
import { MeltData } from './MeltData'
import { MeltTable } from './MeltTable'
import useFetch, { Provider } from "use-http";
import api from "../../../../Api";
import { alertActions } from "../../../../store/alert-slice";
import { useSelector, useDispatch } from "react-redux";

function MeltingForm(props) {

  let [entries,setEntries]=useState([]);
  const[meltEntryId,setMeltEntryId]=useState(0);
  const [selctedEntry,setSelectedEntry] = useState();
  const dispatch = useDispatch();
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const [loadedOptions,setLoadedOptions]=useState({material:[{ value: "", label: "Select" }]})
  const [loadState,setLoadState] = useState(Math.random());
 
  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);

  const loadInitialOptions = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const loadedmaterials = await get(api + "/material/loadOptions");
    setLoadedOptions({...loadedOptions,material:[...loadedOptions.material,...loadedmaterials]});
    // console.log({...props.selectedItem})
  }, [get, response]);
  
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
    loadInitialOptions();
    loadInitialData();
  }, [loadState]); // componentDidMount

  
 
  // <Row className={`${classes.buttCon} d-flex justify-content-center`}>
  // <Button variant='outline-primary' className={classes.btn} onClick={showInwardHandler}>Inward</Button>
  // <Button variant='outline-primary' className={classes.btn} onClick={showOutwardHandler}>Outward</Button>
  // </Row>
  
  const melting_header=<>
  <Card body className={classes.title}>
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
        {value:"", label:'Select'},
        {value:"Shift_1", label:'Shift 1'},
        {value:"Shift_2", label:'Shift 2'},
        {value:"Shift_3" ,label:'Shift 3'},
         ]
    },
      {
        title: 'Alloy',
        type: 'select',
        name: 'materialId',
        contains: 'Select',
         options:loadedOptions.material
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
            {value:"Furnance_1", label:'Furnace 1'},
            {value:"Furnance_2", label:'Furnace 2'},
            {value:"Furnance_3", label:'Furnace 3'},
            {value:"Furnance_4", label:'Furnace 4'},
            {value:"Furnance_5", label:'Furnace 5'}
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
        },
    {
        type: 'hidden',
        name: 'meltingEntryId',
        contains:"number",
        value:meltEntryId,

  }
    ]
}

const saveDetails = async (entry) => {
  //  procMaps
  const meltEntryapi = entry.meltingEntryId ? "/meltEntry/create" : "/meltEntry/create"
  console.log(meltEntryapi)
  const returnObject = await post(api + meltEntryapi, entry);
  console.log(returnObject);
  if (returnObject.retValues.status == 1) {
    if (entry.meltingEntryId) {
      setEntries(
        entries.map((melt) =>
        melt.meltingEntryId === returnObject.retValues.meltEntry.meltingEntryId
            ? returnObject.retValues.meltEntry
            : melt
        )
      );
      setLoadState(Math.random())
      AlertHandler(returnObject.retValues.message, "success");
    } else if (returnObject.retValues.meltEntry.meltEntryId > 0) {
      setEntries([returnObject.retValues.meltEntry,...entries]);
      AlertHandler(returnObject.retValues.message, "success");
      setLoadState(Math.random())
    }
  } else {
    AlertHandler(returnObject.retValues.message, "danger");
    setLoadState(Math.random())
  }
};

const handleEdit = (item, action) => () => {
  if (action === "edit") {
    setSelectedEntry(item);
  
  }
};


function onSubmit(values) {
  saveDetails(values);
}
  return (
    <>
    {melting_header}
    <CreateForm  template={template}
    // watchFields={['firstname','password']}
     rowwise={rowWiseFields}
     validate={validate}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName="Add"
     defaultValues={selctedEntry}>
     </CreateForm> 
     <SimpleCard>
       <Table cols={MeltTable(handleEdit)} data={entries}></Table>
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

export default MeltingForm