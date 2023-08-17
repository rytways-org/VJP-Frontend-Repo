import React,{useState} from 'react'
import Table from '../../../Components/tables/Table'
import SimpleCard from '../../../UI/cards/SimpleCard'
import ProductionTable from './ProductionTable'
import {productionData} from './ProductionData'
import classes from './prodSum.module.css' 
import Modal from '../../../UI/Modal/Modal';
import StockChart from './StockChart/StockChart'
import {Row,Col} from 'react-bootstrap'

function ProductionSummary() {
const [showCharts,setShowCharts] = useState(false)
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

const actions = ["dispatch","lineOfBal","rawMat"]

const showFormHandler = (item,action) => () => {
    setShowCharts(!showCharts)
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
  return (
   <SimpleCard title="Line Of Balance" className={classes.card}>
   <Row className="d-flex justify-content-center"> 
       <Col md={6}>
       <Table cols={ProductionTable(showFormHandler,actions)} 
       data={productionData} rows={25} striped></Table>
       </Col>
       <Col md={6}>
        {showCharts && <StockChart/>}
       </Col>
   </Row>
   </SimpleCard>
  )
}

export default ProductionSummary
