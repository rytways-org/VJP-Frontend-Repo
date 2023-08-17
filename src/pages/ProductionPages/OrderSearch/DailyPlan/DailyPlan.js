import React, { useState, useCallback, useEffect } from "react";
import SimpleCard from "../../../../UI/cards/SimpleCard";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import Table from "../../../../Components/tables/Table";
import classes from "./dailyplan.module.css";
import DaiilyPlanForm from "./DaiilyPlanForm";
import { DailyPlanTable } from "./DailyPlanTable";
import { daiData } from "./DailyData";
import useFetch, { Provider } from "use-http";
import api from "../../../../Api";
import { alertActions } from "../../../../store/alert-slice";
import { useSelector, useDispatch } from "react-redux";

function DailyPlan(props) {
  const handleEdit = (item) => () => {
    setSelectedPlan({ ...item });
    // alert(JSON.stringify(item))
  };
  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);
  const dispatch = useDispatch();
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const [dailyPlans, setDailyPlans] = useState([]);
  var [maxQty,setMaxQty] = useState(props.selectedItem.quantity)
  
  let [selectedPlan, setSelectedPlan] = useState({});
  const loadInitialData = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const initialPlans = await post(api + "/dailyPlan/plans", {
      id: props.selectedItem.orderId,"loadState":props.loadState
    });
    if (response.ok) setDailyPlans(initialPlans)
    {initialPlans.length >0 && setMaxQty(maxQty - initialPlans.map(item=>item.quantity).reduce((prev,next)=>(prev+next)))}
    ;
    //  console.log(initialCusts)
  }, [get, response,props.loadState]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]); // componentDidMount

  const saveDetails = async (dailyPlan) => {
    //  procMaps
    const dailyapi = dailyPlan.dailyPlanId
      ? "/dailyPlan/update"
      : "/dailyPlan/create";
    const returnObject = await post(api + dailyapi, dailyPlan);
    if (returnObject.retValues.status == 1) {
      if (dailyPlan.dailyPlanId) {
        setDailyPlans(
          dailyPlans.map((dayplan) =>
            dayplan.dailyPlanId === returnObject.retValues.dailyPlan.dailyPlanId
              ? returnObject.retValues.dailyPlan
              : dayplan
          )
        );
        AlertHandler(returnObject.retValues.message, "success");
        props.loadStateContoller({type:"dailyPlan"});
        setSelectedPlan({});
      } else if (returnObject.retValues.dailyPlan.dailyPlanId > 0) {
        setDailyPlans([...dailyPlans, returnObject.retValues.dailyPlan]);
        AlertHandler(returnObject.retValues.message, "success");
        setSelectedPlan({});
      }
    } else {
      AlertHandler(returnObject.retValues.message, "danger");
    }
  };

  const AlertHandler = (alertContent, alertType) => {
    dispatch(
      alertActions.showAlertHandler({
        showAlert: !showAlert,
        alertMessage: alertContent,
        alertVariant: alertType,
      })
    );
  };

  return (
    <SimpleCard>
      <Card body className={classes.title}>
        <h5>
          {" "}
          Daily Plan For - {props.selectedItem.product.productName}</h5>{" "}
      </Card>
      {/* <SimpleCard title="Monthly Target Schedule">
            <Table data={data} cols={dailyPlanTable(handleEdit,4)}></Table>  
              </SimpleCard> */}
      <SimpleCard title="Add Daily Schedule">
        <Row>
          <DaiilyPlanForm 
            selected={selectedPlan}
            onCancel={props.onCancel}
            saveFunction={saveDetails}
            orderId={props.selectedItem.orderId}
            maxQty = {maxQty}
            ></DaiilyPlanForm>
        </Row>
        <Row className={classes.tableCon}>
          <Table
            data={dailyPlans}
            cols={DailyPlanTable(handleEdit)}
            className={classes.tableCon}
          ></Table>
        </Row>
      </SimpleCard>
    </SimpleCard>
  );
}

export default DailyPlan;
