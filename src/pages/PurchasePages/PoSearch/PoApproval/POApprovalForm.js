import React, { useState, useEffect, useCallback,useContext } from "react";
import CreateForm from "../../../../Components/Forms/CreateForm";
import api from "../../../../Api";
import useFetch, { Provider } from "use-http";
import Table from "../../../../Components/tables/Table";
import ApprovalTable from "./ApporvalTable";
import { data } from "./data";
import SimpleCard from "../../../../UI/cards/SimpleCard";
import AuthContext from '../../../../store/auth-context';
import { alertActions } from "../../../../store/alert-slice";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../../store/modal-Slice";
import Ctheme from "../../../../Components/Ctheme/Ctheme";

const stylesUpper = {
  margin: "0",
  padding: "0",

};


const styles ={
  simplettl: {
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor:Ctheme.colors.ttle,
    borderBottomLeftRadius: '0px', 
    borderBottomRightRadius: '0px', 
  },
  tablehead: {
    padding: '.5rem 1rem',
  }
}
const rowWiseFields = 3;
const prods = [];
const custs = [];

function PoApprovalForm(props) {
  const { get, post, response, loading, error } = useFetch({ data: [] });

  let [deliveries, setDeliveries] = useState(
    props.selectedItem.deliveries ? props.selectedItem.deliveries : []
  );

  const authCtx = useContext(AuthContext); 
  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);
  const dispatch = useDispatch();
  
  const AlertHandler = (alertContent, alertType) => {
    dispatch(
      alertActions.showAlertHandler({
        showAlert: !showAlert,
        alertMessage: alertContent,
        alertVariant: alertType,
      })
    );
  };
  const [maxQty, setMaxQty] = useState(
    props.selectedItem ? props.selectedItem.quantity : 1
  );
  const [prods, setProds] = useState([]);
  const [approvalData,setApprovalData] = useState({statusState: 0,
    poApprovalId:0,
    poId: props.selectedItem.poId,
    poApproval1:  "",
    approver1: "",
    poApproval2:"",
    approver2: "",
    poApproval3:"",
    approver3: "",
    poApproval4: "",
    approver4: "",
    poApproval5:  "",
    approver5: "",
    stateInts : 0,
    isRejected : 0,
rejectedState:0})

  const loadInitialOptions1 = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const loadedprods = await post(api + "/poApproval/getBypoId", {
      id: props.selectedItem.poId,
      rand:Math.random()
    });
    console.log(loadedprods)

  setApprovalData(
    {...approvalData,
      poApprovalId: loadedprods.poApprovalId,
      statusState:  loadedprods.statusState,
      poId: loadedprods.poId,
      approver1: loadedprods.approver1,
      approver2: loadedprods.approver2,
      approver3:  loadedprods.approver3,
      approver4:  loadedprods.approver4,
      approver5:  loadedprods.approver5,
      stateInts : 0,
      rejectedState : loadedprods.rejectedState,
      isRejected :  loadedprods.isRejected,
    },
  );
    loadedprods.userId = localStorage.getItem('userId');
    setProds([loadedprods]);
    console.log(loadedprods)
    console.log(prods.length)
    console.log(approvalData)
    //setApprovalData(lodedprods);
    // console.log({...props.selectedItem})
  }, [get, response]);

  useEffect(() => {
    loadInitialOptions1();
  }, []); // componentDidMount

  function onSubmit(values) {
    values.deliveries = deliveries;
    props.saveFunction(values);
    console.log(values);
    //props.saveFunction(values);
  }

  const template = {
    heading: "PO Approval Form",
    fields: [
      {
        title: "Approval Date",
        type: "date",
        name: "OrderDate",
        contains: "date",
        validationProps: "Internal Part No is required",
        inpprops: {
          format: "dd/mm/yyyy",
        },
      },
      {
        title: "Remarks",
        type: "textarea",
        name: "Orders",
        contains: "textarea",
        validationProps: "Internal Part No is required",
        inpprops: {
          md: 4,
        },
      },
      {
        title: "Update Po Status",
        type: "select",
        name: "prodSubCats",
        contains: "Select",
        options: [
          { value: "1", label: "Approve" },
          { value: "5", label: "Reject" },
        ],
      },
    ],
  };
  function validate(watchValues, errorMethods) {
    let { errors, setError, clearErrors } = errorMethods;

    // Firstname validation
    if (watchValues[0] > 0) {
      console.log(watchValues[0]);
      setMaxQty(watchValues[0]);
    }
  }


  console.log(approvalData)
  const saveDetails = async (poApproval) => {
    //  procMaps
    console.log(approvalData)    
    const orderapi = "/poApproval/update";
    const generateDoc = "/jasperReports/report"
    console.log(orderapi);
    const returnObject = await post(api + orderapi, poApproval);
    const generateDocReturn = await post(api + generateDoc,{poId: props.selectedItem.poId,
      rand:Math.random()
    })
    console.log(returnObject);
    if (returnObject.retValues.status == 1) {
      if (poApproval.poApprovalId ) {
        setApprovalData(returnObject.retValues.poApproval);
        AlertHandler(returnObject.retValues.message, "success");
        dispatch(modalActions.hideModalHandler());
      } else if (returnObject.retValues.poApproval.poApprovalId > 0) {
        setApprovalData(returnObject.retValues.poApproval);
        AlertHandler(returnObject.retValues.message, "success");
        dispatch(modalActions.hideModalHandler());
      }
    } else {
      AlertHandler(returnObject.retValues.message, "danger");
      dispatch(modalActions.hideModalHandler());
    }
  };
  const handleEdit =(values,action,rejects)=>()=>{
      if(action===2 && rejects ==0){
       values.statusState = Number(values.statusState)+1
       values.stateInts=action       
      }else if(action===3 && rejects ==0){
        values.statusState = Number(values.statusState)+1
       values.stateInts=action    
      }else if(action===4 && rejects ==0){
        values.statusState = Number(values.statusState)+1
        values.stateInts=action    
      }else if(action===5 && rejects ==0){
        values.statusState = Number(values.statusState)+1
        values.stateInts=action    
      }else if(rejects=1){
          values.rejectState= action
          values.isRejected=1
      }
     // values.userId = authCtx.userId;
      console.log(authCtx.userId)
      console.log(values)
      saveDetails(values) 
  }

  return (
    <SimpleCard upper={stylesUpper} useUpperTwoStyle={false}  styles={styles} title="Po Approval">
      <Table cols={ApprovalTable(handleEdit,"action",authCtx.roleId)} data={prods} styles={styles}></Table>
    </SimpleCard>
  );
}

export default PoApprovalForm;
