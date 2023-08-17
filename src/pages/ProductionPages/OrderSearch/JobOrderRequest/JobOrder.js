import React, { useState, useCallback, useEffect } from "react";
import classes from "./joborder.module.css";
import SimpleCard from "../../../../UI/cards/SimpleCard";
import { Card, Row } from "react-bootstrap";
import JobOrderForm from "./JobOrderForm";
import Table from "../../../../Components/tables/Table";
import { jobOrderData } from "./JobOrderData";
import { JobOrderTable } from "./JobOrderTable";
import { Modal } from "react-bootstrap";
import ReceivalForm from "./ReceivalForm";
import InspectionForm from "./InspectionForm";
import api from "../../../../Api";
import { useSelector, useDispatch } from "react-redux";
import useFetch, { Provider } from "use-http";
import { alertActions } from "../../../../store/alert-slice";

import Ctheme from "../../../../Components/Ctheme/Ctheme";

const stylesUpper = {
  margin: "0",
  padding: "0",

};

const stylesUpperTwo = {
  margin: Ctheme.margins.mg,
  
  
  /*backgroundColor:'yellow' */
};


function JobOrder(props) {
  let rowWiseFields = 3;
  const dispatch = useDispatch();
  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const [stockDisplay, setStockDisplay] = useState({ stock: 0, produced: 0 });
  let [oldEntry, setOldEntry] = useState([]);
  const [loadState, setLoadState] = useState(Math.random());
  var [maxQty,setMaxQty] = useState(props.selectedItem.quantity)
 
  const saveDetails = async (entry) => {
    //  procMaps
    const prodEntryapi = entry.joId ? "/jorder/update" : "/jorder/create";
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
        setOldEntry([returnObject.retValues.order,...oldEntry]);
        AlertHandler(returnObject.retValues.message, "success");
        setLoadState(Math.random());
        console.log(loadState);
      } else if (returnObject.retValues.order.joId> 0) {
        setOldEntry([returnObject.retValues.order, ...oldEntry]);
        //setOldEntry([...returnObject.retValues.prodEntry,...oldEntry]);
        AlertHandler(returnObject.retValues.message, "success");
        setLoadState(Math.random());
        console.log(loadState);
      }
    } else {
      AlertHandler(returnObject.retValues.message, "danger");
    }
  };

  const loadInitialData = useCallback(async () => {
    const intialdata = await post(api + "/jorder/jorders", {
      orderId: props.selectedItem.orderId,
      loadStateid: loadState,
    });
    console.log({ ...intialdata });
    if (response.ok) setOldEntry(intialdata)
    {intialdata.length >0 && setMaxQty(maxQty - intialdata.map(item=>item.requestedQty).reduce((prev,next)=>(prev+next)))}
    
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

  const [showFormParams, setShowformparams] = useState({
    showForm: false,
    selectedForm: "",
    selectedItem: {
      id: 0,
      productName: "",
      cusName: "",
      part: "",
      quantity: "",
      cost: "",
    },
  });

  const [selectedItem, setSelectedItem] = useState({
    id: 0,
    Month: "",
    Year: "",
    Remarks: "",
    Quantity: "",
  });
  const [approval, setApproval] = useState(false);
  const actions = ["edit", "approval", "receival", "inspection"];

  const handleEdit = (item, action) => () => {
    if (action == "approval") {
      setApproval(true);
      setSelectedItem({ ...selectedItem, ...item });
    } else if (action == "edit") {
        setSelectedItem({item});
    }else if (action == "receival") {
      const newState = {
        showForm: true,
        selectedForm: (
          <ReceivalForm
            onCancel={hideFormHandler}
            selectedItem={showFormParams.selectedItem}
          />
        ),
        selectedItem: { ...item },
      };
      setShowformparams({ ...showFormParams, ...newState });
    } else if (action == "inspection") {
      const newState = {
        showForm: true,
        selectedForm: (
          <InspectionForm
            onCancel={hideFormHandler}
            selectedItem={showFormParams.selectedItem}
          />
        ),
        selectedItem: { ...item },
      };
      setShowformparams({ ...showFormParams, ...newState });
    }
  };

  const hideFormHandler = () => {
    setShowformparams({
      ...showFormParams,
      showForm: false,
      selectedForm: "",
      selectedItem: {
        ...showFormParams.selectedItem,
        ...{
          id: 0,
          productName: "",
          cusName: "",
          part: "",
          quantity: "",
          cost: "",
        },
      },
    });
  };

  return (
    <SimpleCard upper={stylesUpper} useUpperTwoStyle={false} >
      <Modal show={showFormParams.showForm} onHide={hideFormHandler}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{showFormParams.selectedForm}</Modal.Body>
      </Modal>
      <div body className={classes.ctitle}  style={{
                  backgroundColor: Ctheme.colors.ttle,
                 
                  
                }}>
        <h5 className={classes.title}>
          Job Order Details - {props.selectedItem.product.productName}({props.selectedItem.product.customer.name})
        </h5>{" "}
      </div>{" "}
      <SimpleCard uppertwo={stylesUpperTwo} useUpperTwoStyle={true}>
        <JobOrderForm
          selected={props.selectedItem}
          approval={approval}
          saveFunction = {saveDetails}
          selectedItem = {selectedItem}
          orderId = {props.selectedItem.orderId}
          maxQty = {maxQty}
        ></JobOrderForm>
        <Table
          data={oldEntry}
          cols={JobOrderTable(handleEdit, actions)}
          rows={5}
          className={classes.tableCon}
          
        ></Table>
      </SimpleCard>
    </SimpleCard>
  );
}
export default JobOrder;
