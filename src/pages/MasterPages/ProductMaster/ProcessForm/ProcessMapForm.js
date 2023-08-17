import React, { useState, useEffect, useCallback } from "react";
import CreateForm from "../../../../Components/Forms/CreateForm";
import SearchCard from "../../../../UI/cards/SearchCard";
import Modal from "../../../../UI/Modal/Modal";
import classes from "../orders.module.css";
import SimpleCard from "../../../../UI/cards/SimpleCard";
import { Row, Col, Alert } from "react-bootstrap";
import ProcessMapTable from "./ProcessMapTable";
import Table from "../../../../Components/tables/Table";
import api from "../../../../Api";
import useFetch, { Provider } from "use-http";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../../store/modal-Slice";
import { alertActions } from "../../../../store/alert-slice";

const styles = { 
  search: {
  border:'0px',
  margin:'0rem'
  
  },
  upper: {
    padding:'.5rem 1rem'
  }
  
};

const rowWiseFields = 3;

function ProcessMapForm(props) {
  const [intialvalues, setIntialvalues] = useState({});
  const [procMaps, setProcMaps] = useState();
  const [process, setProcess] = useState([{ value: "", label: "Select" }]);
  const { get, post, response, loading, error } = useFetch({ data: [] });

  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);

  const [showModal, selectedForm, selectedData] = useSelector((state) => [
    state.modalProps.showModal,
    state.modalProps.selectedForm,
    state.modalProps.selectedData,
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
   const loadInitialOptions = useCallback(async () => {
      // const { ok } = response // BAD, DO NOT DO THIS
    const loadedprocess = await get(api + "/process/loadOptions");
    setProcess([...process, ...loadedprocess]);
    console.log({ ...props.selectedItem });
   }, [get, response]);
 
   const loadInitialdata = useCallback(async () => {
      const { ok } = response // BAD, DO NOT DO THIS
      const prodId = props.selectedItem.productId
     const loadeddata = await post(api + "/ppMap/processMaps",{"id":props.selectedItem.productId,"loadTime":Date().toLocaleString()});
      setProcMaps(loadeddata);
     //console.log({ ...props.selectedItem.productId });
   }, [get, response]);

  useEffect(()=>{loadInitialdata()},[]);
   useEffect(() => {
     loadInitialOptions();
 }, [loadInitialOptions]); // componentDidMount

 const products=[]
  const saveDetails = async (processMap) => {
    console.log(processMap)
   //  procMaps
   const ppmapApi = processMap.prodProcMapId ? "/ppMap/update" : "/ppMap/create"
   const returnObject= await post(api + ppmapApi, processMap);
   console.log(returnObject.retValues)
    if (returnObject.retValues.status==1) {
      if (processMap.prodProcMapId) {
         setProcMaps(
           procMaps.map((ppm) =>
           ppm.prodProcMapId=== returnObject.retValues.processMap.prodProcMapId ? returnObject.retValues.processMap : ppm
           )
         );
        // hideFormHandler();
        loadInitialdata()
        AlertHandler(returnObject.retValues.message, "success");
        setIntialvalues({})
      } else if(returnObject.retValues.processMap.prodProcMapId>0) {
        setProcMaps([...procMaps, returnObject.retValues.processMap]);
       // hideFormHandler();
       loadInitialdata();
        AlertHandler(returnObject.retValues.message, "success");
       setIntialvalues({})
      }
    }else {
      // hideFormHandler();
       AlertHandler(returnObject.retValues.message, "danger");
      setIntialvalues({})
     }
  };
  const actions = ["edit"];

  const showFormHandler = (item,action) => () => {
    if (action === "edit") {
      setIntialvalues({...item});
      console.log(intialvalues)
    }
  };
  const hideFormHandler = () => {
    dispatch(
      modalActions.showModalHandler({
        selectedData: {},
        selectedForm: <></>,
        showModal: false,
      })
    );
  };

  const template = {
    fields: [
      {
        title: "Process Name",
        type: "select",
        name: "processId",
        contains: "Select",
        options: process,
      },
      {
        title: "Sequence Number",
        type: "number",
        name: "sequenceNo",
        contains: "number",
        validation: "Quantity is Required",
        inpprops: {
          min: 1,
          step: 1,
        },
      },
      {
        type: "hidden",
        name: "productId",
        contains: "number",
        value:props.selectedItem.productId
      },
      {
        type: "hidden",
        name: "prodProcMapId",
        contains: "number",
      },
    ],
  };

  function onSubmit(values) {
    saveDetails(values);
    //console.log(values);
  }
  
  return (
    <div className={classes.container}>
      <SearchCard
        title={`Process Mapping for ${props.selectedItem.productName}`}
        buttonName="Add"
        onHeaderClick={showFormHandler({}, "productForm", [0, 1, 2, 3, 4])}
        bottonShow={showModal}
        styles={styles}
       >
        {<CreateForm
          template={template}
          rowwise={rowWiseFields}
          validate={validate}
          onSubmit={onSubmit}
          onCancel={props.onCancel}
          buttonName="Save"
          defaultValues={intialvalues}
          styles={styles}
        ></CreateForm>}
      </SearchCard>
      <SimpleCard md={12}>
      {procMaps && (
   <Table
     cols={ProcessMapTable(showFormHandler, actions)}
    data={procMaps}
    rows={10}
    striped
   />
 )}
      </SimpleCard>
    </div>
  );
}

export default ProcessMapForm;


function validate(watchValues, errorMethods) {
  let { errors, setError, clearErrors } = errorMethods;

  // Firstname validation
  if (watchValues["firstname"] === "Admin") {
    if (!errors["firstname"]) {
      setError("firstname", {
        type: "manual",
        message: "You cannot use this first name",
      });
    }
  } else {
    if (errors["firstname"] && errors["firstname"]["type"] === "manual") {
      clearErrors("firstname");
    }
  }
}
 
