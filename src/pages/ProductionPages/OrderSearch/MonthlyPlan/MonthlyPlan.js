import React, { useState, useCallback, useEffect } from "react";
import CreateForm from "../../../../Components/Forms/CreateForm";
import SimpleCard from "../../../../UI/cards/SimpleCard";
import Card from "react-bootstrap/Card";
import TargetSchedule from "./TargetSchedule";
import { Row, Col } from "react-bootstrap";
import MonthlyForm from "./MonthlyForm";
import Table from "../../../../Components/tables/Table";
import { MonthlyPlanTable } from "./MonthlyPlanTable";
import classes from "./monthlyplan.module.css";
import useFetch, { Provider } from "use-http";
import api from "../../../../Api";
import { alertActions } from "../../../../store/alert-slice";
import { useSelector, useDispatch } from "react-redux";
import Ctheme from "../../../../Components/Ctheme/Ctheme";


const stylesUpper = {
  margin: "0",
  padding: "0",

};

const stylesUpperTwo = {
  margin: Ctheme.margins.mg,
  
  /*backgroundColor:'yellow' */
};

const styles = {
  simplettl: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: Ctheme.colors.simcard,
    borderBottomLeftRadius: '0px', 
    borderBottomRightRadius: '0px', 
    backgroundColor:Ctheme.colors.ttle,
    height: '3rem',
  },
};




const rowWiseFields = 2;
function MonthlyPlan(props) {
  const [monthlyPlans, setMonthlyPlans] = useState([]);
  let [selectedPlan, setSelectedPlan] = useState();
  var [maxQty,setMaxQty] = useState(props.selectedItem.quantity)
  
 const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);
  const dispatch = useDispatch();
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const loadInitialData = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const initialPlans = await post(api + "/monthlyPlan/plans", {
      id: props.selectedItem.orderId,
      loadState: props.loadState,
    });
    if (response.ok) setMonthlyPlans(initialPlans);
    {initialPlans.length >0 && setMaxQty(maxQty - initialPlans.map(item=>item.quantity).reduce((prev,next)=>(prev+next)))}
    //  console.log(initialCusts)
  }, [post, response, props.loadState]);

  

  useEffect(() => {
    loadInitialData();
  }, []); // componentDidMount

  const saveDetails = async (monthlyPlan) => {
    //  procMaps
    let monthlyapi = monthlyPlan.monthPlanId
      ? "/monthlyPlan/update"
      : "/monthlyPlan/create";
    console.log(monthlyapi);
    const returnObject = await post(api + monthlyapi, monthlyPlan);
    if (returnObject.retValues.status == 1) {
      setSelectedPlan((selectedPlan) => {});
      console.log({ ...selectedPlan });
      if (monthlyPlan.monthPlanId) {
        setMonthlyPlans(
          monthlyPlans.map((mplan) =>
            mplan.monthPlanId === returnObject.retValues.monthlyPlan.monthPlanId
              ? returnObject.retValues.monthlyPlan
              : mplan
          )
        );
        AlertHandler(returnObject.retValues.message, "success");
        props.loadStateContoller({ type: "monthlyPlan" });
        setMaxQty(maxQty-returnObject.retValues.monthlyPlan.quantity)
      } else if (returnObject.retValues.monthlyPlan.monthPlanId > 0) {
        setMonthlyPlans([...monthlyPlans, returnObject.retValues.monthlyPlan]);
        AlertHandler(returnObject.retValues.message, "success");
        props.loadStateContoller({ type: "monthlyPlan" });
        setMaxQty(maxQty-returnObject.retValues.monthlyPlan.quantity)
      }
    } else {
      AlertHandler(returnObject.retValues.message, "danger");
    }
  };

  const showFormHandler = (item, action) => () => {
    if (action === "edit") {
      setSelectedPlan(item);
      console.log({...selectedPlan});
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
  // const template = {
  //   fields: [
  //     {
  //       title: "Start Date",
  //       type: "date",
  //       name: "startDate",
  //       contains: "date",
  //       validation: "Month and Year is Required",
  //       inpprops: {
  //         format: "dd/mm/yyyy",
  //       },
  //     },
  //     {
  //       title: "Quantity",
  //       type: "number",
  //       name: "quantity",
  //       contains: "number",
  //       validation: "Quantity is Required",
  //       inpprops: {
  //         min: 1,
  //         step: 1         
  //       },
  //     },
  //     {
  //       title: "Remarks",
  //       type: "textarea",
  //       name: "remarks",
  //       contains: "textarea",
  //       inpprops: {
  //         maxlength: 128,
  //         md: 12,
  //       },
  //     },
  //     {
  //       type: "hidden",
  //       name: "orderId",
  //       contains: "number",
  //       value: props.selectedItem.orderId,
  //     },
  //     {
  //       type: "hidden",
  //       name: "monthPlanId",
  //       contains: "number",
  //     },
  //   ],
  // };

  return (
    <SimpleCard upper={stylesUpper} useUpperTwoStyle={false} >
      <div className={classes.ctitle}>
        <h5 className={classes.title}>
          Monthly Plan - {props.selectedItem.product.productName}({props.selectedItem.product.customer.name})
        </h5>{" "}
      </div>
      <Row className={classes.shRow}>
        <Col md={6} className={classes.shCol}>
        <SimpleCard uppertwo={stylesUpperTwo} useUpperTwoStyle={true} title="Target Schedule"
        
       
        styles={styles}
      >
            <TargetSchedule
              data={props.selectedItem.deliveries}
            ></TargetSchedule>
          </SimpleCard>
        </Col>
        <Col className={classes.shCol}>
          
         <MonthlyForm
            selected={selectedPlan}
            saveFunction={saveDetails}
            onCancel={props.onCancel}
            orderId={props.selectedItem.orderId}
          ></MonthlyForm> 
        </Col>
      </Row>
      <Row className={classes.table}> 

        <Table 
          data={monthlyPlans}
          cols={MonthlyPlanTable(showFormHandler)}
        ></Table> 
      </Row>
    </SimpleCard>
  );
}
export default MonthlyPlan;
