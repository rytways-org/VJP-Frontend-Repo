import React, { useState, useEffect, useCallback, useReducer } from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import SearchCard from "../../../UI/cards/SearchCard";
import Modal from "../../../UI/Modal/Modal";
import OrderTable from "./PoTable";
import classes from "./orders.module.css";
import { data } from "./data";
import Table from "../../../Components/tables/Table";
import SimpleCard from "../../../UI/cards/SimpleCard";
import { Row, Col } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../store/modal-Slice";
import { alertActions } from "../../../store/alert-slice";
import { Fa500Px } from "react-icons/fa";
import useFetch, { Provider } from "use-http";
import api,{downloadLink} from "../../../Api";
import { render } from "@testing-library/react";
import { loadStateActions } from "../../../store/loadState-Slice";
import { orderEntryActions } from "../../../store/loadStates/orderEntry-slice";
import PoApprovalForm from "./PoApproval/POApprovalForm";
import GrnEntry from "./GrnEntry/GrnEntry"
import ViewQuotes from "./ViewQuotes/ViewQuotes";
import PDFView from "./ViewPo/PDFView"
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Link } from 'react-router-dom'
import PoEntry from "./GeneratePo/PoEntry";
import { usePost } from 'use-http';
import { saveAs } from 'file-saver';
import { useNavigate } from "react-router-dom";
import SelectPo from './SelectPoType/SelectPo'
import ServicePoEntry from "./ServicePo/ServicePoEntry";

//making sure the content reloads from db

const rowWiseFields = 4;

const actions = [
  "poForm",
  "grnEntry",
  "poApproval","viewQuotes"
];
function POSearch(props) {
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const [po, setPo] = useState([]);
  const [selectedItems, setSelecetedItems] = useState([]);
  const [loadState, setLoadState] = useState(Math.random());
  const [selectedChecks, setSelectedChecks] = useState(0);
  const [suppliers,setSuppliers]=useState([{ value: "", label: "Select" }])
  const [requestNo, setRequestNo] = useState(0);
  const [company,setCompany] = useState([{ value: "", label: "Select" }])
  const [poType,setPoType] = useState()
   
  
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


  
  const requestsave = async (values) => {
    const newPo = await post(api + "/poMaster/create", values);
    if (response.ok) {
      if (values.poId) {
        dispatch(modalActions.hideModalHandler());
        AlertHandler("Product Updated Successfully", "success");
      } else {
       // setRequests([...requests, newProduct]);
        dispatch(modalActions.hideModalHandler());
        AlertHandler("Purchase Order Created Succesfully", "success");
      }
    } else {
      dispatch(modalActions.hideModalHandler());
      AlertHandler("Product Details Failed To Save", "danger");
    }
  };

  const requestServicesave = async (values) => {
    const newPo = await post(api + "/poMaster/createServicePo", values);
    if (response.ok) {
      if (values.poId) {
        dispatch(modalActions.hideModalHandler());
        AlertHandler("Service Purchase Order Updated Successfully", "success");
      } else {
       // setRequests([...requests, newProduct]);
        dispatch(modalActions.hideModalHandler());
        AlertHandler("Purchase Order Created Succesfully", "success");
      }
    } else {
      dispatch(modalActions.hideModalHandler());
      AlertHandler("Product Details Failed To Save", "danger");
    }
  };
  
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

  const loadInitialData = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const initialOrders = await post(api + "/poMaster/listAll" ,{"id":Math.random(),"loadTime":Date().toLocaleString()});
    const loadedsuppliers = await get(api + "/supplier/loadOptions");
    const loadedCompany =await get(api + "/company/loadOptions")
    console.log(loadedCompany)
    const reqNo = await post(api + "/poMaster/loadReqNo",{"random":Math.random()});
    const currentYear = new Date().getFullYear()-2000;
    const currentMonth = new Date().getMonth()+1; 
       
    if (response.ok){
      setPo(initialOrders);  
      setSuppliers([...suppliers,...loadedsuppliers])
      setCompany([...company,...loadedCompany])
      currentMonth>=4 && setRequestNo(`${currentYear}/${currentYear+1}-0000${Number(reqNo)+1}`)
      currentMonth<4 && setRequestNo(`${currentYear-1}/${currentYear}-0000${Number(reqNo)+1}`)
    }
    
        //  console.log(initialCusts)
  }, [get, response]);

  useEffect(() => {
       loadInitialData();
    
  }, []); // componentDidMount

  const AlertHandler = (alertContent, alertType) => {
    dispatch(
      alertActions.showAlertHandler({
        showAlert: !showAlert,
        alertMessage: alertContent,
        alertVariant: alertType,
      })
    );
  };

  const saveDetails = async (order) => {
    //  procMaps
    const orderapi = order.orderId ? "/poQuotes/uploadFile" : "/poQuotes/uploadFile" ;
    const formData = new FormData();
    formData.append("file", order.file[0]);
    formData.append("poId",order.poId)
    formData.append("supplierId",order.supplierId)
    formData.append("remarks",order.remarks)
    console.log(orderapi);
    const returnObject = await post(api + orderapi, formData);
    console.log(returnObject);
    if (returnObject.retValues.status == 1) {
      if (order.poId) {
        dispatch(modalActions.hideModalHandler());
        AlertHandler(returnObject.retValues.message, "success");
      } else if (returnObject.retValues.order.orderId > 0) {
        dispatch(modalActions.hideModalHandler());
        AlertHandler(returnObject.retValues.message, "success");
      }
    } else {
      dispatch(modalActions.hideModalHandler());
      AlertHandler(returnObject.retValues.message, "danger");
    }
  };

  const handleDownload = async (documentName) => {
    
    window.open(`${downloadLink}Generated/${documentName}`,'_blank', 'noreferrer')
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
        title: "Supplier",
        type: "select",
        name: "department",
        contains: "Select",
        options: suppliers,
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

  const showFormHandler = (item, action,poType) => () => {
    if (action === "add") {
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <>
            {
              <SelectPo
                showFormHandler={showFormHandler}
                onCancel={() => dispatch(modalActions.hideModalHandler())}
              ></SelectPo>
            }
          </>
          ),
          showModal: true,
        })
      );
          }else if (action === "poForm") {
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <>
            {
              <PoEntry
                poType   = {poType}
                suppliers = {suppliers}
                company = {company}
                selectedItems={item.poItems}
                selectedItem = {item}
                saveFunction={requestsave}
                updateItems={updateItems}
                onCancel={() => dispatch(modalActions.hideModalHandler())}
                loadState={loadState}
                reqNo = {requestNo}
              ></PoEntry>
            }
          </>
          ),
          showModal: true,
        })
      );
    } if (action === "servicePo") {
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <>
            {
              <ServicePoEntry
                suppliers = {suppliers}
                company = {company}
                selectedItems={item.poItems}
                selectedItem = {item}
                saveFunction={requestServicesave}
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
    else if (action === "grnEntry") {
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <GrnEntry
              poType = {poType}
              onCancel={() => dispatch(modalActions.hideModalHandler())}
              selectedItem={{ ...item }}
              saveFunction={saveDetails}
            />
          ),
          showModal: true,
        })
      );
    }else if (action === "viewPo") {


     handleDownload(item.fileName)
    }else if (action === "poApproval") {
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <PoApprovalForm
              onCancel={() => dispatch(modalActions.hideModalHandler())}
              selectedItem={{ ...item }}
              saveFunction={saveDetails}
            />
          ),
          showModal: true,
        })
      );
    }else if (action === "viewQuotes") {
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <ViewQuotes
              onCancel={() => dispatch(modalActions.hideModalHandler())}
              selectedItem={{ ...item }}
              saveFunction={saveDetails}
              suppliers = {suppliers}             
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
        title="Purchase Order Search"
        
        onHeaderClick={showFormHandler({}, "add", [0, 1, 2, 3, 4])}
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
        {<Table
          cols={OrderTable(showFormHandler, actions)}
          data={po}
          rows={10}
        />}
      </SimpleCard>
    </div>
  );
}

export default POSearch;

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
