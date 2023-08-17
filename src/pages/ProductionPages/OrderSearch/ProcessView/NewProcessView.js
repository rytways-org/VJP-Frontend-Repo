import React, { useState, useCallback, useEffect } from "react";
import classes from "../../ProductionEntry/DailyEntry/dailyentry.module.css";
import SimpleCard from "../../../../UI/cards/SimpleCard";
import { Card, Modal } from "react-bootstrap";
import Table from "../../../../Components/tables/Table";
import QualityForm from "../../../ProductionPages/ProductionEntry/DailyEntry/QualityForm";
import { Button, Row, Col } from "react-bootstrap";
import useFetch, { Provider } from "use-http";
import api from "../../../../Api";
import { alertActions } from "../../../../store/alert-slice";
import { useSelector, useDispatch } from "react-redux";
import { ProcessViewTable } from "./ProcessViewTable";
import Ctheme from "../../../../Components/Ctheme/Ctheme";

const styles = {
  upper: {
    margin: '0',
  },
  table: {
    maxHeight: '375px', // Changed from max-height to maxHeight
    margin: '0',
  },
  tablehead: {
    margin: '.2rem 0rem',
    padding: '0',
  },
};

const stylesUpper = {
  margin: "0",
  padding: "0",

};

const stylesUpperTwo = {
  margin: "0rem 1rem",
  
  /*backgroundColor:'yellow' */
};


function NewProcessView(props) {
  const [intialvalues, setIntialvalues] = useState();
  const [procMaps, setProcMaps] = useState([]);
  const dispatch = useDispatch();
  const { get, post, response, loading, error } = useFetch({ data: [] });

  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);

  const loadInitialdata = useCallback(async () => {
    const { ok } = response; // BAD, DO NOT DO THIS
    //const prodId = props.selectedItem.order.product.productId;
    const loadeddata = await post(api + "/ppMap/dashboardProcessMaps", {
      id: props.selectedItem.orderId,
      productId: props.selectedItem.product.productId,
      random: Math.random(),
    });
    console.log(loadeddata);
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

  const actions = ["inspection", "rework"];
  const showFormHandler = (item, action) => () => {
    console.log({ ...item });
    if (action == "inspection") {
      const newState = {
        showForm: true,
        selectedForm: (
          <QualityForm
            onCancel={hideFormHandler}
            selectedItem={{ ...item }}
            orderId={props.selectedItem.orderId}
            productName={props.selectedItem.product.productName}
          />
        ),
        selectedItem: { ...item },
      };
      setShowformparams({ ...showFormParams, ...newState });
    } else if (action == "rework") {
      // alert(JSON.stringify({...item}));
      //setShowformparams({...showFormParams,showFormParams.selectedItem:item})
      const newState = {
        showForm: true,
        selectedForm: <></>,
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
      <Modal
        {...props}
        showFormHandler={showFormHandler}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showFormParams.showForm}
        onHide={hideFormHandler}
      >
        <Modal.Header closeButton>{showFormParams.title}</Modal.Header>
        <Modal.Body>{showFormParams.selectedForm}</Modal.Body>
      </Modal>
      <SimpleCard upper={stylesUpper} useUpperTwoStyle={false} >
      <div className={classes.ctitle}  style={{
                  backgroundColor: Ctheme.colors.ttle,
                 
                }}>
        
        <h5  className={classes.title}  style={{margin:'0'}}>
            Stock Status of {props.selectedItem.orderNo}(
            {props.selectedItem.product.productName})
          </h5>{" "}
        </div>
        <SimpleCard uppertwo={stylesUpperTwo} useUpperTwoStyle={true} className={classes.simcard}  >
          <Table
            data={procMaps}
            cols={ProcessViewTable(showFormHandler, actions, [])}
            rows={25}
            styles={styles}
          ></Table>
        </SimpleCard>
      </SimpleCard>
    </>
  );
}

export default NewProcessView;
