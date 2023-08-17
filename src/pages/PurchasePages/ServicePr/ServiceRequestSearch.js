import React, { useState, useEffect, useCallback } from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import SearchCard from "../../../UI/cards/SearchCard";
import Modal from "../../../UI/Modal/Modal";
import classes from "./orders.module.css";
import { data } from "./data";
import SimpleCard from "../../../UI/cards/SimpleCard";
import { Row, Col,Alert } from "react-bootstrap";
import PurchaseRequestTable from "./ServiceRequestTable";
import ServiceRequestForm from "./ServiceRequestForm";
import Table from "../../../Components/tables/Table";
import api from "../../../Api";
import useFetch, { Provider } from "use-http";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../store/modal-Slice";
import { alertActions } from "../../../store/alert-slice";
import ApprovalForm from './PoStatusForm/ApprovalForm'
import ViewApproved from './PoStatusForm/ViewApproved'
const rowWiseFields = 4;
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
      title: "Depatment",
      type: "select",
      name: "department",
      contains: "Select",
      options: [
        { value: "Select", label: "Select" },
        { value: "Administration", label: "Administration" },
        { value: "Production", label: "Production" },
        { value: "Quality", label: "Quality" },
        { value: "Stores", label: "Stores" },
      ],
    },
    {
      title: "PR Status",
      type: "select",
      name: "status",
      contains: "Select",
      options: [
        { value: "Select", label: "Select" },
        { value: "Requested", label: "Requested" },
        { value: "Approved", label: "Approved" },
        { value: "PO_Generated", label: "Po Generated" },
        { value: "Closed", label: "Closed" },
      ],
    }
  ],
};


function ServiceRequestSearch(props) {
  const [materialPRs, setMaterialPRs] = useState([]);
  const [requestNo, setRequestNo] = useState(0);
 
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const [loadState,setLoadState] =useState(Math.random());
  
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
  const loadInitialmaterialPRs = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const initialProds = await post(api + "/materialPr/serviceRequests",{"random":Math.random()});
    const reqNo = await post(api + "/materialPr/loadReqNo",{"random":Math.random()});
    const currentYear = new Date().getFullYear();
    if (response.ok) 
    setMaterialPRs(initialProds.length > 0 ? initialProds : []);
    setRequestNo(`SPR-${currentYear}-000${Number(reqNo)+1}`);
    }, [get, response,loadState]);

  useEffect(() => {
    loadInitialmaterialPRs();
  }, [loadInitialmaterialPRs]); // componentDidMount

  const saveDetails = async (pr) => {
    //  procMaps
    if(!pr.materialPrId){

    }
    const orderapi = pr.purchaseRequestId ? "/materialPr/update" : "/materialPr/create";
    console.log(orderapi);
    const returnObject = await post(api + orderapi, pr);
    console.log(returnObject);
    if (returnObject.retValues.status == 1) {
      if (pr.purchaseRequestId) {
        setMaterialPRs(
          materialPRs.map((odr) =>
            odr.purchaseRequestId === returnObject.retValues.materialPR.purchaseRequestId
              ? returnObject.retValues.materialPR
              : odr
          )
        );
        dispatch(modalActions.hideModalHandler());
        AlertHandler(returnObject.retValues.message, "success");
      } else if (returnObject.retValues.materialPR.purchaseRequestId > 0) {
        setMaterialPRs([returnObject.retValues.materialPR, ...materialPRs]);
        dispatch(modalActions.hideModalHandler());
        AlertHandler(returnObject.retValues.message, "success");
      }
    } else {
      dispatch(modalActions.hideModalHandler());
      AlertHandler(returnObject.retValues.message, "danger");
    }
  };

  const saveApproval = async (pr) => {
    //  procMaps
    const orderapi = "/materialPr/approval";
    const returnObject = await post(api + orderapi, pr);
    console.log(returnObject);
    if (returnObject.retValues.status == 1) {
      if (pr.materialPrId) {
        setMaterialPRs(
          materialPRs.map((odr) =>
            odr.materialPrId === returnObject.retValues.materialPR.materialPrId
              ? returnObject.retValues.materialPR
              : odr
          )
        );
        dispatch(modalActions.hideModalHandler());
        AlertHandler(returnObject.retValues.message, "success");
      } else if (returnObject.retValues.materialPR.materialPrId > 0) {
        setMaterialPRs([returnObject.retValues.materialPR, ...materialPRs]);
        dispatch(modalActions.hideModalHandler());
        AlertHandler(returnObject.retValues.message, "success");
      }
    } else {
      dispatch(modalActions.hideModalHandler());
      AlertHandler(returnObject.retValues.message, "danger");
    }
  };

  const actions = ["edit","productForm","approvalForm","viewApproved","materialForm"];

  const showFormHandler = (item, action) => () => {
    if (action == "productForm") {
         dispatch(
            modalActions.showModalHandler({
              selectedData: { ...item },
              selectedForm: (
                <ServiceRequestForm
                  onCancel={()=>dispatch(modalActions.hideModalHandler())}
                  selectedItem={selectedData}
                  saveFunction = {saveDetails}
                  reqNo = {requestNo}
                />
              ),
              showModal: true,
            })
          )
    }else if (action === "edit") {
        console.log({...item})
        dispatch(
          modalActions.showModalHandler({
            selectedData: { ...item },
            selectedForm: (
                <ServiceRequestForm
                  onCancel={()=>dispatch(modalActions.hideModalHandler())}
                  selectedItem={item}
                  saveFunction = {saveDetails}
                  reqNo = {requestNo}
                />
              ),
              showModal: true,
          })
        );
      }else  if (action == "approvalForm") {
        dispatch(
          modalActions.showModalHandler({
            selectedData: { ...item },
            selectedForm: (
              <>
                {(
                  <ApprovalForm
                    selected={item}
                    saveFunction={saveApproval}
                    onCancel = {() => dispatch(modalActions.hideModalHandler())}
                    loadState={loadState}
                  ></ApprovalForm>
                ) }
              </>
            ),
            showModal: true,
          })
        );
      }else  if (action == "viewApproved") {
        dispatch(
          modalActions.showModalHandler({
            selectedData: { ...item },
            selectedForm: (
              <>
                {(
                  <ViewApproved
                    selected={item}
                    saveFunction={saveApproval}
                    onCancel = {() => dispatch(modalActions.hideModalHandler())}
                    loadState={loadState}
                  ></ViewApproved>
                ) }
              </>
            ),
            showModal: true,
          })
        );
      }
  };

  function onSubmit(values) {
    console.log(values);
    values.random = Math.random()
    searchDetails(values)
  }

  const searchDetails = async (values) => {
    //  procMaps
    const orderapi =  "/materialPr/searchService";
    console.log(orderapi);
    const returnObject = await post(api + orderapi, values);
    console.log(returnObject);
    if(returnObject.length>0){
      setMaterialPRs(returnObject);
    }else{
      setMaterialPRs([])
    }
  }
    

  return (
    <div className={classes.container}>
      <SearchCard
        title="Service Purchase Request Search"
        buttonName="New Service PR"
        onHeaderClick={showFormHandler({}, "productForm", [0, 1, 2, 3, 4])}
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
            cols={PurchaseRequestTable(showFormHandler, actions)}
            data={materialPRs}
            rows={10}
            striped
          />
        
      </SimpleCard>
    </div>
  );
}

export default ServiceRequestSearch;


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
