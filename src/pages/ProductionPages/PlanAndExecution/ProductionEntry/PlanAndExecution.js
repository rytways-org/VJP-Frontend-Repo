import React, { useState, useEffect, useCallback } from "react";
import CreateForm from "../../../../Components/Forms/CreateForm";
import api from "../../../../Api";
import useFetch, { Provider } from "use-http";
import PlanSchedule from "./PlanShift/PlanSchedule";
import EntryTable from "./PlanShift/EntryTable";
import Table from '../../../../Components/tables/Table'
import { FilterTiltShiftRounded } from "@mui/icons-material";
import { Row,Button,Modal } from 'react-bootstrap'
import FurnanceForm from "./PlanShift/FurnanceEntry/FurnanceForm";
import MeltingOutward from "./PlanShift/FurnanceEntry/MeltingOutward";
import EditEntry from "./PlanShift/EditEntry";
import { useSelector, useDispatch } from "react-redux";
import { alertActions } from "../../../../store/alert-slice";
import Ctheme from "../../../../Components/Ctheme/Ctheme";

const rowWiseFields = 3;
const styles = {
  upper: {
    padding: "0",
    margin: "0",
    borderRadius: '0px'
  },
  upperRow: {
    margin: '.5rem .5rem 0 .5rem',
    padding: "0"
  },
  uppertitle: {
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    backgroundColor:Ctheme.colors.ttle,
  },table: {
    padding: "1rem",
    
  }
};


function PlanAndExecution(props) {
  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);
  const dispatch = useDispatch();
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
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const[isCasting,setIsCasting] = useState(false);
  const [loadedProcess, setLoadedProcess] = useState([
    { value: "", label: "Select" },
  ]);
  const template = {
    heading: "Production Entry",
    fields: [
      {
        title: "Plan Date",
        type: "date",
        name: "planDate",
        contains: "date",
        validationProps: "Plan Date No is required",
        inpprops: {
          format: "dd/mm/yyyy",
        },
      },
      {
        title: "Shift",
        type: "select",
        name: "shift",
        contains: "Select",
        options: [
          { value: "", label: "Select" },
          { value: "Shift_1", label: "Shift 1" },
          { value: "Shift_2", label: "Shift 2" },
          { value: "Shift_3", label: "Shift 3" },
          { value: "All", label: "All" },
        ],
      },
      {
        title: "Department",
        type: "select",
        name: "departmentId",
        contains: "Select",
        options: [
          { value: "1", label: "Foundry" },
          { value: "2", label: "Quality" },
          { value: "3", label: "Machining" },
          { value: "4", label: "Others" },
        ],
      },
      {
        title: "Process Name",
        type: "select",
        name: "processId",
        contains: "Select",
        options: loadedProcess,
      },
    ],
  };
  const [formsValues, setFormValues] = useState({
    planDate: "",
    shift: "",
    departmentId: "1",
    processId: "15",
  });

  const [plans, setPlans] = useState([]);

  const [maxQty, setMaxQty] = useState(
    props.selectedItem ? props.selectedItem.quantity : 1
  );
  const addPlansHandler = (values, action) => {
    if (action === "add") {
      values["processId"] = formsValues.processId
      values["planDate"] = formsValues.planDate
      values["shift"] = formsValues.shift
      values["category"]=formsValues.departmentId
      setPlans((oldDeli) => [...oldDeli, values]);
    } else {
      console.log({ ...values });
      setPlans(
        plans.filter(function (obj) {
          return obj.lineNo !== values.lineNo;
        })
      );
    }
  };

  const [prods, setProds] = useState([{ value: "", label: "Select" }]);

  const saveProductionEntry = async (plan) => {
    // const { ok } = response // BAD, DO NOT DO THIS
   console.log(plan)
    const loadedprods = await post(api + "/dailyPlan/updateProduction",plan);
    hideFormHandler()
    // console.log({...props.selectedItem})
  };

  const savePlan = async (plan) => {
    // const { ok } = response // BAD, DO NOT DO THIS
    console.log(plan)
    const loadedprods = await post(api + "/dailyPlan/update",plan);
    // console.log({...props.selectedItem})
  };

 

  const getProcess = async (department) => {
    // const { ok } = response // BAD, DO NOT DO THIS
    console.log(department)
    const loadedprods = await post(api + "/process/loadprocess",{"id":department});
    console.log(loadedprods)
    if(loadedprods.length>0){
    setLoadedProcess([{"value":"", "label":"Select"},...loadedprods]);
    }else{
      setLoadedProcess([{"value":"", "label":"Select"}])
    }
    // console.log({...props.selectedItem})
  };
  useEffect(()=>{getProcess(1)},[])

  const saveProducedQuantityInPlan = async (item) => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const loadedprods = await post(api + "/dailyPlan/findProduced",item);
    console.log(loadedprods)
    if(response.ok){
      setPlans(plans => plans.map((plan) => (plan.dailyPlanId === loadedprods.dailyPlanId ? loadedprods : plan)))
    }

   
    // console.log({...props.selectedItem})
  };
 

  function onSubmit(values) {
    // values.plans = plans;
    // props.saveFunction(values);
    // console.log(values);
    // //props.saveFunction(values);
  }

  const validate=(watchValues, errorMethods)=> {
    let { errors, setError, clearErrors } = errorMethods;
    console.log(watchValues);
    // Firstname validation
    if (watchValues[0] != formsValues.planDate) {
      if(watchValues[1]!="" & watchValues[3]!=""){
        setPlans([])
        getProductsTable(watchValues[3],watchValues[0],watchValues[1]);
      }
      setFormValues(preValues=>{
        return{
          ...preValues,
          planDate:watchValues[0]
        }
      });
    }else if(watchValues[1] != formsValues.shift){
      if(watchValues[0]!="" & watchValues[3]!=""){
        setPlans([])
        getProductsTable(watchValues[3],watchValues[0],watchValues[1]);
      }
      setFormValues(preValues=>{
        return{
          ...preValues,
          shift:watchValues[1],
         
        }
      });
    }else if(watchValues[2] != formsValues.departmentId){
      getProcess(watchValues[2]);
      setFormValues(preValues=>{
        return{
          ...preValues,
          departmentId:watchValues[2]
        }
        
      });
    }else if(watchValues[3] != formsValues.processId){
      console.log(watchValues)
      if (watchValues[3] === "15") {
        setIsCasting(true)
      }else{
        setIsCasting(false)
      }
      if(watchValues[1]!="" & watchValues[0]!=""){
        setPlans([])
        getProductsTable(watchValues[3],watchValues[0],watchValues[1]);
      }
       setFormValues(preValues=>{
        return{
          ...preValues,
          processId:watchValues[3]
        }
      
      });
    }
    
    console.log(formsValues)
  }

  const showFormHandler = (item,action)=>() => {
    if(action=="FurnanceForm"){
        const newState={
            showForm:true,
            selectedForm:<MeltingOutward onCancel={hideFormHandler} 
            selectedItem={item}
            productName={item.order.product.productName}
            date={item.planDate}
            shift={item.shift}
            saveProduced={saveProducedQuantityInPlan}
            />,
            selectedItem:{...item}
        }
        setShowformparams({...showFormParams,...newState})           
        }else if(action=="EditEntry"){
          const newState={
            showForm:true,
            selectedForm:<EditEntry onCancel={hideFormHandler} 
            selectedItem={item}
            productName={item.order.product.productName}
            date={item.planDate}
            shift={item.shift}
            saveFunction={saveProductionEntry}
            />,
            selectedItem:{...item}
        }
        setShowformparams({...showFormParams,...newState})    
        }
}

const AlertHandler = (alertContent, alertType) => {
  dispatch(
    alertActions.showAlertHandler({
      showAlert: !showAlert,
      alertMessage: alertContent,
      alertVariant: alertType,
    })
  );
};

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

  const handleEdit=(saveValue,value,rowData)=>{
    
    if(saveValue==="producedQty"){
      if(Number(value)>Number(rowData.availableStock )){
        AlertHandler("Produced Qty cannot be greater than Avail Stock", "success");
        rowData.producedQty=0;
      }else{
      const oldValue = rowData.producedQty
      rowData.producedQty=value;
      rowData.availableStock = rowData.availableStock - (value- oldValue);
      saveProductionEntry(rowData);
    }
    }else{
      rowData.remarksAfterProd=value;
      savePlan(rowData);
    }
     }

     const getProductsTable = async (process,date,shift) => {
      // const { ok } = response // BAD, DO NOT DO THIS
      console.log("loading Products")
      const requestApi = shift=="All" ? "/dailyPlan/dailyPlansByDate":"/dailyPlan/dailyPlans"
      let loadedprods = await post(api + requestApi,{"id":process,"reqDate":date,"shift":shift,"random":Math.random()} );
      console.log(loadedprods)
      if(loadedprods.status==500 || loadedprods.length<1){
        setPlans([])
      }else{
        setPlans(loadedprods);
        setTable(<><Table
          data={plans} cols={EntryTable(handleEdit,"",isCasting,showFormHandler)} 
          rows={10}></Table>
         </>)
          }
       
      // console.log({...props.selectedItem})
    };

     const [table,setTable] = useState(<>
     </>)


  return (
    <>
    <Modal size="xl" show={showFormParams.showForm} onHide={hideFormHandler} >
        <Modal.Header closeButton >
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>{showFormParams.selectedForm}</Modal.Body>
      </Modal>
    <CreateForm
      template={template}
      rowwise={rowWiseFields}
      watchFields={["planDate","shift", "departmentId", "processId"]}
      validate={validate}
      onSubmit={onSubmit}
      onCancel={props.onCancel}
      buttonName="Submit"
      defaultValues={props.selectedItem}
      styles={styles}
      btButtons={plans && <div style={{padding:'0 2rem 0 2rem'}}><Table
        data={plans} cols={EntryTable(handleEdit,"",isCasting,showFormHandler)} 
        rows={10}></Table> </div> 
       }
    ></CreateForm>
    </>
  );
}

export default PlanAndExecution;
