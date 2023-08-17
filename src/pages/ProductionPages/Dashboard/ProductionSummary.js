import React,{useState} from 'react'
import Table from '../../../Components/tables/Table'
import SimpleCard from '../../../UI/cards/SimpleCard'
import ProductionTable from './ProductionTable'
import {productionData} from './ProductionData'
import classes from './prodSum.module.css' 
import Modal from '../../../UI/Modal/Modal';
import DispatchHis from './Dispatch/DispatchHis'
import ProcessView from '../OrderSearch/ProcessView/ProcessView'
import RawMaterial from './RawMat/RawMaterials'
import StockChart from './StockChart/StockChart'
import {Row,Col, Container,Button} from 'react-bootstrap'
import RmSummary from './RmMaterials/RmSummary'
import LineOfBal from './LineOfBal'

function ProductionSummary() {
  const [showFormParams,setShowformparams]=useState({
    showForm:false,
    selectedForm:"",
    selectedItem:{ id:0,
        productName: "",
        cusName: "",
        part: "",
        quantity: "",
        cost: ""
        }
})

const actions = ["dispatch","lineOfBal","rawMat","viewSum"]

const showFormHandler = (item,action) => () => {
    if(action=="dispatch"){
        const newState={
            showForm:true,
            selectedForm:<DispatchHis/>,
           selectedItem:{...item}
        }
        setShowformparams({...showFormParams,...newState})           
        }
    else if(action=="lineOfBal"){
   // alert(JSON.stringify({...item}));
   const newState={
    showForm:true,
    selectedForm:<ProcessView></ProcessView>,
    selectedItem:{...item}
}
    setShowformparams({...showFormParams,...newState})       
    }else if(action=="rawMat"){
        // alert(JSON.stringify({...item}));
        //setShowformparams({...showFormParams,showFormParams.selectedItem:item})
        const newState={
         showForm:true,
         selectedForm:<RawMaterial></RawMaterial>,
         selectedItem:{...item}
     }
         setShowformparams({...showFormParams,...newState})       
         }else if(action=="viewSum"){
            // alert(JSON.stringify({...item}));
            const newState={
             showForm:true,
             selectedForm:<StockChart/>,
             selectedItem:{...item}
         }
             setShowformparams({...showFormParams,...newState})       
             }
}
const hideFormHandler=()=>{
    setShowformparams({...showFormParams,
        showForm:false,
        selectedForm:"",
        selectedItem:{...showFormParams.selectedItem,...{ id:0,
            productName: "",
            cusName: "",
            part: "",
            quantity: "",
            cost: "",
            }}
    })
   
    }
  return(
    <Container className={classes.Container}>
        <Row>
            <Col>
            <LineOfBal></LineOfBal>
            </Col>
        </Row>
        
    </Container>
  )
}

export default ProductionSummary



// <Row className={`${classes.row}`}>
//         <Col md={{span:6,offset:3}} >
//             <RmSummary></RmSummary>
//         </Col>
        
//         </Row>