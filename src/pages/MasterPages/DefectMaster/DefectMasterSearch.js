import React, { useState, useReducer, useEffect,useCallback } from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import SearchCard from "../../../UI/cards/SearchCard";
import Modal from "../../../UI/Modal/Modal";
import MaterialsMasterTable from "./DefectMasterTable";
import classes from "./orders.module.css";
import Table from "../../../Components/tables/Table";
import SimpleCard from "../../../UI/cards/SimpleCard";
import { Alert,Row,Col } from "react-bootstrap";
import MaterialMasterForm from "./DefectForm";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../store/modal-Slice";
import { alertActions } from "../../../store/alert-slice";
import api from "../../../Api";
import {data } from "./data"
import useFetch, { Provider } from "use-http";

const rowWiseFields = 4;
const actions = ["edit","customerForm", "dispatch", "approval"];

function MaterialMasterSearch(props) {
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const [loadState,setLoadState] =useState(Math.random())
  const [materials, setMaterials] = useState([]);
  const [showModal, selectedForm, selectedData] = useSelector((state) => [
    state.modalProps.showModal,
    state.modalProps.selectedForm,
    state.modalProps.selectedData,
  ]);

  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);

  const dispatch = useDispatch();

  const loadInitialMaterials = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const initialMats = await post(api+"/defect/defects",{rand:Math.random()});
    if (response.ok) setMaterials(initialMats);
  }, [get, response,loadState]);

  useEffect(() => { loadInitialMaterials() }, [loadInitialMaterials]) // componentDidMount

  const  saveFuntion = async (material)=>{
    const newMaterial = await post(api+'/material/create', material)
    if (response.ok) {
      if(material.materialId){
        setMaterials(materials.map((mat) => mat.materialId === material.materialId ? material : mat))
        dispatch(modalActions.hideModalHandler())
        AlertHandler("Material Updated Successfully","success")
      }else{
        setMaterials([...materials, newMaterial])
        dispatch(modalActions.hideModalHandler())
        AlertHandler("Material Created Succesfully","success")
      }
    }else{
      dispatch(modalActions.hideModalHandler())
      AlertHandler("Material Details Failed To Save","danger")
    }
  }

  const AlertHandler=(alertContent,alertType)=>{
    dispatch(
     alertActions.showAlertHandler({
      showAlert : !showAlert, 
      alertMessage : alertContent,
      alertVariant : alertType
    }
     )
    );
  }
  const showFormHandler = (item, action) => () => {
    console.log(action);
    if (action === "edit") {
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <MaterialMasterForm
              onCancel={()=>dispatch(modalActions.hideModalHandler())}
              selectedItem={selectedData}
              customerSave = {saveFuntion}
            />
          ),
          showModal: true,
        })
      );
    } else if (action === "customerForm") {
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <MaterialMasterForm
              onCancel={()=>dispatch(modalActions.hideModalHandler())}
              selectedItem={{...item}}
              customerSave = {saveFuntion}
            />
          ),
          showModal: true,
        })
      );
    }
  };

  function onSubmit(values) {
    values.random = Math.random();
    console.log(values);
    searchDetails(values);
  }

  const searchDetails = async (values) => {
    //  procMaps
    const orderapi =  "/defect/searchDefects";
    console.log(orderapi);
    const returnObject = await post(api + orderapi, values);
    console.log(returnObject);
    if(returnObject.length>0){
      setMaterials(returnObject);
    }else{
      setMaterials([])
    }
    
   
  };

  const template = {
    fields: [
      {
        title: "Defect Name",
        type: "text",
        name: "defectName",
        contains: "text",
        inpprops: {
        },
      },{
        title: "Defect Type",
        type: "select",
        name: "defectType",
        contains: "Select",
        options: [
          { value: "Select", label: "Select" },
          { value: "Pouring", label: "Pouring" },
          { value: "Machining", label: "Machining" },
         
        ],
      },{
        title: "Defect Description",
        type: "textarea",
        name: "description",
        contains: "textarea",
       inpprops:{md:3}
      },
    ],
  };
  
  return (
    <div className={classes.container}>
      <SearchCard
        title="Defects Search"
        buttonName="New Defects"
        onHeaderClick={showFormHandler({}, "customerForm",[0,10,2])}
        bottonShow={showModal}
      >
        <CreateForm
          template={template}
          rowwise={rowWiseFields}
          validate={validate}
          onSubmit={onSubmit}
          onCancel={props.onCancel}
          buttonName="Search"
        ></CreateForm>
      </SearchCard>
      <SimpleCard md={12}>
        <Table
          cols={MaterialsMasterTable(showFormHandler, actions)}
          data={materials}
          rows={10}
        />
      </SimpleCard>
    </div>
  );
}

export default MaterialMasterSearch;

function onSubmit(values) {
  console.log(values);
}

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
