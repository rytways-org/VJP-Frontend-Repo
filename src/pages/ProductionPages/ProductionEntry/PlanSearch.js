import React, { useState, useReducer ,useCallback,useEffect} from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import SearchCard from "../../../UI/cards/SearchCard";
import Modal from "../../../UI/Modal/Modal";
import ProdPlanTable from "./ProdPlanTable";
import classes from "./productionentry.module.css";
import { data } from "./data";
import Table from "../../../Components/tables/Table";
import SimpleCard from "../../../UI/cards/SimpleCard";
import AddPlanForm from "./AddPlanForm";
import Dispatch from "./Dispatch/Dispatch";
import DailyEntry from "./DailyEntry/DailyEntry";
import RawMaterial from "./RawMaterial/RawMaterial";
import { Button, Row } from "react-bootstrap";
import MeltingForm from "./DailyEntry/MeltingForm";
import useFetch, { Provider } from "use-http";
import api from "../../../Api";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../store/modal-Slice";
import { alertActions } from "../../../store/alert-slice";
import { productionEntryActions} from "../../../store/loadStates/productionEntry-slice";


const rowWiseFields = 4;
const template = {
  fields: [
    {
      title: "Production Date",
      type: "date",
      name: "planDate",
      contains: "date",
      inpprops: {
        format: "mm/yy",
      },
    },
  ],
};
const actions = ["dailyForm", "rmRequest", "productionEntry", "dispatch"];

function PlanSearch(props) {
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
  const [loadState,setLoadState] = useState(Math.random())
  let [intialPlans,setInitialPlans]=useState()
  const dispatch = useDispatch();
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const loadInitialData = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const plans = await post(api + "/dailyPlan/listplans", {"id":1,"loadState":Date().toString()});
    if (response.ok) setInitialPlans(plans);
    //  console.log(initialCusts)
  }, [get, response]);

  useEffect(() => {
    loadInitialData();
  }, [loadState]); // componentDidMount

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
    const orderapi = order.orderId ? "/order/update" : "/order/create"
    console.log(orderapi)
    const returnObject = await post(api + orderapi, order);
    console.log(returnObject);
    if (returnObject.retValues.status == 1) {
      if (order.orderId) {
        loadInitialData()
        dispatch(modalActions.hideModalHandler());
        AlertHandler(returnObject.retValues.message, "success");
      } else if (returnObject.retValues.order.orderId > 0) {
        dispatch(modalActions.hideModalHandler());
        AlertHandler(returnObject.retValues.message, "success");
        loadInitialData()
      }
    } else {
      dispatch(modalActions.hideModalHandler());
      AlertHandler(returnObject.retValues.message, "danger");
    }
  };

  const searchPlans = async(date)=>{
    const plans = await post(api + "/dailyPlan/searchPlans", {"id":1,"planDate":date});
    if (response.ok) setInitialPlans(plans);
  }

  const showFormHandler = (item, action) => () => {
    if (action == "dailyForm") {
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <AddPlanForm
              onCancel={() => dispatch(modalActions.hideModalHandler())}
              selectedItem={{ ...item }}
              saveFunction={saveDetails}
              loadStateController={handleLoadChange}
            />
          ),
          showModal: true,
        })
      );
    } else if (action == "dispatch") {
      // alert(JSON.stringify({...item}));

      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <Dispatch
              onCancel={() => dispatch(modalActions.hideModalHandler())}
              selectedItem={{ ...item }}
              saveFunction={saveDetails}
              loadStateController={handleLoadChange}
            />
          ),
          showModal: true,
        })
      );
    } else if (action == "productionEntry") {
      // alert(JSON.stringify({...item}));
      //setShowformparams({...showFormParams,showFormParams.selectedItem:item})

      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <DailyEntry
              onCancel={() => dispatch(modalActions.hideModalHandler())}
              selectedItem={{ ...item }}
              saveFunction={saveDetails}
              loadStateController={handleLoadChange}
            />
          ),
          showModal: true,
        })
      );
    } else if (action == "rmRequest") {
      // alert(JSON.stringify({...item}));
      //setShowformparams({...showFormParams,showFormParams.selectedItem:item})

      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <RawMaterial
              onCancel={() => dispatch(modalActions.hideModalHandler())}
              selectedItem={{ ...item }}
              saveFunction={saveDetails}
              loadStateContoller={handleLoadChange}
            />
          ),
          showModal: true,
        })
      );
    } else if (action == "meltingInward") {
      // alert(JSON.stringify({...item}));
      //setShowformparams({...showFormParams,showFormParams.selectedItem:item})

      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <MeltingForm
              onCancel={() => dispatch(modalActions.hideModalHandler())}
              selectedItem={{ ...item }}
              saveFunction={saveDetails}
              loadStateController={handleLoadChange}
            />
          ),
          showModal: true,
        })
      );
    }
  };
  
  const handleLoadChange = (action) => {
    setLoadState(Math.random());
    // dispatch(orderEntryActions.);
  };

  function onSubmit(values) {
    searchPlans(values.planDate);
  }

  return (
    <div className={classes.container}>
      <SearchCard
        title="Production Entry"
        buttonName="Add"
        onHeaderClick={showFormHandler({}, "dailyForm")}
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
          <Button
            className={classes.btn}
            onClick={showFormHandler({}, "rmRequest")}
          >
            Add Raw Materials
          </Button>
          <Button
            className={classes.btn}
            onClick={showFormHandler(
              {},
              "meltingInward"
            )}
          >
            Melting Entry
          </Button>
        </Row>
        <Table
          cols={ProdPlanTable(showFormHandler, actions,[8])}
          data={intialPlans}
          striped
        />
      </SimpleCard>
    </div>
  );
}

export default PlanSearch;



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
