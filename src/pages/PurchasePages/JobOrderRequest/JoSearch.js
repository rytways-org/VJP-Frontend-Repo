import React, { useState, useReducer, useCallback, useEffect } from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import SearchCard from "../../../UI/cards/SearchCard";
import Modal from "../../../UI/Modal/Modal";
import classes from "./productionentry.module.css";
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
const template = {
  fields: [
    {
      title: "Date",
      type: "date",
      name: "tensile",
      contains: "date",
      inpprops: {
        format: "dd/mm/yyyy",
      },
    },
    {
      title: "Name of Customer",
      type: "text",
      name: "MechanicalProperties",
      contains: "text",
      validationProps: "Customer Name is required",
      inpprops: {
        minlength: 0,
        maxlength: 30,
      },
    },
    {
      title: "Product Name",
      type: "select",
      name: "InwardType",
      contains: "Select",
      options: [
        { value: "", label: "Select" },
        { value: 1, label: "Nozzles-123" },
        { value: 0, label: "Propellor-123" },
      ],
    },
    {
      title: "Vendor Name",
      type: "select",
      name: "InwardType",
      contains: "Select",
      options: [
        { value: "", label: "Select" },
        { value: 1, label: "Vinayaga Welding" },
        { value: 0, label: "Sri Krishna Cutting" },
      ],
    },
  ],
};

function JoSearch(props) {
  const dispatch = useDispatch();
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
        props.loadStateController()
      } else if (returnObject.retValues.order.joId > 0) {
        setOldEntry([...returnObject.retValues.order,...oldEntry]);
        AlertHandler(returnObject.retValues.message, "success");
        setLoadState(Math.random())
        props.loadStateController()
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
    if (response.ok) setOldEntry(intialdata);
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

  return (
    <div className={classes.container}>
      
      <SearchCard
        title="Job Order Search"
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
          data={data}
          rows = {10}
        />
      </SimpleCard>
    </div>
  );
}

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

export default JoSearch;
