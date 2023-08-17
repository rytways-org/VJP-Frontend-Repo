import React, { useState, useReducer, useEffect,useCallback } from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import SearchCard from "../../../UI/cards/SearchCard";
import Modal from "../../../UI/Modal/Modal";
import CustomerTable from "./InsEntryTable";
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

const actions = ["edit","customerForm", "dispatch", "approval"];

function CustomerSearch(props) {
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const [loadState,setLoadState] =useState(Math.random())
  const [customers, setCustomers] = useState([]);
  const [products,setProducts] = useState([{value:"0",label:"Select"}]);
  
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
    const initialCusts = await post(api+"/inspectionEntry/getTodays",{});
    const loadedprods = await get(api + "/product/loadOptions");

    if (response.ok) 
    setCustomers(initialCusts);
    setProducts([...products,...loadedprods])
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

  const searchDetails = async (values) => {
    //  procMaps
    const orderapi =  "/inspectionEntry/searchEntries";
    console.log(orderapi);
    const returnObject = await post(api + orderapi, values);
    console.log(returnObject);
    if(returnObject.length>0){
      setCustomers(returnObject);
    }else{
      setCustomers([])
    }
    
   
  };
  

  const template = {
    fields: [
      {
        title: "From Date",
        type: "date",
        name: "fromDate",
        contains: "date",
        inpprops: {
          format: "dd/mm/yy",
                },
      },  {
        title: "To Date",
        type: "date",
        name: "toDate",
        contains: "date",
        inpprops: {
          format: "dd/mm/yy",
                },
      },{
        title: "Shift",
        type: "select",
        name: "shift",
        contains: "Select",
        options: [
          { value: "Select", label: "Select" },
          { value: "Shift_1", label: "Shift 1" },
          { value: "Shift_2", label: "Shift 2" },
          { value: "Shift_3", label: "Shift 3" },
        ],
      },
      {
        title: "Product Name",
        type: "select",
        name: "productId",
        contains: "Select",
        options: products,
      },
    ],
  };

  function onSubmit(values) {
    values.random = Math.random();
    console.log(values);
    searchDetails(values);
  }

  return (
    <div className={classes.container}>
      <SearchCard
        title="Inspection Entry Search"
        buttonName="New Customer"
        onHeaderClick={showFormHandler({}, "customerForm",[0,10,2])}
        bottonShow={true}
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
