import React, { useState, useEffect, useCallback, useReducer } from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import SearchCard from "../../../UI/cards/SearchCard";
import Modal from "../../../UI/Modal/Modal";
import OrderEntry from "./PlanAndExecution";
import OrderTable from "./PlanTable";
import classes from "./orders.module.css";
import { data } from "./data";
import Table from "../../../Components/tables/Table";
import SimpleCard from "../../../UI/cards/SimpleCard";
import { Row, Col,Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../store/modal-Slice";
import { alertActions } from "../../../store/alert-slice";
import { Fa500Px } from "react-icons/fa";
import useFetch, { Provider } from "use-http";
import api from "../../../Api";
import { render } from "@testing-library/react";
import { loadStateActions } from "../../../store/loadState-Slice";
import { orderEntryActions } from "../../../store/loadStates/orderEntry-slice";
import PlanAndExecution from "./PlanAndExecution";
import PlanSchedule from "./PlanShift/PlanSchedule";
import ProductionEntry from "./ProductionEntry/PlanAndExecution"
import RawMaterial from "./RawMaterial/RawMaterial";
import MeltingForm from "./DailyEntry/MeltingForm";

//making sure the content reloads from db

const rowWiseFields = 4;

const actions = [
  "orderForm",
  "monthlyPlan",
  "dailyPlan",
  "jobOrder",
  "processView",
  "dispatch",
  "approval",
];
function PlanSearch(props) {
  const { get, post, response, loading, error } = useFetch({ data: [] });
  let [intialPlans,setInitialPlans]=useState([])
  const [orders, setOrders] = useState([]);
  const[products,setProducts]= useState([{value:"",label:"Select"}])
  const[customers,setCustomers]= useState([{value:"",label:"Select"}])
  const[process,setProcess] = useState([{value:"",label:"Select"}])
  
  const loadInitialData = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const plans = await post(api + "/dailyPlan/listplans", {"id":1,"loadState":Date().toString()});
    const loadedprods = await get(api + "/product/loadOptions");
    const loadedprocess = await get(api + "/process/loadOptions");
    const loadedcusts = await get(api+"/customer/loadOptions");
   
    if (response.ok) {
      setInitialPlans(plans);
    setProducts([...products,...loadedprods]);
    setProcess([...process,...loadedprocess])
    setCustomers([...customers,...loadedcusts])
  }
    //  console.log(initialCusts)
  }, [get, response]);

  useEffect(() => {
    loadInitialData();
  }, []); // componentDidMount
  const loadStateOrder = useSelector((state) => state.orderEntryProps);
  const handleLoadChange = (action) => {
    
    // dispatch(orderEntryActions.);
    console.log(loadStateOrder.approval);
  };
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
      },
      {
        title: "Customer Name",
        type: "select",
        name: "customerId",
        contains: "Select",
        options: customers,
       },
      {
        title: "Product Name",
        type: "select",
        name: "productId",
        contains: "Select",
        options: products
      },{
        title: "Department",
        type: "select",
        name: "proSubCat",
        contains: "Select",
        options: [
          { value: "0", label: "Select" },
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
        options: process,
      },
    ],
  };
  const AlertHandler = (alertContent, alertType) => {
    dispatch(
      alertActions.showAlertHandler({
        showAlert: !showAlert,
        alertMessage: alertContent,
        alertVariant: alertType,
      })
    );
  };
  const loadProducts = useCallback(async(customerId)=>{
    const loadedprods = await post(api + "/product/loadProductsByCustomer" , {"id":customerId});
   // setProds([...prods, ...loadedprods]);
   setProducts([...[{value:"",label:"Select"}],...loadedprods])
  }, [post, response]);


  const saveDetails = async (order) => {
    //  procMaps
    const orderapi = order.orderId ? "/plan/update" : "/plan/create";
    console.log(orderapi);
    const returnObject = await post(api + orderapi, order);
    console.log(returnObject);
    if (returnObject.retValues.status == 1) {
      if (order.orderId) {
        setOrders(
          orders.map((odr) =>
            odr.orderId === returnObject.retValues.order.orderId
              ? returnObject.retValues.order
              : odr
          )
        );
        dispatch(modalActions.hideModalHandler());
        AlertHandler(returnObject.retValues.message, "success");
      } else if (returnObject.retValues.order.orderId > 0) {
        setOrders([returnObject.retValues.order, ...orders]);
        dispatch(modalActions.hideModalHandler());
        AlertHandler(returnObject.retValues.message, "success");
      }
    } else {
      dispatch(modalActions.hideModalHandler());
      AlertHandler(returnObject.retValues.message, "danger");
    }
  };

  function validate(watchValues, errorMethods) {
    let { errors, setError, clearErrors } = errorMethods;
  
     // Firstname validation
     if(watchValues[0] != ""){
        loadProducts(watchValues[0]);
    }
  }

  const showFormHandler = (item, action) => () => {
    if (action === "orderForm") {
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <PlanAndExecution
              onCancel={() => dispatch(modalActions.hideModalHandler())}
              selectedItem={{ ...item }}
              saveFunction={saveDetails}
              loadState={loadStateOrder.orderSearch}
              loadStateContoller={handleLoadChange}
            />
          ),
          showModal: true,
        })
      );
    } else if (action === "edit") {
     console.log({...item})
     dispatch(
       modalActions.showModalHandler({
         selectedData: { ...item },
         selectedForm: (
          <></>
             
           ),
           showModal: true,
       })
     );
   }else if (action === "productionEntry") {
     console.log({...item})
     dispatch(
       modalActions.showModalHandler({
         selectedData: {productId:item.productId},
         selectedForm: (
          <ProductionEntry
          onCancel={() => dispatch(modalActions.hideModalHandler())}
          selectedItem={{ ...item }}
          saveFunction={saveDetails}
          loadState={loadStateOrder.orderSearch}
          loadStateContoller={handleLoadChange}></ProductionEntry >
             
           ),
           showModal: true,
       })
     );
   }else if (action == "rmRequest") {
    // alert(JSON.stringify({...item}));
    //setShowformparams({...showFormParams,showFormParams.selectedItem:item})

    dispatch(
      modalActions.showModalHandler({
        selectedData: { ...item },
        selectedForm: (
          <RawMaterial
            onCancel={() => dispatch(modalActions.hideModalHandler())}
            selectedItem={{ ...item }}
            saveFunction={saveDetails}
            loadStateContoller={handleLoadChange}
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
    const orderapi =  "/dailyPlan/search";
    console.log(orderapi);
    const returnObject = await post(api + orderapi, values);
    console.log(returnObject);

    setInitialPlans(returnObject);
   
  };

  return (
    <div className={classes.container}>
      <SearchCard
        title="Plan Search"
        buttonName="Add Plan"
        onHeaderClick={showFormHandler({}, "orderForm", [0, 1, 2, 3, 4])}
        bottonShow={showModal}
      >
        <CreateForm
          template={template}
          watchFields={["customerId"]}     
          rowwise={rowWiseFields}
          validate={validate}
          onSubmit={onSubmit}
          onCancel={props.onCancel}
          buttonName="Search"
        ></CreateForm>
      </SearchCard>
      <SimpleCard md={12}>
      <Row>
        <Button
            className={classes.btn}
            onClick={showFormHandler(
              {},
              "productionEntry"
            )}
          >
            Production Entry
          </Button>
          <Button
            className={classes.btn}
            onClick={showFormHandler({}, "rmRequest")}
          >
            Add Materials Request
          </Button>
        </Row>
        {<Table
          cols={OrderTable(showFormHandler, actions)}
          data={intialPlans}
          rows={10}
        />}
      </SimpleCard>
    </div>
  );
}

export default PlanSearch;



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
