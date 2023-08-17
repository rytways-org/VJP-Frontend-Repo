import React, { useState, useEffect, useCallback } from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import SearchCard from "../../../UI/cards/SearchCard";
import Modal from "../../../UI/Modal/Modal";
import classes from "./orders.module.css";
import { data } from "./data";
import SimpleCard from "../../../UI/cards/SimpleCard";
import { Row, Col, Alert } from "react-bootstrap";
import PurchaseRequestTable from "./PurchaseRequestTable";
import PurchaseRequestForm from "./PurchaseRequestForm";
import Table from "../../../Components/tables/Table";
import api from "../../../Api";
import useFetch, { Provider } from "use-http";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../store/modal-Slice";
import { alertActions } from "../../../store/alert-slice";
import ApprovalForm from "./PoStatusForm/ApprovalForm";
import { Button } from "react-bootstrap";
import PoEntry from "./GeneratePo/PoEntry";
import ServicePoEntry from '../PoSearch/ServicePo/ServicePoEntry'


const styles = {
  upper: {
    
    padding: "0", // Add the padding property here
  },
  upperRow: {
    margin: '.5rem 1rem 0 1rem',
    padding: '0 1rem 0 1rem',
    backgroundColor: 'darkgrey',
    borderRadius:'1rem'
  }
};
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
      validationProps: "Please select Shift",
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
      title: "Request Type",
      type: "select",
      name: "requestType",
      contains: "Select",
      options: [
        { value: "Select", label: "Select" },
        { value: "Raw_Materials", label: "Materials" },
        { value: "Service", label: "Service" },
        
      ],
    }
  ],
};


function PurchaseRequestSearch(props) {
  const [requests, setRequests] = useState([]);
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const [selectedItems, setSelecetedItems] = useState([]);
  const [loadState, setLoadState] = useState(Math.random());
  const [selectedChecks, setSelectedChecks] = useState(0);
  const [suppliers,setSuppliers]=useState([{ value: "", label: "Select" }])
  const [multipleReqs,setMultipleReqs] = useState([])
  const [requestNo, setRequestNo] = useState(0);
  const [company,setCompany] = useState([{ value: "", label: "Select" }])
  const [poType,setPoType]=useState("PO")
  
  const onSelectCheckBox = () => {
    setSelectedChecks(selectedChecks + 1);
  };

  const onCheckBoxEvent = (item, target) => {
    if (target) {
     const alreadyAvail = selectedItems.find(
      old => {
        return old.material.materialId === item.material.materialId && old.material.materialId != 1487
      }
      )
      if (alreadyAvail?.purchaseRequestId) {
        alreadyAvail.requestQty=[...alreadyAvail.requestQty,item.materialQty]
        alreadyAvail.requests = Number(alreadyAvail.requests) + 1;
        alreadyAvail.requestItems = [
          ...alreadyAvail.requestItems,
          Number(item.materialRequestId),
        ];
        if(alreadyAvail.expectedDate > item.expectedDate){
          alreadyAvail.dueDate = item.expectedDate
        }
        alreadyAvail.poQty = alreadyAvail.materialQty+item.materialQty
        alreadyAvail.amount =0;
        alreadyAvail.gstAmt =0;
        setSelecetedItems(
          selectedItems.map((odr) =>
            odr.purchaseRequestId === alreadyAvail.purchaseRequestId
              ? alreadyAvail
              : odr
          )
        );
        alreadyAvail = {};
      } else {
        if(item.purchaseRequest.requestType=="Service"){
          setPoType("Service_Purchase_Order")
          item.amount = item.material.lastPurchasePrice * item.materialQty;
          item.gstAmt = (
            0 *
            item.poQty *
            0.01 *
            item.material.gst
          ).toFixed(2);
          item.itemName = item.specification
        }else{
          item.amount = item.material.lastPurchasePrice * item.materialQty;
          item.gstAmt = (
            item.material.lastPurchasePrice *
            item.poQty *
            0.01 *
            item.material.gst
          ).toFixed(2);
          item.itemName = item.material.materialName
        }
        item.poQty = item.materialQty - item.poQty
        item.status="Awaiting_Approval"
        item.specs = item.specification
        item.requestQty=[item.materialQty]
        item.gst = item.material.gst;
        item.uom = item.material.uom
        item.requests = 1;
        item.isRequest='Yes'
        item.requestItems = [Number(item.materialRequestId)];
        item.dueDate = item.expectedDate
        item.unitPrice = item.material.lastPurchasePrice;
        item.specs= ""  
        setSelecetedItems((prevState) => [...prevState, item]);
        console.log(selectedItems);
      }
    } else {
      setSelecetedItems(
        selectedItems.filter(function (obj) {
          return obj.materialRequestId !== item.materialRequestId;
        })
      );
      console.log(selectedItems);
    }
  };

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
  const loadInitialRequests = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const loadedsuppliers = await get(api + "/supplier/loadOptions");
    const reqNo = await post(api + "/poMaster/loadReqNo",{"random":Math.random()});
    const loadedCompany =await get(api + "/company/loadOptions")
    const currentYear = new Date().getFullYear()-2000;
    const currentMonth = new Date().getMonth()+1; 
    const initialProds = await post(api + "/matrialPrItems/prItemsForPo", {
      id: 1,
      random: Math.random(),
    });
    if (response.ok) 
    setRequests(initialProds)
    setSuppliers([...suppliers, ...loadedsuppliers]);
    setCompany([...company,...loadedCompany])
     
    if(currentMonth>4){
      setRequestNo(`${currentYear}/${currentYear+1}-000${Number(reqNo)+1}`);
    }else{
      setRequestNo(`${currentYear-1}/${currentYear}-000${Number(reqNo)+1}`);
    }
  }, [get, response, loadState]);

  useEffect(() => {
    loadInitialRequests();
  }, [loadInitialRequests]); // componentDidMount

  const requestsave = async (values) => {
    const newPo = await post(poType == "PO" ? api + "/poMaster/create" : api + "/poMaster/createServicePo", values);
    if (response.ok) {
      if (values.poId) {
        loadInitialRequests();
        dispatch(modalActions.hideModalHandler());
        AlertHandler("Product Updated Successfully", "success");
      } else {
       // setRequests([...requests, newProduct]);
       loadInitialRequests();
        dispatch(modalActions.hideModalHandler());
        AlertHandler("Purchase Order Created Succesfully", "success");
      }
    } else {
      dispatch(modalActions.hideModalHandler());
      AlertHandler("Product Details Failed To Save", "danger");
    }
  };
  const actions = ["edit", "productForm", "approvalForm", "materialForm"];

  const updateItems = (item, action) => {
    if (action == "update") {
      console.log("updated from selected");
      setSelecetedItems(
        selectedItems.map((matReq) =>
          matReq.purchaseRequestId === item.purchaseRequestId ? item : matReq
        )
      );
    } else {
    }
  };

  

  const showFormHandler = (item, action) => () => {
    if (action == "productForm") {
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <PurchaseRequestForm
              onCancel={() => dispatch(modalActions.hideModalHandler())}
              selectedItem={selectedData}
              saveFunction={requestsave}
            />
          ),
          showModal: true,
        })
      );
    } else if (action === "edit") {
      console.log({ ...item });
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <PurchaseRequestForm
              onCancel={() => dispatch(modalActions.hideModalHandler())}
              selectedItem={item}
              saveFunction={requestsave}
            />
          ),
          showModal: true,
        })
      );
    } else if (action == "approvalForm") {
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <>
              {
                <ApprovalForm
                  selected={item}
                  saveFunction={requestsave}
                  onCancel={() => dispatch(modalActions.hideModalHandler())}
                  loadState={loadState}
                ></ApprovalForm>
              }
            </>
          ),
          showModal: true,
        })
      );
    } else if (action == "generatePo") {
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <>
              {poType == "PO" ?
                <PoEntry
                  suppliers = {suppliers}
                  company = {company}
                  selectedItems={selectedItems}
                  saveFunction={requestsave}
                  updateItems={updateItems} 
                  onCancel={() => dispatch(modalActions.hideModalHandler())}
                  loadState={loadState}
                  reqNo = {requestNo}
                ></PoEntry> :
                <ServicePoEntry
                  suppliers = {suppliers}
                  company = {company}
                  selectedItems={selectedItems}
                  saveFunction={requestsave}
                  updateItems={updateItems} 
                  onCancel={() => dispatch(modalActions.hideModalHandler())}
                  loadState={loadState}
                  reqNo = {requestNo}
                ></ServicePoEntry>

              }
            </>
          ),
          showModal: true,
        })
      );
    }
  };


  const searchDetails = async (values) => {
    //  procMaps
    const orderapi =  "/matrialPrItems/searchPrItems";
    console.log(orderapi);
    const returnObject = await post(api + orderapi, values);
    console.log(returnObject);
    if(returnObject.length>0){
      setRequests(returnObject);
    }else{
      setRequests([])
    }   
  };

  function onSubmit(values) {
    console.log(values);
    values.random = Math.random();
    searchDetails(values);
  }

  return (
    <div className={classes.container}>
      <SearchCard
        title="Purchase Request Search"
        onHeaderClick={showFormHandler({}, "productForm", [0, 1, 2, 3, 4])}
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
        <Row>
          <Col md={3}>
            <Button
              className={classes.btn}
              onClick={showFormHandler({}, "generatePo")}
            >
              Generate PO
            </Button>
          </Col>
        </Row>

        <Table
          cols={PurchaseRequestTable(showFormHandler, actions)}
          data={requests}
          includeCheck={1}
          rows={10}
          striped
          checkBoxEvent={onCheckBoxEvent}
        />
      </SimpleCard>
    </div>
  );
}

export default PurchaseRequestSearch;



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
