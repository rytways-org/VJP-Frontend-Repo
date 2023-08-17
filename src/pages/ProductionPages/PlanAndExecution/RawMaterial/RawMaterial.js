import React,{useState} from 'react'
import SearchCard from '../../../../UI/cards/SearchCard'
import SimpleCard from '../../../../UI/cards/SimpleCard'
import { Rmdata } from './RmData'
import RmTable from './RmTable'
import Table from '../../../../Components/tables/Table'
import classes from './rmentry.module.css'
import { Row,Button,Modal } from 'react-bootstrap'
import RmForm from './RmForm'
import SplitUpForm from './SplitUpForm'
import AlternateForm from './AlternateForm'
import Ctheme from '../../../../Components/Ctheme/Ctheme'

const styles = {
    search: {
      
      padding: "0rem",
      margin:'0',
      
      border:'0'
    },
  };

function RawMaterial(props) {
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

    const actions = ["RawMaterial","alternate","splitup"]

    const showFormHandler = (item,action) => () => {
        if(action=="RawMaterial"){
            const newState={
                showForm:true,
                selectedForm:<RmForm onCancel={hideFormHandler} selected={showFormParams.selectedItem}/>,
                selectedItem:{...item}
            }
            setShowformparams({...showFormParams,...newState})           
            }else if(action=="alternate"){
                const newState={
                    showForm:true,
                    selectedForm:<AlternateForm onCancel={hideFormHandler} selected={showFormParams.selectedItem}/>,
                    selectedItem:{...item}
                }
                setShowformparams({...showFormParams,...newState})           
                }else if(action=="splitup"){
                    const newState={
                        showForm:true,
                        selectedForm:<SplitUpForm  onCancel={hideFormHandler} selected={showFormParams.selectedItem}></SplitUpForm>,
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
  return (
      <>
      <Modal show={showFormParams.showForm} onHide={hideFormHandler}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>{showFormParams.selectedForm}</Modal.Body>
      </Modal>
     <SearchCard title="Raw Material Details" 
                 buttonName="Add Material" 
                 onHeaderClick={showFormHandler({},"RawMaterial")} 
                 bottonShow={showFormParams.showForm}
                 styles={styles}
                 >
    
        <Table cols={RmTable(showFormHandler,actions)} data={Rmdata} className={classes.tableCon}></Table>
       
        <Row className={classes.buttCon}>
        <Button className={classes.btn}>Request</Button>
        <Button variant='danger' className={classes.btn} onClick={props.onCancel}>Cancel</Button>
        
        </Row>
   </SearchCard>
   </>
  )
}

export default RawMaterial
