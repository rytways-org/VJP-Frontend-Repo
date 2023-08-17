import React,{useState,useCallback,useEffect} from 'react'
import SimpleCard from '../../../../UI/cards/SimpleCard'
import DeliveryTable from '../DeliverySchedule/DeliveryTable'
import Table from '../../../../Components/tables/Table'
import {deliveryData} from '../DeliverySchedule/DeliveryData'
import { Modal } from 'react-bootstrap'
import RevisionForm from './RevisionForm'
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../../store/modal-Slice";
import { alertActions } from "../../../../store/alert-slice";
import useFetch, { Provider } from "use-http";
import api from "../../../../Api";
import { GiConsoleController } from 'react-icons/gi'

function ProductionApp(props) {
  const actions=["reviseDate","approve"]
  const { get, post, response, loading, error } = useFetch();
  let [deliveries,setDeliveries] = useState();
  const [order, setOrder] = useState(props.selectedItem);
  const [selectedItem,setSelectedItem]=useState({
    id:"",
    Month:"",
    Year:"",
    Remarks:"",
    Quantity:""
  })
  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);
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
  const handleEdit=(item,action)=>()=>{
    //setSelectedItem({...selectedItem,...item})
    if(action=="reviseDate"){
        const newState={
            showForm:true,
            selectedForm:<RevisionForm onCancel={hideFormHandler} 
            selected={item}
            orderId = {props.selectedItem.orderId}
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

    const intialLoadFuntion = useCallback(async()=>{
      console.log(props.loadState)
      let loadedData = await post(api + "/deliSchedule/schedules",{"id":props.selectedItem.orderId,"loadState":props.loadState})
     console.log(loadedData)
      if (response.ok) {
        setDeliveries(loadedData);
      }
    },[post,response,props.loadState])
     
const saveDetails =async (schedule) => {
      //  procMaps
      const scheduleapi = "/deliSchedule/update";
      const returnObject = await post(api + "/deliSchedule/update", schedule);
      console.log({returnObject})
      if (returnObject.retValues.status == 1) {
        if (schedule.deliveryId) {
          setDeliveries(
            deliveries.map((del) =>
              del.deliveryId === returnObject.retValues.delischedule.deliveryId
                ? returnObject.retValues.delischedule
                : del
            )
          );
          console.log(props.loadState)
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
    useEffect(()=>{
      
  // fetchData();
  
    intialLoadFuntion()
  
}, [intialLoadFuntion]);  // componentDidMount

    const AlertHandler = (alertContent, alertType) => {
      dispatch(
        alertActions.showAlertHandler({
          showAlert: !showAlert,
          alertMessage: alertContent,
          alertVariant: alertType,
        })
      );
    };

  
  return (
      <>
    <Modal {...props} showFormHandler={handleEdit}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered  show={showFormParams.showForm} onHide={hideFormHandler}>
      <Modal.Header closeButton>
        {showFormParams.title}
      </Modal.Header>
      <Modal.Body>{showFormParams.selectedForm}</Modal.Body>
    </Modal>
   <SimpleCard title="Approve Production Schedules">
       <Table data={deliveries} cols={DeliveryTable(handleEdit,actions,[4,6])} ></Table>
   </SimpleCard>
   </>
  )
}

export default ProductionApp
