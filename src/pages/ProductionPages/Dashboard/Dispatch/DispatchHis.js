import React,{useState} from 'react'
import Table from '../../../../Components/tables/Table'
import SimpleCard from '../../../../UI/cards/SimpleCard'
import DispatchTable from './DispatchTable'
import {dispatchData} from './Dispatchdata'

function DispatchHis() {
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
    if(action=="orderForm"){
        const newState={
            showForm:true,
            selectedForm:"",
           selectedItem:{...item}
        }
        setShowformparams({...showFormParams,...newState})           
        }
    else if(action=="monthlyPlan"){
   // alert(JSON.stringify({...item}));
   const newState={
    showForm:true,
    selectedForm:"",
    selectedItem:{...item}
}
    setShowformparams({...showFormParams,...newState})       
    }else if(action=="dailyPlan"){
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
   <SimpleCard title="Dispatch History" >
      <Table cols={DispatchTable(showFormHandler,actions)} data={dispatchData} striped></Table>
   </SimpleCard>
  )
}

export default DispatchHis
