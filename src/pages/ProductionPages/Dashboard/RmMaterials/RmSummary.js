import React,{useState} from 'react'
import Table from '../../../../Components/tables/Table'
import SimpleCard from '../../../../UI/cards/SimpleCard'
import RmMaterialsTable from './RmMaterialsTable'
import {RmData} from './RmData'
import classes from '../prodSum.module.css' 
import Modal from '../../../../UI/Modal/Modal';
import {Row,Col} from 'react-bootstrap'

function RmSummary() {
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
    <SimpleCard title="Raw Materials Availability" className="d-flex justify content-center">
    {showFormParams.showForm && <Modal onClose={hideFormHandler} size={10}>{showFormParams.selectedForm}</Modal>}
    <Table cols={RmMaterialsTable(showFormHandler,actions)} data={RmData} striped></Table>
   </SimpleCard>
   
  )
}

export default RmSummary
