import React,{useState} from 'react'
import Table from '../../../../Components/tables/Table'
import SimpleCard from '../../../../UI/cards/SimpleCard'
import RmTable from './RmTable'
import {Rmdata} from './RMdata'
import Modal from '../../../../UI/Modal/Modal';

function RawMaterials() {
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
    if(action=="dispatch"){
        const newState={
            showForm:true,
            selectedForm:"",
           selectedItem:{...item}
        }
        setShowformparams({...showFormParams,...newState})           
        }
    else if(action=="lineOfBal"){
   // alert(JSON.stringify({...item}));
   const newState={
    showForm:true,
    selectedForm:"",
    selectedItem:{...item}
}
    setShowformparams({...showFormParams,...newState})       
    }else if(action=="rawMat"){
        // alert(JSON.stringify({...item}));
        //setShowformparams({...showFormParams,showFormParams.selectedItem:item})
        const newState={
         showForm:true,
         selectedForm:"",
         selectedItem:{...item}
     }
         setShowformparams({...showFormParams,...newState})       
         }else if(action=="jobOrder"){
            // alert(JSON.stringify({...item}));
            const newState={
             showForm:true,
             selectedForm:"",
             selectedItem:{...item}
         }
             setShowformparams({...showFormParams,...newState})       
             }else if(action=="processView"){
                // alert(JSON.stringify({...item}));
                const newState={
                 showForm:true,
                 selectedForm:"",
                 selectedItem:{...item}
             }
                 setShowformparams({...showFormParams,...newState})       
                 }else if(action=="dispatch"){
                    // alert(JSON.stringify({...item}));
                    const newState={
                     showForm:true,
                     selectedForm:"",
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
   <SimpleCard title="Raw Materials Summary" >
    {showFormParams.showForm && <Modal onClose={hideFormHandler} size={10}>{showFormParams.selectedForm}</Modal>}
    <Table cols={RmTable(showFormHandler,actions)} data={Rmdata} striped></Table>
   </SimpleCard>
  )
}

export default RawMaterials
