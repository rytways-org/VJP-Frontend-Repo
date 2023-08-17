import React,{useState,useCallback,useEffect} from 'react'
import CreateForm from '../../../../Components/Forms/CreateForm'
import Table from '../../../../Components/tables/Table';
import SimpleCard from '../../../../UI/cards/SimpleCard';
import ApprovalTable from './ApprovalTable';
import {data} from './data'
import { Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../../store/modal-Slice";
import { alertActions } from "../../../../store/alert-slice";
import useFetch, { Provider } from "use-http";
import api from "../../../../Api";
import QtyForm from './QtyForm';
import EditEntry from "./EditEntry";
import Ctheme from '../../../../Components/Ctheme/Ctheme';

const stylesUpper = {
  margin: "0",
  padding: "0",

};


const stylesUpperTwo = {
  margin: Ctheme.margins.mg,
  
  
  /*backgroundColor:'yellow' */
};

const styles = {
  simplettl: {
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: Ctheme.colors.ttle,
    borderBottomLeftRadius: '0px', 
    borderBottomRightRadius: '0px', 
  }
}

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
  const[prItems,setPrItems]=useState([]);
  
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
  
const savePrItem = async (prItems) => {
  // const { ok } = response // BAD, DO NOT DO THIS
  console.log(prItems)
  const loadedprods = await post(api + "/storesReqItems/updateIssuedQty",prItems);
  // console.log({...props.selectedItem})
};

const handleEdit=(saveValue,value,rowData)=>{
  
if(saveValue==="issuedQty"){
  rowData.issuedQty=value;
  savePrItem(rowData);
}
 }

    const intialLoadFuntion = useCallback(async()=>{
      console.log(props.loadState)
      let loadedData = await post(api + "/storesReqItems/reqItems",{"id":props.selected.storesRequestId,"loadState":Math.random()})
     console.log(loadedData)
      if (response.ok) {
        setPrItems(loadedData);
      }
    },[post,response,props.loadState])

    useEffect(()=>{
      
      // fetchData();
      
        intialLoadFuntion()
      
    }, [intialLoadFuntion]);  // componentDidMount

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

      const showFormHandler = (item,action)=>() => {
        if(action=="EditEntry"){
              const newState={
                showForm:true,
                selectedForm:<EditEntry onCancel={hideFormHandler} 
                selectedItem={item}
                saveFunction={handleEdit}
                />,
                selectedItem:{...item}
            }
            setShowformparams({...showFormParams,...newState})    
            }
    }

     const template = {
        fields: [
          {
      title: 'Remarks',
      type: 'textarea',
      name: 'approvalRemarks',
      contains: 'textarea',
      validationProps: "Please Enter Approval Remarks",
      inpprops:{
        md:12,
        maxLength:512
      }
      } ,{
        type: "hidden",
        name: 'status',
        contains:"hidden",
        value:"Approved"
         },
    
        ]     
       }
      function onSubmit(values) {
        console.log(values);
        values.storesRequestId = props.selected.storesRequestId
        props.saveFunction(values)
      }
    

  return (
    <>
    <Modal size="xl" show={showFormParams.showForm} onHide={hideFormHandler} >
        <Modal.Header closeButton >
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>{showFormParams.selectedForm}</Modal.Body>
      </Modal>
      <SimpleCard upper={stylesUpper} useUpperTwoStyle={false} styles={styles} title="Approve Requests">
    <Table cols={ApprovalTable(handleEdit,actions,[5],showFormHandler)} data={prItems}>
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