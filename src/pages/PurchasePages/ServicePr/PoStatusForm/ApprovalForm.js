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
import Ctheme from '../../../../Components/Ctheme/Ctheme';


const styles = { 
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
  const loadedprods = await post(api + "/matrialPrItems/update",prItems);
  // console.log({...props.selectedItem})
};

const handleEdit=(saveValue,value,rowData)=>{
  
if(saveValue==="materialQty"){
  rowData.materialQty=value;
  savePrItem(rowData);
}
 }

    const intialLoadFuntion = useCallback(async()=>{
      console.log(props.loadState)
      let loadedData = await post(api + "/matrialPrItems/prItems",{"id":props.selected.purchaseRequestId,"loadState":Math.random()})
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
        values.purchaseRequestId = props.selected.purchaseRequestId
        props.saveFunction(values)
      }
    

  return (
    <>
    
    <SimpleCard title="Approve Requests"
    styles={styles}>
    <Table cols={ApprovalTable(handleEdit,actions,[5])} data={prItems}>
    </Table>

    <CreateForm  
    template={template} 
    rowwise={rowWiseFields}
     validate={validate}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName="Approve">
     </CreateForm>
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