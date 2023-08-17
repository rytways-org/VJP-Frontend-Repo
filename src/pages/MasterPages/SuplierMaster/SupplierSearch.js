import React, { useState, useReducer, useEffect,useCallback } from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import SearchCard from "../../../UI/cards/SearchCard";
import Modal from "../../../UI/Modal/Modal";
import SupplierTable from "./SupplierTable";
import classes from "./orders.module.css";
import Table from "../../../Components/tables/Table";
import SimpleCard from "../../../UI/cards/SimpleCard";
import { Alert,Row,Col } from "react-bootstrap";
import SupplierForm from "./SupplierForm";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../store/modal-Slice";
import { alertActions } from "../../../store/alert-slice";
import api from "../../../Api";
import useFetch, { Provider } from "use-http";

const rowWiseFields = 4;
const template = {
  fields: [
    {
      title: "Supplier Name",
      type: "text",
      name: "customerName",
      contains: "text",
      inpprops: {
        minlength: 0,
        maxlength: 30,
      },
    },
  ],
};
const actions = ["edit","supplierForm", "dispatch", "approval"];

function SupplierSearch(props) {
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const [loadState,setLoadState] =useState(Math.random())
  const [suppliers, setSuppliers] = useState([]);
  const [states,setStates] =useState([{"value":"","label":"Select"}]);
 
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
  
  const loadInitialsuppliers = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const initialCusts = await get(api+"/supplier/suppliers");
    const loadedStates = await get(api+"/state/loadOptions");
    if (response.ok) 
    setSuppliers(initialCusts);
    setStates([...states,...loadedStates])
    console.log(initialCusts)
  }, [get, response,loadState]);

  useEffect(() => { loadInitialsuppliers() }, [loadInitialsuppliers]) // componentDidMount

  const  saveFuntion = async (supplier)=>{
    const newSupplier = await post(api+'/supplier/create', supplier)
    if (response.ok) {
      if(supplier.customerId){
        setSuppliers(suppliers.map((cust) => cust.customerId === supplier.customerId ? supplier : cust))
        dispatch(modalActions.hideModalHandler())
        AlertHandler("Supplier Details Updated Successfully","success")
      }else{
        setSuppliers([...suppliers, newSupplier])
        dispatch(modalActions.hideModalHandler())
        AlertHandler("Supplier Created Succesfully","success")
      }
    }else{
      dispatch(modalActions.hideModalHandler())
      AlertHandler("Supplier Details Failed To Save","danger")
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
            <SupplierForm
              onCancel={()=>dispatch(modalActions.hideModalHandler())}
              selectedItem={selectedData}
              suppliersave = {saveFuntion}
              states = {states}
            />
          ),
          showModal: true,
        })
      );
    } else if (action === "supplierForm") {
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <SupplierForm
              onCancel={()=>dispatch(modalActions.hideModalHandler())}
              selectedItem={{...item}}
              suppliersave = {saveFuntion}
              states = {states}
            />
          ),
          showModal: true,
        })
      );
    }
  };
  
  return (
    <div className={classes.container}>
      <SearchCard
        title="Supplier Search"
        buttonName="New Supplier"
        onHeaderClick={showFormHandler({}, "supplierForm",[0,10,2])}
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
          cols={SupplierTable(showFormHandler, actions)}
          data={suppliers}
          rows={10}
          striped
        />
      </SimpleCard>
    </div>
  );
}

export default SupplierSearch;

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
