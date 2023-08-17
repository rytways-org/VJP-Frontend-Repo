import React, { useState, useEffect, useCallback } from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import api from "../../../Api";
import useFetch, { Provider } from "use-http";
import EntryTable from "./PlanShift/EntryTable";
import Table from '../../../Components/tables/Table'
import Ctheme from "../../../Components/Ctheme/Ctheme";
  

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
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const [loadedProcess, setLoadedProcess] = useState([
    { value: "", label: "Select" },
  ]);
  const [select,setSelect]=useState([{ value: "", label: "Select" }])
  const template = {
    heading: "Production Plan Entry",
    fields: [
      {
        title: "Plan Date",
        type: "date",
        name: "planDate",
        contains: "date",
        validationProps: "Plan Date is required",
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
    departmentId: "",
    processId: "",
  });

  const savePlan = async (plan) => {
    // const { ok } = response // BAD, DO NOT DO THIS
    console.log(plan)
    const loadedprods = await post(api + "/dailyPlan/update",plan);
    // console.log({...props.selectedItem})
  };

  const handleEdit=(saveValue,value,rowData)=>{
    
  if(saveValue==="planedQty"){
    rowData.planQty=value;
    savePlan(rowData);
  }else{
    rowData.remarksForProd=value;
    savePlan(rowData);
  }
  
   }

  const [plans, setPlans] = useState([]);

  const [maxQty, setMaxQty] = useState(
    props.selectedItem ? props.selectedItem.quantity : 1
  );

  const [defaultValues,setDefaultValues]= useState({})
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
  

  const getProductsTable =async (process,date,shift) => {
    // const { ok } = response // BAD, DO NOT DO THIS
    console.log("loading Products")
    console.log(formsValues)
    const requestApi = shift==="All" ? "/monthlyPlan/dailyplans":"/monthlyPlan/dailyplansShiftWise"
    if(process!=null || process !=""){
    let loadedprods = await post(api + requestApi,{"id":process,"reqDate":date,"shift":shift,"random":Math.random()} );
    console.log(loadedprods)
    if(loadedprods.status==500 ||  loadedprods.length<1){
      setPlans([])
    }else{
      console.log(loadedprods)
      setPlans([])
      setPlans([...loadedprods]);
        }
      }
     
    // console.log({...props.selectedItem})
  };

  const getProcess = async (department) => {
    // const { ok } = response // BAD, DO NOT DO THIS
    console.log(department)
    const loadedprods = await post(api + "/process/loadprocess",{"id":department});
    console.log(loadedprods)
    setLoadedProcess([...select,...loadedprods]);
    // console.log({...props.selectedItem})
  };  

  useEffect(()=>{getProcess(1)},[])

  

  function onSubmit(values) {
    //values.plans = plans;
    getProductsTable(values.processId,values.planDate,values.shift);
    console.log(values);
    setDefaultValues(defaultValues=>({...formsValues}))
    //props.saveFunction(values); 
  }

  function validate(watchValues, errorMethods) {
    let { errors, setError, clearErrors } = errorMethods;
    console.log(watchValues);
    // Firstname validation
    if (watchValues[0] != formsValues.planDate) {
      setFormValues(preValues=>{
        return{
          ...preValues,
          planDate:watchValues[0]
        }
      });
      if(watchValues[1]!="" & watchValues[3]!="" & formsValues.planDate!=watchValues[0]){
        setPlans([])
        getProductsTable(watchValues[3],watchValues[0],watchValues[1]);
      }
      
    }else if(watchValues[1] != formsValues.shift){
      if(watchValues[0]!="" & watchValues[3]!="" & formsValues.shift!=watchValues[1]){
        setFormValues(preValues=>{
          return{
            ...preValues,
            shift:watchValues[1],
           
          }
        });
        setPlans([])
        getProductsTable(watchValues[3],watchValues[0],watchValues[1]);
      }
      
    }else if(watchValues[2] != formsValues.departmentId){
      setFormValues(preValues=>{
        return{
          ...preValues,
          departmentId:watchValues[2]
        }
        
      });
      getProcess(watchValues[2]);
     
    }else if(watchValues[3] != formsValues.processId){
      console.log(watchValues)
      
      if(watchValues[1]!="" & watchValues[0]!="" & formsValues.processId!=watchValues[3]){
        setFormValues(preValues=>{
          return{
            ...preValues,
            processId:watchValues[3]
          }
        
        });
        setPlans([])
       getProductsTable(watchValues[3],watchValues[0],watchValues[1]);
      }
      
    }
    
    console.log(formsValues)
  }


  //const forceUpdate = React.useCallback((plan) => updateState({setPlan({...plan})}), []);

  return (
    <>
    <CreateForm
      template={template}
      rowwise={rowWiseFields}
      watchFields={["planDate","shift","departmentId", "processId"]}
      validate={validate}
      onSubmit={onSubmit}
      onCancel={props.onCancel}
      defaultValues={defaultValues}
      buttonName=""
      styles={styles}
    ></CreateForm>  <Table
    data={plans} cols={EntryTable(handleEdit,"",[6,5])} 
    rows={10}
    styles={styles}></Table></>
  );
}

export default PlanAndExecution;
