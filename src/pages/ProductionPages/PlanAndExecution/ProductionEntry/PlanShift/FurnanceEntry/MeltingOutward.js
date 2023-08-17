import React, { useState, useCallback, useEffect } from "react";
import CreateForm from '../../../../../../Components/Forms/CreateForm'
import { Col, Row, Card } from "react-bootstrap";
import classes from "./dailyentry.module.css";
import api from "../../../../../../Api";
import { useSelector, useDispatch } from "react-redux";
import useFetch, { Provider } from "use-http";
import { alertActions } from "../../../../../../store/alert-slice";
import CastingTable from "./CastingTable";
import SimpleCard from "../../../../../../UI/cards/SimpleCard";
import Table from "../../../../../../Components/tables/Table";

function MeltingOutward(props) {
  let rowWiseFields = 3;
  const dispatch = useDispatch();
  const [defValues, setDefValues] = useState({});
  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const [stockDisplay, setStockDisplay] = useState({ stock: 0, produced: 0 });
  let [heatNo, setHeatNo] = useState("Not Available");
  let [oldEntry, setOldEntry] = useState();
  const [heatCodes,setHeatCodes]= useState([{}]);
  const [prevFurnance,setPrevFurnance]=useState("")
  
  const [loadState,setLoadState] = useState(Math.random());
  var [maxQty,setMaxQty] = useState(props.orderQty)

  const loadHeatCodes =(furnance)=>async()=>{
    const loadedHeatCode = await post(api + "/meltEntry/getHeatNoByDate", {MeltingDate:props.date,furnace:furnance})
    console.log(loadedHeatCode)
  setHeatCodes([...[{value:"0",label:"Select"}],...loadedHeatCode])
  }
  const loadInitialData = useCallback(async () => {
    const intialdata = await post(api + "/castingEntry/allEntries", {
      orderId: props.selectedItem.orderId,
      prodProcMapId: props.selectedItem.prodProcMapId,
      entryDate:props.date,
      loadStateid: loadState,
    });    
    console.log({ ...intialdata });
    if (response.ok && intialdata.retValues.latestEntries)
      setOldEntry([...intialdata.retValues.latestEntries]);
    console.log(intialdata.retValues.prodStock.producedQuantity);
    setMaxQty(maxQty)
  }, [post, response,loadState]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]); // componentDidMount

  const setHeatNumber = (furnace) => async () => {
    console.log(furnace);
    if (furnace!=null) {
      const latestHeatNo = await post(api + "/meltEntry/getHeatNo", {
        furnace: furnace,
      });
      if (response.ok) {
        setHeatNo(latestHeatNo);
      } else {
        setHeatNo("Not Available");
      }
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

  const saveDetails = async (entry) => {
    //  procMaps
    const prodEntryapi = entry.entryId
      ? "/castingEntry/update"
      : "/castingEntry/create";
    console.log(prodEntryapi);
   
    console.log(entry)
    const returnObject = await post(api + prodEntryapi, entry);
    console.log(returnObject);

    if (returnObject.retValues.status == 1) {
      if (entry.entryId) {
        setOldEntry((oldArray) => [returnObject.retValues.prodEntry]);
       // AlertHandler(returnObject.retValues.message, "success");
        setLoadState(Math.random())
        console.log(loadState)
        props.saveProduced(props.selectedItem)
      } else if (returnObject.retValues.prodEntry.entryId > 0) {
        setOldEntry((oldArray) => [returnObject.retValues.prodEntry]);
      //  AlertHandler(returnObject.retValues.message, "success");
        setLoadState(Math.random())
        console.log(loadState)
        props.saveProduced(props.selectedItem)
      }
    } else {
      AlertHandler(returnObject.retValues.message, "danger");
    }
  };

  const validate = (watchValues, errorMethods) => {
    let { errors, setError, clearErrors } = errorMethods;
    // console.log(watchValues["serielNoTo"]);
    // Firstname validation
    if (watchValues[0] != "" && watchValues[0]!=prevFurnance) {
        console.log(watchValues[0]);
        setPrevFurnance(watchValues[0])
      {
        loadHeatCodes(watchValues[0])();
      }
    }
  };

  function onSubmit(values) {
    console.log(values);
    saveDetails(values);
  //  props.saveProduced(props.selectedItem)
  }
  const [selectedEntry,setSelectedEntry] = useState();
  const handleEdit = (item, action) => () => {
    if (action === "edit") {
      setSelectedEntry({...item});
    
    }
  };

  let melting_header = (
    <>
      <Card body className={classes.title}>
        <Row>
          {/* <Col style={{backgroundColor:"grey"} } md={2}>Inward Stock 89</Col>*/}
          <Col md={{ span: 6, offset: 3 }}>
            {" "}
            <h4>Casting Entry - {props.productName}</h4>{" "}
          </Col>
         
        </Row>
      </Card>
    </>
  );
  let template = {
    fields: [
      {
        title: 'Furnance',
        type: 'select',
        name: 'furnace',
        contains: 'Select',
         options:[
        {value:"", label:'Select'},
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
    },
      {
        title: "Heat Code",
        type: "select",
        name: "meltingEntryId",
        contains: "Select",
        options: heatCodes
      },
      {
        title: "Production Qty",
        type: "number",
        name: "quantity",
        contains: "number",
        inpprops: {
          min: 1,
          step: 1,
          max : maxQty-stockDisplay.produced
        },
      },
      {
        title: "Serial No From",
        type: "text",
        name: "serielNofrom",
        contains: "text",
        inpprops: {
          min: 3,
          max: 50,
        },
      },
      {
        title: "Serial No To",
        type: "text",
        name: "serielNoTo",
        contains: "text",
        inpprops: {
          min: 3,
          max: 50,
        },
      },
      {
        type: "hidden",
        name: "orderId",
        contains: "number",
        value: props.selectedItem.orderId,
      },
      {
        type: "hidden",
        name: "prodProcMapId",
        contains: "number",
        value: props.selectedItem.prodProcMapId,
      },
      {
        title: "Date",
        type: "hidden",
        name: "entryDate",
        contains: "date",
        validation: "Date is Required",
        inpprops: {
          format: "dd/mm/yy",
        },
        value:props.date,
      },
      {
        title: "Shift",
        type: "hidden",
        name: "shift",
        value:props.shift
      },
         {
        title: "Heat No",
        type: "hidden",
        name: "heatNo",
        contains: "text",
        value: heatNo,
      }
    ],
  };
  return (
    <>
      {melting_header}
      <CreateForm
        template={template}
        watchFields={['furnace']}
        rowwise={rowWiseFields}
        validate={validate}
        onSubmit={onSubmit}
        onCancel={props.onCancel}
        buttonName="Add"
        defaultValues={selectedEntry}
      ></CreateForm>
      <SimpleCard>
        {<Table cols={CastingTable(handleEdit)} data={oldEntry}></Table>}
      </SimpleCard>
    </>
  );
}

export default MeltingOutward;
