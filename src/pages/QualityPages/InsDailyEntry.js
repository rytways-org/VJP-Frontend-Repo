import React,{useState,useCallback,useEffect} from 'react'
import classes from '../ProductionPages/ProductionEntry/DailyEntry/dailyentry.module.css'
import SimpleCard from '../../UI/cards/SimpleCard'
import {Card,Modal} from 'react-bootstrap'
import Table from '../../Components/tables/Table'
import { ProcessTable } from './ProcessTable'
import {ProcessData} from '../ProductionPages/ProductionEntry/DailyEntry/ProcessData'
import QualityForm from './QualityForm'
import {Button,Row,Col} from 'react-bootstrap'
import ReworkForm from './ReworkEntry'
import useFetch, { Provider } from "use-http";
import api from "../../Api";
import { alertActions } from "../../store/alert-slice";
import { useSelector, useDispatch } from "react-redux";
import Ctheme from '../../Components/Ctheme/Ctheme'

const stylesUpper = {
  margin: "0",
  padding: "0",

};
const stylesUpperTwo = {
  margin: "0rem 1rem",
  
}

const styles = { 
  table: {
  height:'360px',
  
  },
  upper: {
    padding:'1rem',
  }
};
function InsDailyEntry(props) {
  const [intialvalues, setIntialvalues] = useState();
  const [procMaps, setProcMaps] = useState([]);
  const dispatch = useDispatch();
  const { get, post, response, loading, error } = useFetch({ data: [] });

  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);

  const loadInitialdata = useCallback(async () => {
    const { ok } = response; // BAD, DO NOT DO THIS
    //const prodId = props.selectedItem.order.product.productId;
    const loadeddata = await post(api + "/ppMap/qualityProcessMaps", {id:props.selectedItem.orderId,productId:props.selectedItem.productId,random:Math.random()});
    console.log(loadeddata)
    setProcMaps(loadeddata);
    //console.log({ ...props.selectedItem.productId });
  }, [get, response]);


  
  const AlertHandler = (alertContent, alertType) => {
    dispatch(
      alertActions.showAlertHandler({
        showAlert: !showAlert,
        alertMessage: alertContent,
        alertVariant: alertType,
      })

    );
  };

  useEffect(() => {
    loadInitialdata();
  }, [loadInitialdata]); // componentDidMount

  const [selectedItem, setSelectedItem] = useState({
    id: "",
    Month: "",
    Year: "",
    Remarks: "",
    Quantity: "",
  });

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

const actions = ["inspection","rework"]
const showFormHandler = (item,action) => () => {
      console.log({...item})
    if(action=="inspection"){
      const newState = {
        showForm: true,
        selectedForm: (
          <QualityForm
            onCancel={hideFormHandler}
            selectedItem={{...item}}
            orderId={props.selectedItem.orderId}
            productName = {props.selectedItem.product.productName}
          />
        ),
        selectedItem: { ...item },
      };
      setShowformparams({ ...showFormParams, ...newState });     
    }else if(action=="rework"){
          // alert(JSON.stringify({...item}));
          //setShowformparams({...showFormParams,showFormParams.selectedItem:item})
          const newState = {
            showForm: true,
            selectedForm: (
              <ReworkForm
                onCancel={hideFormHandler}
                selectedItem={{...item}}
                orderId={props.selectedItem.orderId}
                productName = {props.selectedItem.product.productName}
                customerName = {props.selectedItem.product.customer.name}
              />
            ),
            selectedItem: { ...item },
          };
          setShowformparams({ ...showFormParams, ...newState });          
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
  return (
    <>
    <Modal {...props} showFormHandler={showFormHandler}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered  show={showFormParams.showForm} onHide={hideFormHandler}>
        <Modal.Header closeButton>
          {showFormParams.title}
        </Modal.Header>
        <Modal.Body>{showFormParams.selectedForm}</Modal.Body>
      </Modal>
      <SimpleCard upper={stylesUpper} useUpperTwoStyle={false} >
     <Card body className={classes.title} style={{backgroundColor:Ctheme.colors.ttle,}}>
       <h5>Inspection Entry -  {" "} {props.selectedItem.product.productName} ({props.selectedItem.product.customer.name})</h5> </Card>
       <SimpleCard uppertwo={stylesUpperTwo} useUpperTwoStyle={true} className={classes.simcard}>
     <Table data={procMaps} cols={ProcessTable(showFormHandler,actions,[])}
     rows={50} styles={styles}></Table>
    </SimpleCard>
    </SimpleCard> 
    </>    
  )
}

export default InsDailyEntry
