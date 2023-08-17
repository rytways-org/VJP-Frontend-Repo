import React, { useState, useCallback, useEffect } from "react";
import Table from "../../../Components/tables/Table";
import SimpleCard from "../../../UI/cards/SimpleCard";
import ProductionTable from "./ProductionTable";
import { productionData } from "./ProductionData";
import classes from "./prodSum.module.css";
import Modal from "../../../UI/Modal/Modal";
import DispatchHis from "./Dispatch/DispatchHis";
import ProcessView from "../OrderSearch/ProcessView/ProcessView";
import RawMaterial from "./RawMat/RawMaterials";
import StockChart from "./StockChart/StockChart";
import { Row, Col, Container } from "react-bootstrap";
import RmSummary from "./RmMaterials/RmSummary";
import useFetch, { Provider } from "use-http";
import api from "../../../Api";
import NewProcessView from "../OrderSearch/ProcessView/NewProcessView";
import { modalActions } from "../../../store/modal-Slice";

import { useSelector, useDispatch } from "react-redux";

function LineOfBal() {
  let [intialPlans, setInitialPlans] = useState([]);
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const dispatch = useDispatch();

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

  const loadInitialData = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const plans = await post(api + "/order/dashboardOrders", {
      id: 1,
      random: Math.random(),
    });
    if (response.ok) setInitialPlans(plans);
    //  console.log(initialCusts)
  }, [get, response]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]); // componentDidMount

  const actions = ["dispatch", "lineOfBal", "rawMat", "viewSum"];

  const showFormHandler = (item, action) => () => {
    if (action == "dispatch") {
      const newState = {
        showForm: true,
        selectedForm: <DispatchHis />,
        selectedItem: { ...item },
      };
      setShowformparams({ ...showFormParams, ...newState });
    } else if (action == "lineOfBal") {
      // alert(JSON.stringify({...item}));
      const newState = {
        showForm: true,
        selectedForm: <NewProcessView onCancel={() => dispatch(modalActions.hideModalHandler())}
        selectedItem={item}
        ></NewProcessView>,
        selectedItem: { ...item },
      };
      setShowformparams({ ...showFormParams, ...newState });
    } else if (action == "rawMat") {
      // alert(JSON.stringify({...item}));
      //setShowformparams({...showFormParams,showFormParams.selectedItem:item})
      const newState = {
        showForm: true,
        selectedForm: <RawMaterial></RawMaterial>,
        selectedItem: { ...item },
      };
      setShowformparams({ ...showFormParams, ...newState });
    } else if (action == "viewSum") {
      // alert(JSON.stringify({...item}));
      const newState = {
        showForm: true,
        selectedForm: <StockChart />,
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
    <SimpleCard title="Line Of Balance" className={classes.card}>
      {showFormParams.showForm && (
        <Modal onClose={hideFormHandler} size={10}>
          {showFormParams.selectedForm}
        </Modal>
      )}
      <Table
        cols={ProductionTable(showFormHandler, actions)}
        data={intialPlans}
        striped
        rows={10}
      ></Table>
    </SimpleCard>
  );
}

export default LineOfBal;
