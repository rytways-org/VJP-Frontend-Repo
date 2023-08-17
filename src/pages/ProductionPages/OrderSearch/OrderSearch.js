import React, { useState, useEffect, useCallback, useReducer } from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import SearchCard from "../../../UI/cards/SearchCard";
import Modal from "../../../UI/Modal/Modal";
import OrderEntry from "./OrderEntry";
import OrderTable from "./OrderTable";
import classes from "./orders.module.css";
import { data } from "./data";
import Table from "../../../Components/tables/Table";
import SimpleCard from "../../../UI/cards/SimpleCard";
import MonthlyPlan from "./MonthlyPlan/MonthlyPlan";
import DailyPlan from "./DailyPlan/DailyPlan";
import JobOrder from "./JobOrderRequest/JobOrder";
import ProcessView from "./ProcessView/ProcessView";
import Dispatch from "./Dispatch/Dispatch";
import { Row, Col } from "react-bootstrap";
import ProductionApp from "./ProductionApproval/ProductionApp";
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
import NewProcessView from "./ProcessView/NewProcessView";
import { filterData } from "../../../NewComponent/dataUtils";
//making sure the content reloads from db


const styles = {
  seach: {
    
    padding: "0 3rem", // Add the padding property here
  },
};

       

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
function OrderSearch(props) {
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const [orders, setOrders] = useState([]);
  const [products,setProducts] = useState([{value:"",label:"Select"}]);
  const [customers,setCustomers] = useState([{value:"",label:"Select"}]);

  const loadStateReducer = (action) => {
    if (action.type === "orderSearch") {
      dispatch( orderEntryActions.alterOrderSearchlHandler());
    } else if (action.type === "orderEntry") {
      dispatch(orderEntryActions.alterOrderEntrylHandler());
    } else if (action.type === "monthlyPlan") {
      dispatch(orderEntryActions.alterMonthlyPlanHandler());
    } else if (action.type === "dailyPlan") {
      dispatch( orderEntryActions.alterDailyPlanHandler());
    } else if (action.type === "jobOrder") {
      dispatch(orderEntryActions.alterJobOrderHandler());
    } else if (action.type === "processView") {
      dispatch(orderEntryActions.alterProcessViewHandler());
    } else if (action.type === "approval") {
      dispatch(orderEntryActions.alterApprovalHandler());
    }
  };
  const loadStateOrder = useSelector((state) => state.orderEntryProps);
  const handleLoadChange = (action) => {
    loadStateReducer(action);
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

  const loadInitialData = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const initialOrders = await post(api + "/order/orders" ,{"id":0,"loadTime":Date().toLocaleString()});
    const loadedcusts = await get(api+"/customer/loadOptions");
    const loadedprods = await get(api + "/product/loadOptions");


    console.log(Date().toLocaleString())
    if (response.ok) {
      setOrders(initialOrders);
      setCustomers([...customers,...loadedcusts])
      setProducts([...products,...loadedprods])
    }
    
    //  console.log(initialCusts)
  }, [get, response]);

  useEffect(() => {
       loadInitialData();
    
  }, [loadStateOrder.orderSearch]); // componentDidMount

  const AlertHandler = (alertContent, alertType) => {
    dispatch(
      alertActions.showAlertHandler({
        showAlert: !showAlert,
        alertMessage: alertContent,
        alertVariant: alertType,
      })
    );
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
        options: products,
      },
      {
        title: "Order No",
        type: "text",
        name: "orderNo",
        contains: "text",
       inpprops:{}
      }
    ],
  };

  function onSubmit(values) {
    values.random = Math.random();
    console.log(values);
    searchDetails(values);
  }

  const searchDetails = async (values) => {
    //  procMaps
    const orderapi =  "/order/searchOrders";
    console.log(orderapi);
    const returnObject = await post(api + orderapi, values);
    console.log(returnObject);
    if(returnObject.length>0){
      setOrders(returnObject);
    }else{
      setOrders([])
    }
    
   
  };

  const loadProducts = useCallback(async(customerId)=>{
    const loadedprods = await post(api + "/product/loadProductsByCustomer" , {"id":customerId});
   // setProds([...prods, ...loadedprods]);
   setProducts([...[{value:"",label:"Select"}],...loadedprods])
  }, [post, response]);

  const saveDetails = async (order) => {
    //  procMaps
    const orderapi = order.orderId ? "/order/update" : "/order/create";
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

  const showFormHandler = (item, action) => () => {
    if (action === "orderForm") {
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <OrderEntry
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
    } else if (action == "monthlyPlan") {
      // alert(JSON.stringify({...item}));
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          showModal: true,
          selectedForm: (
            <MonthlyPlan
              onCancel={() => dispatch(modalActions.hideModalHandler())}
              selectedItem={item}
              loadState={loadStateOrder.monthlyPlan}
              loadStateContoller={handleLoadChange}
            />
          ),
        })
      );
    } else if (action == "dailyPlan") {
      // alert(JSON.stringify({...item}));
      //setShowformparams({...showFormParams,showFormParams.selectedItem:item})
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <DailyPlan
              onCancel={() => dispatch(modalActions.hideModalHandler())}
              selectedItem={item}
              loadState={loadStateOrder.dailyPlan}
              loadStateContoller={handleLoadChange}
            />
          ),
          showModal: true,
        })
      );
    }  else if (action == "dispatch") {
      // alert(JSON.stringify({...item}));

      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <Dispatch
              onCancel={() => dispatch(modalActions.hideModalHandler())}
              selectedItem={{ ...item }}
              saveFunction={saveDetails}
              loadStateController={handleLoadChange}
            />
          ),
          showModal: true,
        })
      );
    }else if (action == "jobOrder") {
      // alert(JSON.stringify({...item}));
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <JobOrder
              onCancel={() => dispatch(modalActions.hideModalHandler())}
              selectedItem={item}
              loadState={loadStateOrder.jobOrder}
              loadStateContoller={handleLoadChange}
            />
          ),
          showModal: true,
        })
      );
    } else if (action == "processView") {
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <NewProcessView
              onCancel={() => dispatch(modalActions.hideModalHandler())}
              selectedItem={item}
              loadState={loadStateOrder.processView}
              loadStateContoller={handleLoadChange}
            />
          ),
          showModal: true,
        })
      );
    } else if (action == "approval") {
      // alert(JSON.stringify({...item}));
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <ProductionApp
              onCancel={() => dispatch(modalActions.hideModalHandler())}
              selectedItem={item}
              loadState={loadStateOrder.approval}
              loadStateContoller={handleLoadChange}
            />
          ),
          showModal: true,
        })
      );
    }
  };


  function validate(watchValues, errorMethods) {
    let { errors, setError, clearErrors } = errorMethods;
  //[2,5]
     // Firstname validation
     if(watchValues[0] != ""){
        loadProducts(watchValues[0]);
    }
  }

  // New Codes 

  const [searchQuery, setSearchQuery] = useState("");

  // Update the search query state based on user input
  const handleSearchInputChange = (query) => {
    setSearchQuery(query);
  };

  //  Define the fields to filter (based on  table data structure)
  const filterFields = [
    "product.customer.name", 
    "product.productName", 
    "orderNo",
  ];

  //  filterData function to filter the orders
  const filteredOrders = filterData(orders, searchQuery, filterFields);

  return (
    <div className={classes.container}>
      <SearchCard
        title="Order Search"
        buttonName="New Order"
        onHeaderClick={showFormHandler({}, "orderForm")}
        bottonShow={showModal}
      
      >
        <CreateForm
          template={template}
          watchFields={["customerId"]}     
          rowwise={4}
          validate={validate}
          onSubmit={onSubmit}
          onCancel={props.onCancel}
          buttonName="Search"
          styles={styles}
        ></CreateForm>
      </SearchCard>
      <SimpleCard md={12}>
        {<Table
          cols={OrderTable(showFormHandler, actions)}
          data={filteredOrders} 
          rows={10}
          value={searchQuery}
          onChange={handleSearchInputChange}
        />}
      </SimpleCard>
    </div>
  );
}

export default OrderSearch;




