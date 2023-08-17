import React,{useState} from 'react'
import CreateForm from '../../../../Components/Forms/CreateForm'
import Table from '../../../../Components/tables/Table';
import SimpleCard from '../../../../UI/cards/SimpleCard';
import ApprovalTable from './TransferTable';
import {data} from './data'
import { Modal } from 'react-bootstrap'
import ShelfForm from './ShelfForm';
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../../store/modal-Slice";
import { alertActions } from "../../../../store/alert-slice";
import useFetch, { Provider } from "use-http";
import api from "../../../../Api";
import QtyForm from './QtyForm';


const rowWiseFields=3
const actions = ["acceptedEdit"];
function ApprovalForm(props) {
  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);
  const { get, post, response, loading, error } = useFetch();
  const dispatch = useDispatch();
  
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
    }else if(action=="shelfLife"){
      const newState={
          showForm:true,
          selectedForm:<ShelfForm onCancel={hideFormHandler} 
          selected={item}
          saveFunction = {saveDetails}/>,
          selectedItem:{item},                     
          title:""
      }
      setShowformparams({...showFormParams,...newState})
  }
  }
    const saveDetails =async (schedule) => {
      //  procMaps
      const scheduleapi = "/deliSchedule/update";
      const returnObject = await post(api + "/deliSchedule/update", schedule);
      console.log({returnObject})
      if (returnObject.retValues.status == 1) {
        if (schedule.deliveryId) {
         
          hideFormHandler();
         props.loadStateContoller({type:"approval"});
         props.loadStateContoller({type:"orderSearch"});
         //dispatch(loadStateActions.alterLoadStatelHandler())

          AlertHandler(returnObject.retValues.message, "success");
        } } else {
        dispatch(modalActions.hideModalHandler());
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
      title: 'Remarks',
      type: 'textarea',
      name: 'remarks',
      contains: 'textarea',
      validationProps: "Please Select Job Order status",
      inpprops:{
        md:6,
        maxLength:512
      }
      }
    
        ]     
       }
      function onSubmit(values) {
        console.log(values);
        props.saveFunction(values)
      }
    const defaultvals = {"mat1":"material1","mat2":"material2","mat3":"material3",
    "Qty1":"132","Qty2":"12","Qty3":"1",}

  return (
    <>
    <Modal {...props} showFormHandler={handleEdit}
    size="xl"
    aria-labelledby="contained-modal-title-vcenter"
    centered  show={showFormParams.showForm} onHide={hideFormHandler}>
      <Modal.Header closeButton>
        {showFormParams.title}
      </Modal.Header>
      <Modal.Body>{showFormParams.selectedForm}</Modal.Body>
    </Modal>
    <SimpleCard title="Transfer Stock">
    <Table cols={ApprovalTable(handleEdit,actions)} data={data}>
    </Table>
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
  

  export default ApprovalForm