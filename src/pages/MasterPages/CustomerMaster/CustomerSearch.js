import React, { useState, useReducer, useEffect,useCallback } from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import SearchCard from "../../../UI/cards/SearchCard";
import Modal from "../../../UI/Modal/Modal";
import CustomerTable from "./CustomerTable";
import classes from "./orders.module.css";
import Table from "../../../Components/tables/Table";
import SimpleCard from "../../../UI/cards/SimpleCard";
import { Alert,Row,Col } from "react-bootstrap";
import CustomerForm from "./CustomerForm";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../store/modal-Slice";
import { alertActions } from "../../../store/alert-slice";
import api from "../../../Api";
import useFetch, { Provider } from "use-http";

const rowWiseFields = 4;
const template = {
  fields: [
    {
      title: "Customer Name",
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
const actions = ["edit","customerForm", "dispatch", "approval"];

function CustomerSearch(props) {
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const [loadState,setLoadState] =useState(Math.random())
  const [customers, setCustomers] = useState([]);
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

  const loadInitialCustomers = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const initialCusts = await get(api+"/customer/customers");
    if (response.ok) setCustomers(initialCusts);
    console.log(initialCusts)
  }, [get, response,loadState]);

  useEffect(() => { loadInitialCustomers() }, [loadInitialCustomers]) // componentDidMount

  const  customerSave = async (Customer)=>{
    const newCustomer = await post(api+'/customer/create', Customer)
    if (response.ok) {
      if(Customer.customerId){
        setCustomers(customers.map((cust) => cust.customerId === Customer.customerId ? Customer : cust))
        dispatch(modalActions.hideModalHandler())
        AlertHandler("Customer Updated Successfully","success")
      }else{
        setCustomers([...customers, newCustomer])
        dispatch(modalActions.hideModalHandler())
        AlertHandler("Customer Created Succesfully","success")
      }
    }else{
      dispatch(modalActions.hideModalHandler())
      AlertHandler("Customer Details Failed To Save","danger")
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
            <CustomerForm
              onCancel={()=>dispatch(modalActions.hideModalHandler())}
              selectedItem={selectedData}
              customerSave = {customerSave}
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
            <CustomerForm
              onCancel={()=>dispatch(modalActions.hideModalHandler())}
              selectedItem={{...item}}
              customerSave = {customerSave}
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
        title="Customer Search"
        buttonName="New Customer"
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
          cols={CustomerTable(showFormHandler, actions)}
          data={customers}
          rows={10}
          striped
        />
      </SimpleCard>
    </div>
  );
}

export default CustomerSearch;

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
