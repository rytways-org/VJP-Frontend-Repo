import React, { useState, useReducer, useCallback, useEffect } from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import SearchCard from "../../../UI/cards/SearchCard";
import Modal from "../../../UI/Modal/Modal";
import classes from "../ProductionEntry/productionentry.module.css";
import { data } from "./Jodata";
import Table from "../../../Components/tables/Table";
import SimpleCard from "../../../UI/cards/SimpleCard";
import JoTable from "./JoTable";
import ApprovalForm from "./JoStatusForms/ApprovalForm";
import PoGenerateForm from "./JoStatusForms/PoGenerateForm";
import OutwardForm from "./OutwardForm/OutwardForm";
import ReturnForm from "./ReturnForm/ReturnForm";
import InspectionForm from "./InspectionForm";
import ReworkForm from "./ReworkForm/ReworkForm";
import api from "../../../Api";
import { useSelector, useDispatch } from "react-redux";
import useFetch, { Provider } from "use-http";
import { alertActions } from "../../../store/alert-slice";
import { modalActions } from "../../../store/modal-Slice";

const rowWiseFields = 4;


function JoSearch(props) {
  const dispatch = useDispatch();
  const [products,setProducts] = useState([{value:"Select",label:"Select"}]);
  const [customers,setCustomers] = useState([{value:"Select",label:"Select"}]);
  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);
  const { get, post, response, loading, error } = useFetch({ data: [] });
  let [oldEntry, setOldEntry] = useState([]);
  const [loadState, setLoadState] = useState(Math.random());
  const handleLoadChange = (action) => {
    setLoadState(Math.random());
    // dispatch(orderEntryActions.);
  };

  
  const saveDetails = async (entry) => {
    //  procMaps
    const prodEntryapi = entry.joId ? "/jorder/update" : "/jorder/create";
    console.log(prodEntryapi);
    const returnObject = await post(api + prodEntryapi, entry);
    console.log(returnObject);
    if (returnObject.retValues.status == 1) {
      if (entry.joId) {
        setOldEntry(
          oldEntry.map((odr) =>
            odr.joId === returnObject.retValues.order.joId
              ? returnObject.retValues.order
              : odr
          )
        );
        dispatch(modalActions.hideModalHandler());
        AlertHandler(returnObject.retValues.message, "success");
        setLoadState(Math.random())
        handleLoadChange()
      } else if (returnObject.retValues.order.joId > 0) {
        setOldEntry([...returnObject.retValues.order,...oldEntry]);
        AlertHandler(returnObject.retValues.message, "success");
        setLoadState(Math.random())
        handleLoadChange()
      }
    } else {
      AlertHandler(returnObject.retValues.message, "danger");
      loadInitialData();
    }
  };
  const loadInitialData = useCallback(async () => {
    const intialdata = await post(api + "/jorder/listJorders", {
      loadStateid: Date().toString(),
    });
    const loadedcusts = await get(api+"/supplier/loadOptions");
    const loadedprods = await get(api + "/product/loadOptions");
    if (response.ok) setOldEntry(intialdata);
    setProducts([...[{value:"",label:"Select"}],...loadedprods])
    setCustomers([...[{value:"",label:"Select"}],...loadedcusts])
  }, [post, response,loadState]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]); // componentDidMount

  const AlertHandler = (alertContent, alertType) => {
    dispatch(
      alertActions.showAlertHandler({
        showAlert: !showAlert,
        alertMessage: alertContent,
        alertVariant: alertType,
      })
    );
  };

  const [appForm, setAppForm] = useState(<></>);

 const actions = [
    "approvalForm",
    "outwardForm",
    "returnForm",
    "inspectionForm","reworkForm"
  ];

  const showFormHandler = (item, action) => () => {
    if (action == "approvalForm") {
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <>
              {`${item["joStatus"]}` == "Awaiting_Approval" ? (
                <ApprovalForm
                  selected={item}
                  saveFunction={saveDetails}
                  changeLoadState={handleLoadChange}
                  onCancel = {() => dispatch(modalActions.hideModalHandler())}
                  loadState={loadState}
                  loadStateContoller={handleLoadChange}
                ></ApprovalForm>
              ) : (
                <PoGenerateForm
                  selected={item}
                  saveFunction={saveDetails}
                  changeLoadState={handleLoadChange}
                  onCancel = {() => dispatch(modalActions.hideModalHandler())}
                  loadState={loadState}
                  loadStateContoller={handleLoadChange}
                ></PoGenerateForm>
              )}
            </>
          ),
          showModal: true,
        })
      );
    } else if (action == "outwardForm") {
      // alert(JSON.stringify({...item}));
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          showModal: true,
          selectedForm: (
            <OutwardForm
            onCancel={() => dispatch(modalActions.hideModalHandler())}
            selected={item}
            saveFunction={saveDetails}
            changeLoadState={handleLoadChange}
            loadState={loadState}
            loadStateContoller={handleLoadChange}
          ></OutwardForm>
          ),
        })
      );
    } else if (action == "returnForm") {
      // alert(JSON.stringify({...item}));
      //setShowformparams({...showFormParams,showFormParams.selectedItem:item})
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <ReturnForm
            onCancel={() => dispatch(modalActions.hideModalHandler())}
            selected={item}
            saveFunction={saveDetails}
            changeLoadState={handleLoadChange}
            loadState={loadState}
            loadStateContoller={handleLoadChange}
          ></ReturnForm>
          ),
          showModal: true,
        })
      );
    } else if (action == "inspectionForm") {
      // alert(JSON.stringify({...item}));
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <InspectionForm
            onCancel={() => dispatch(modalActions.hideModalHandler())}
            selected={item}
            saveFunction={saveDetails}
            changeLoadState={handleLoadChange}
            loadState={loadState}
            loadStateContoller={handleLoadChange}
          ></InspectionForm>
          ),
          showModal: true,
        })
      );
    }  else if (action == "reworkForm") {
      // alert(JSON.stringify({...item}));
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <ReworkForm
            onCancel={() => dispatch(modalActions.hideModalHandler())}
            selected={item}
            saveFunction={saveDetails}
            changeLoadState={handleLoadChange}
            loadState={loadState}
            loadStateContoller={handleLoadChange}
          ></ReworkForm>
          ),
          showModal: true,
        })
      );
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
      },
      {
        title: "Product Name",
        type: "select",
        name: "productId",
        contains: "Select",
        options: products,
      },
      {
        title: "Supplier Name",
        type: "select",
        name: "supplierId",
        contains: "Select",
        options:customers,
      }
    ],
  };

  const searchDetails = async (values) => {
    //  procMaps
    const orderapi =  "/order/searchOrders";
    console.log(orderapi);
    const returnObject = await post(api + orderapi, values);
    console.log(returnObject);
    if(returnObject.length>0){
      setOldEntry(returnObject);
    }else{
      setOldEntry([])
    }
    
   
  };

  function onSubmit(values) {
    values.random = Math.random();
    console.log(values);
    searchDetails(values);
  }

  return (
    <div className={classes.container}>
      
      <SearchCard
        title="Jo Search"
        buttonName=""
        onHeaderClick={showFormHandler({}, "orderForm")}
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
          cols={JoTable(showFormHandler, actions)}
          data={oldEntry}
          rows = {10}
        />
      </SimpleCard>
    </div>
  );
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

export default JoSearch;
