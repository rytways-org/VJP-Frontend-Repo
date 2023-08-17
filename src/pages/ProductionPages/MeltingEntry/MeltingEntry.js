import React, { useState, useReducer ,useCallback,useEffect} from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import SearchCard from "../../../UI/cards/SearchCard";
import Modal from "../../../UI/Modal/Modal";
import ProdPlanTable from "./MeltingEntryTable";
import classes from "./productionentry.module.css";
import { data } from "./data";
import Table from "../../../Components/tables/Table";
import SimpleCard from "../../../UI/cards/SimpleCard";
import AddPlanForm from "./MeltingEntryForm";
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
import MeltingEntryForm from "./MeltingEntryForm";
import HoldingForm from './HoldingENtry/HoldingForm'



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
    },{
      title: 'Furnance',
      type: 'select',
      name: 'furnace',
      contains: 'Select',
       options:[
      {value:"Select", label:'Select'},
      {value:"Furnance_A", label:'Furnace A'},
      {value:"Furnance_B", label:'Furnace B'},
      {value:"Furnance_C", label:'Furnace C'},
      {value:"Furnance_D", label:'Furnace D'},
      {value:"Furnance_E", label:'Furnace E'},
      {value:"Furnance_F", label:'Furnace F'},
       {value:"Furnance_J", label:'Furnace J'},
      {value:"Furnance_K", label:'Furnace K'},
      {value:"Furnance_L", label:'Furnace L'},
      {value:"Furnance_M", label:'Furnace M'},
      {value:"Furnance_N", label:'Furnace N'},
      {value:"Furnance_O", label:'Furnace O'},
      {value:"Furnance_P", label:'Furnace P'},
    ]
  }, {
    title: 'Holding Entry',
    type: 'select',
    name: 'holdingStatus',
    validationProps:"Please select Holding Status",
    contains: 'Select',
     options:[
      {value:"Select",label:'Select'},
    {value:"No", label:'No'},
    {value:"Yes", label:'Yes'},
     ]  
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
  const [loadedOptions,setLoadedOptions]=useState({material:[{ value: "", label: "Select" }]})
  
  const [loadState,setLoadState] = useState(Math.random())
  let [intialPlans,setInitialPlans]=useState([])
  const dispatch = useDispatch();
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const loadInitialData = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const plans = await post(api + "/meltEntry/meltEntrys", {"id":1,"loadState":Date().toString()});
    if (response.ok) setInitialPlans(plans);
    //  console.log(initialCusts)
  }, [get, response]);

  const loadInitialOptions = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const loadedmaterials = await get(api + "/material/loadOptions");
    setLoadedOptions({...loadedOptions,material:[...loadedOptions.material,...loadedmaterials]});
    // console.log({...props.selectedItem})
  }, [get, response]);
  


  useEffect(() => {
    loadInitialOptions();
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

  

  const showFormHandler = (item, action) => () => {
    if (action == "edit") {
      console.log(item)
      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <MeltingEntryForm
              onCancel={() => dispatch(modalActions.hideModalHandler())}
              selectedItem={{ ...item }}
              saveFunction={saveDetails}
              loadStateController={handleLoadChange}
              materials = {loadedOptions.material}
            />
          ),
          showModal: true,
        })
      );
    } else if (action == "Holding") {
      // alert(JSON.stringify({...item}));

      dispatch(
        modalActions.showModalHandler({
          selectedData: { ...item },
          selectedForm: (
            <HoldingForm
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
    values.random = Math.random();
    console.log(values);
    searchDetails(values);
  }

  const searchDetails = async (values) => {
    //  procMaps
    console.log(values)
    const orderapi =  "/meltEntry/searchEntries";
    console.log(orderapi);
    const returnObject = await post(api + orderapi, values);
    console.log(returnObject);

    setInitialPlans(returnObject);
   
  };

  return (
    <div className={classes.container}>
      <SearchCard
        title="Melting Entry"
        buttonName="Add Melting Entry"
        onHeaderClick={showFormHandler({}, "edit")}
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
        <Table
          cols={ProdPlanTable(showFormHandler, actions,[8])}
          rows={10}
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
