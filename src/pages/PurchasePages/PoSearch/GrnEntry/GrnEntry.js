import React,{useState,useEffect,useCallback} from 'react'
import CreateForm from '../../../../Components/Forms/CreateForm'
import Table from '../../../../Components/tables/Table';
import SimpleCard from '../../../../UI/cards/SimpleCard';
import GrnEntryTable from './GrnEntryTable';
import {data} from './data'
import { Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../../store/modal-Slice";
import { alertActions } from "../../../../store/alert-slice";
import useFetch, { Provider } from "use-http";
import api from "../../../../Api";
import QtyForm from './QtyForm';
import ServicePoEntry from './ServicePoEntry';
import ServiceEntryTable from './ServiceEntryTable';
import Ctheme from '../../../../Components/Ctheme/Ctheme';


const stylesUpper = {
  margin: "0",
  padding: "0",

};

const styles = {
  upper: {
    
    padding: "0", 
    margin:'0'
    
  },
  upperRow: {
    margin: '.5rem .5rem 0 .5rem',
    padding: '0rem 1rem ',
   
    borderRadius:'1rem'
  },
  uppertitle: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: '0'
  },
  simplettl: {
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor:Ctheme.colors.ttle,
    borderBottomLeftRadius: '0px', 
    borderBottomRightRadius: '0px', 
  }
};
const rowWiseFields=3
const actions = ["acceptedEdit"]
function GrnEntry(props) {
  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);
  const { get, post, response, loading, error } = useFetch();
  const dispatch = useDispatch();

  const [selectedItem,setSelectedItem]= useState({}) 
  const [materials,setMaterials] = useState([{"value":"","label":"Select"}])
  const [poItems,setPoItems] = useState([]);
  const [grnEntries,setGrnEntries] = useState([])
  const [serviceItems,setServiceItems]= useState([])


  const loadInitialOptions = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const loadedMaterials = await post(api+"/poItems/loadOptions",{"id":props.selectedItem.poId,"random":Math.random()});
   // const loadedPoItems = await post(api+"/poItems/listAll",{"id":props.selectedItem.poId,"random":Math.random()});
    const loadedGrnEntries = await post(api+"/grnEntry/listAll",{"id":props.selectedItem.poId,"random":Math.random()});
    const loadedItems = await post(api+"/poItems//listAllPoItems",{"id":props.selectedItem.poId,"random":Math.random()});
    

    setServiceItems([...loadedItems])
    setMaterials([...materials,...loadedMaterials]);
   // setPoItems([...poItems,...loadedPoItems]);
    setGrnEntries([...loadedGrnEntries]);
  }, [get, response]);
  const [loadState,setLoadState] = useState(Math.random());

  useEffect(() => { loadInitialOptions() }, [loadState]) // componentDidMount
  
  const [showFormParams,setShowformparams]=useState({
    showForm:false,
    selectedForm:"",
    title:"",
    selectedItem:{ id:0,
        productName: "",
        cusName: "",
        part: "",
        quantity: "",
        cost: ""
        }
})

const AlertHandler = (alertContent, alertType) => {
  dispatch(
    alertActions.showAlertHandler({
      showAlert: !showAlert,
      alertMessage: alertContent,
      alertVariant: alertType,
    })
  );
}
  const handleEdit=(item,action)=>()=>{
    //setSelectedItem({...selectedItem,...item})
    if(action=="acceptedEdit"){
        const newState={
            showForm:true,
            selectedForm:<QtyForm onCancel={hideFormHandler} 
            selected={item}
            saveFunction = {saveDetails}/>,
            selectedItem:{item},                     
            title:""
        }
        setShowformparams({...showFormParams,...newState})
    }else if(action=="approve"){
        alert(action)
        window.confirm(JSON.stringify(item))
    }
    }

    const handleEditService=(value,rowData)=>{
      //setSelectedItem({...selectedItem,...item})
      rowData.status = "Closed"
      rowData.receivedDate = value
      setServiceItems((serviceItems) =>
      serviceItems.map((serviceItem) =>
      serviceItem.poItemsId === rowData.poItemsId ? rowData : serviceItem
        )
      );
      saveServiceDetails(rowData)
    }

    const saveAccepted =(values)=>{
      values.grnStatus= 12;
    }

    const saveDetails =async (grnEntry) => {
      //  procMaps
      const grnEntryApi = grnEntry.grnId=="" ? "/grnEntry/create" :"/grnEntry/update";
      const returnObject = await post(api + grnEntryApi, grnEntry);
      console.log({returnObject})
      if (returnObject.retValues.status == 1) {
        if (returnObject.retValues.grnEntry.grnId>0) {
         
          hideFormHandler();
         //dispatch(loadStateActions.alterLoadStatelHandler())
          AlertHandler(returnObject.retValues.message, "success");
          
        } } else {
      //  dispatch(modalActions.hideModalHandler());
        AlertHandler(returnObject.retValues.message, "danger");
      }   
        }

        const saveServiceDetails =async (poItems) => {
          //  procMaps
          const grnEntryApi = "/poItems/editPoItemStatus";
          const returnObject = await post(api + grnEntryApi, poItems);
          console.log({returnObject})
          if (returnObject.retValues.status == 1) {
            if (returnObject.retValues.poItem.poItemsId>0) {
             
              hideFormHandler();
             //dispatch(loadStateActions.alterLoadStatelHandler())
              AlertHandler(returnObject.retValues.message, "success");
              
            } } else {
          //  dispatch(modalActions.hideModalHandler());
            AlertHandler(returnObject.retValues.message, "danger");
          }   
            }
    const hideFormHandler=()=>{
      setShowformparams({...showFormParams,
          showForm:false,
          selectedForm:"",
          title:"",
          selectedItem:{...showFormParams.selectedItem,...{ id:0,
              productName: "",
              cusName: "",
              part: "",
              quantity: "",
              cost: "",
              }}
      })
     
      }
     const template = {
      
        fields: [
          {
            title: 'Grn Number',
            type: 'text',
            name:'grnNumber',
            contains:"text",
            validation:"Grn Number is Required",
            inpprops:{
                min:1,
                step:1
            }, 
      }, {
        title: 'Received Date',
        type: 'date',
        name:'receivedDate',
        contains:"date",
        validation:"Received Date is Required",
        inpprops:{
           
        }, 
  }, {
            title: 'Material Name',
            type: 'select',
            name: 'poItemsId',
            contains:"select",
            validation:"Material is Required",
            options: materials,
      },{

        title: 'Received Qty',
        type: 'number',
        name:'receivedQty',
        contains:"number",
        validation:"Quantity is Required",
        inpprops:{
          
        }, 
  },{
      title: 'Remarks',
      type: 'textarea',
      name: 'remarks',
      contains: 'textarea',
      inpprops:{
        md:4,
        maxLength:512
      }
      },{
        type: 'hidden',
        name: 'grnId',
        contains: 'text',
         value : selectedItem.grnId ? selectedItem.grnId : 0
         }    
        ]     
       }

      function onSubmit(values) {
        console.log(values);
        saveDetails(values)
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

  return (
    <>
   {props.poType=="PO" && <><Modal {...props} showFormHandler={handleEdit}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered  show={showFormParams.showForm} onHide={hideFormHandler}>
      <Modal.Header closeButton>
        {showFormParams.title}
      </Modal.Header>
      <Modal.Body>{showFormParams.selectedForm}</Modal.Body>
    </Modal>
  
    <SimpleCard upper={stylesUpper} useUpperTwoStyle={false}  title="Goods Receipt Note Entry" styles={styles}>
    <CreateForm  
    template={template} 
    rowwise={rowWiseFields}
    watchFields={["poId"]}
     validate={validate}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName="Save"
     styles={styles}
    ></CreateForm>
    <Table cols={GrnEntryTable(handleEdit,actions)} data={grnEntries}>
    </Table>
    </SimpleCard></>}
    {props.poType!="PO" && <>
    <SimpleCard title="Service Entry">
    <ServicePoEntry/>
    <Table cols={ServiceEntryTable(handleEditService,actions)} data={serviceItems}>
    </Table>
    </SimpleCard></>}
   </>
  )
}

  
  

  export default GrnEntry