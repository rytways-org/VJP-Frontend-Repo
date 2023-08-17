import React, { useState, useCallback, useEffect } from "react";
import classes from "./dailyentry.module.css";
import SimpleCard from "../../../../UI/cards/SimpleCard";
import { Card, Modal } from "react-bootstrap";
import Table from "../../../../Components/tables/Table";
import { ProcessTable } from "./ProcessTable";
import { ProcessData } from "./ProcessData";
import MeltingForm from "./MeltingForm";
import ProcessForm from "./ProcessForm";
import QualityForm from "./QualityForm";
import { Button, Row, Col } from "react-bootstrap";
import MeltingOutward from "./MeltingOutward";
import useFetch, { Provider } from "use-http";
import api from "../../../../Api";
import { alertActions } from "../../../../store/alert-slice";
import { useSelector, useDispatch } from "react-redux";

function DailyEntry(props) {
  const [intialvalues, setIntialvalues] = useState();
  const [procMaps, setProcMaps] = useState();
  const dispatch = useDispatch();
  const { get, post, response, loading, error } = useFetch({ data: [] });

  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);

  const loadInitialdata = useCallback(async () => {
    const { ok } = response; // BAD, DO NOT DO THIS
    const prodId = props.selectedItem.order.product.productId;
    const loadeddata = await post(api + "/ppMap/processMaps", {
      id: props.selectedItem.order.product.productId,
      "loadStateTime":Date().toLocaleString()
    });
    setProcMaps(loadeddata);
    //console.log({ ...props.selectedItem.productId });
  }, [get, response]);

  const AlertHandler = (alertContent, alertType) => {
    dispatch(
      alertActions.showAlertHandler({
        showAlert: !showAlert,
        alertMessage: alertContent,
        alertVariant: alertType,
      })
    );
  };

  useEffect(() => {
    loadInitialdata();
  }, [loadInitialdata]); // componentDidMount

  const [selectedItem, setSelectedItem] = useState({
    id: "",
    Month: "",
    Year: "",
    Remarks: "",
    Quantity: "",
  });

  const [showFormParams, setShowformparams] = useState({
    showForm: false,
    selectedForm: "",
    title: "",
    selectedItem: {
      id: 0,
      productName: "",
      cusName: "",
      part: "",
      quantity: "",
      cost: "",
    },
  });

  const actions = ["process", "inspection"];

  const loadStateController = (action) =>{
    props.loadStateController(action)
  }
  const showFormHandler = (item) => () => {
    console.log({ ...item });
    if (item.process.processId === 15) {
      const newState = {
        showForm: true,
        selectedForm: (
          <MeltingOutward
            onCancel={hideFormHandler}
            selectedItem={{...item}}
            orderId={props.selectedItem.orderId}
            loadStateController = {props.loadStateController}
            orderQty={props.selectedItem.order.quantity}
            productName = {props.selectedItem.order.product.productName}
          />
        ),
        selectedItem: { ...item },
        title: "",
      };
      setShowformparams({ ...showFormParams, ...newState });
    } else if ((item.process.processId !=15 ) & (item.process.proSubCat==="Production") ) {
      // alert(JSON.stringify({...item}));
      const newState = {
        showForm: true,
        selectedForm: (
          <ProcessForm
            onCancel={hideFormHandler}
            selectedItem={{...item}}
            orderId={props.selectedItem.order.orderId}
            loadStateController = {props.loadStateController}
            productName = {props.selectedItem.order.product.productName}
          />
        ),
        selectedItem: { ...item },
        title: "",
      };
      setShowformparams({ ...showFormParams, ...newState });
    } else if (item.process.proSubCat==="Quality") {
      // alert(JSON.stringify({...item}));
      //setShowformparams({...showFormParams,showFormParams.selectedItem:item})
      const newState = {
        showForm: true,
        selectedForm: (
          <QualityForm
            onCancel={hideFormHandler}
            selectedItem={{...item}}
            orderId={props.selectedItem.order.orderId}
            loadStateController = {props.loadStateController}
            productName = {props.selectedItem.order.product.productName}
          />
        ),
        selectedItem: { ...item },
      };
      setShowformparams({ ...showFormParams, ...newState });
    } else if (item["id"] == 8) {
      // alert(JSON.stringify({...item}));
      //setShowformparams({...showFormParams,showFormParams.selectedItem:item})
      const newState = {
        showForm: true,
        selectedForm: (
          <QualityForm
            onCancel={hideFormHandler}
            selectedItem={item["ProcessName"]}
            orderId={props.selectedItem.order.orderId}
            loadStateController = {props.loadStateController}
            productName = {props.selectedItem.order.product.productName}
          />
        ),
        selectedItem: { ...item },
        title: "",
      };
      setShowformparams({ ...showFormParams, ...newState });
    }
  };
  const hideFormHandler = () => {
    setShowformparams({
      ...showFormParams,
      showForm: false,
      selectedForm: "",
      title: "",
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
    <>
      <Modal className={classes.modal}
        {...props}
        showFormHandler={showFormHandler} 
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showFormParams.showForm}
        onHide={hideFormHandler}
      >
        <Modal.Body>{showFormParams.selectedForm}</Modal.Body>
      </Modal>
      <SimpleCard>
        <Card body className={classes.title}>
          <h5>
            Production Entry For{" "} {props.selectedItem.order.product.productName}
          </h5>{" "}
        </Card>
        <SimpleCard
          className={classes.simcard}
        >
          <Table
            data={procMaps}
            cols={ProcessTable(showFormHandler, actions, [2, 3])}
          ></Table>
        </SimpleCard>
      </SimpleCard>
    </>
  );
}

export default DailyEntry;
