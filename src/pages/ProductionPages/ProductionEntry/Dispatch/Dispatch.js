import React, { useState, useCallback, useEffect } from "react";
import classes from "./dispatch.module.css";
import SimpleCard from "../../../../UI/cards/SimpleCard";
import { Card } from "react-bootstrap";
import DispatchForm from "./DispatchForm";
import { Dispatchdata } from "./Dispatchdata";
import DispatchTable from "./DispatchTable";
import Table from "../../../../Components/tables/Table";
import api from "../../../../Api";
import useFetch, { Provider } from "use-http";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../../store/modal-Slice";
import { alertActions } from "../../../../store/alert-slice";
import { Col, Row } from "react-bootstrap";

function Dispatch(props) {
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const [dispatches, setDispatches] = useState([]);
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
  const [loadState, setLoadState] = useState(Math.random());

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

  const loadInitialdata = useCallback(async () => {
    const { ok } = response; // BAD, DO NOT DO THIS
    const prodId = props.selectedItem.product.productId;
    const loadeddata = await post(api + "/dispatchEntry/dispatchEntrys", {
      orderId: props.selectedItem.orderId,
      loadStateTime: Date().toLocaleString(),
    });
    loadeddata ? setDispatches(loadeddata) : setDispatches([]);
    //console.log({ ...props.selectedItem.productId });
  }, [get, response]);

  useEffect(() => {
    loadInitialdata();
  }, [loadState]);

  const saveDetails = async (entry) => {
    //  procMaps
    const insEntryapi = entry.dispatchId
      ? "/dispatchEntry/update"
      : "/dispatchEntry/create";
    console.log(insEntryapi);
    const returnObject = await post(api + insEntryapi, entry);
    console.log(returnObject);
    if (returnObject.retValues.status == 1) {
      if (entry.dispatchId) {
        setDispatches([returnObject.retValues.dispatch]);
        setLoadState(Math.random());
        props.loadStateController()
        AlertHandler(returnObject.retValues.message, "success");
      } else if (returnObject.retValues.dispatch.dispatchId > 0) {
        setDispatches([returnObject.retValues.dispatch]);
        AlertHandler(returnObject.retValues.message, "success");
        setLoadState(Math.random());
        
        props.loadStateController()
      }
    } else {
      AlertHandler(returnObject.retValues.message, "danger");
    }
  };
  const [selectedItem, setSelectedItem] = useState({
    id: "",
    Month: "",
    Year: "",
    Remarks: "",
    Quantity: "",
  });

  const form_header = (
    <>
      <Card body className={classes.title}>
        <Row>
          <Col
            style={{
              backgroundColor: "grey",
              justifyContent: "left",
              borderRadius: "5%",
            }}
            md={2}
          >
            Stock Qty <br />
            {props.selectedItem.fgStock}
          </Col>
          <Col md={{ span: 6, offset: 1 }}>
            {" "}
            <h4>
              Dispatch Details - {props.selectedItem.product.productName}
            </h4>{" "}
          </Col>
        </Row>
      </Card>
    </>
  );

  const handleEdit = (item) => () => {
    setSelectedItem({ ...selectedItem, ...item });
    // alert(JSON.stringify(item))
  };
  return (
    <SimpleCard>
      {form_header}
      <SimpleCard>
        <DispatchForm
          orderQty = {props.selectedItem.fgStock}
          orderId={props.selectedItem.orderId}
          selected={selectedItem}
          saveFunction={saveDetails}
          onCancel={props.onCancel}           
        ></DispatchForm>
        <Table
          data={dispatches}
          cols={DispatchTable(handleEdit)}
          className={classes.tableCon}
        ></Table>
      </SimpleCard>
    </SimpleCard>
  );
}

export default Dispatch;
